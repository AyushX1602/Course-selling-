const {Router} = require('express');
const { adminModel, courseModel } = require('../db');
const { JWT_ADMIN_SECRET } = require('../config');
const adminRouter = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const{z} = require('zod');

// Admin Middleware function - moved here to ensure it's defined before use
function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({
            message: "Authorization token required"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_ADMIN_SECRET);
        req.adminId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

adminRouter.post('/signup',async function (req, res){
    try {
        console.log("Request body received:", req.body);
        
        const requiredBody = z.object({
            email: z.string().email(),
            Fname: z.string(),
            Lname: z.string(),
            password: z.string().min(6)
        })
        
        const parsedDataWithString = requiredBody.safeParse(req.body);

        if (!parsedDataWithString.success){
            console.log("Validation errors:", parsedDataWithString.error.errors);
            res.status(400).json({
                message: "Invalid request body",
                errors: parsedDataWithString.error.errors,
                received: req.body
            })
            return;
        }
        
        const { email, password, Fname, Lname } = req.body;

        const existingAdmin = await adminModel.findOne({ email: email });
        if(existingAdmin) {
            return res.status(400).json({ 
                message: "Admin with this email already exists" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        console.log("Hashed password:", hashedPassword);

        await adminModel.create({
            email: email,
            password: hashedPassword,
            Fname: Fname,
            Lname: Lname
        })
        
        res.json({
            message: "Admin signed up successfully"
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});

adminRouter.post('/signin', async function (req, res) {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const admin = await adminModel.findOne({
            email: email,
        })
        
        if(!admin){
            res.status(403).json({
                message: "Invalid credentials"
            })
            return;
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (passwordMatch){
            const token = jwt.sign({
                id: admin._id.toString(),
                email: admin.email
            }, JWT_ADMIN_SECRET);
            
            res.json({
                message: "Admin logged in successfully",
                token: token
            })
        } else {
            res.status(403).json({
                message: "Invalid credentials"
            })
        }
    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});

adminRouter.post('/courses', adminMiddleware, async function (req, res) {
    try {
        const adminId = req.adminId;
        const { title, description, imgurl, price } = req.body;
        
        const course = await courseModel.create({
            title: title,
            description: description,
            imgurl: imgurl,
            price: price,
            creator_id: adminId
        })
        
        res.json({ 
            message: 'Course created successfully',
            courseId: course._id
        }); 
    } catch (error) {
        console.error("Course creation error:", error);
        res.status(500).json({
            message: "Error creating course",
            error: error.message
        });
    }
});

adminRouter.put('/courses/:courseId', adminMiddleware, async function (req, res) {
    try {
        const adminId = req.adminId;
        const { courseId } = req.params;
        const { title, description, imgurl, price } = req.body;
        
        const course = await courseModel.updateOne({
            _id: courseId,
            creator_id: adminId
        }, {
            title: title,
            description: description,
            imgurl: imgurl,
            price: price
        })
        
        if (course.matchedCount === 0) {
            return res.status(404).json({
                message: "Course not found or you're not authorized to update it"
            });
        }
        
        res.json({
            message: 'Course updated successfully',
            courseId: courseId
        });
    } catch (error) {
        console.error("Course update error:", error);
        res.status(500).json({
            message: "Error updating course",
            error: error.message
        });
    }
});

adminRouter.get('/courses/bulk', adminMiddleware, async function (req, res) {
    try {
        const adminId = req.adminId;
        
        const courses = await courseModel.find({
            creator_id: adminId
        });
        
        res.json({
            message: 'Courses retrieved successfully',
            courses: courses,
            count: courses.length
        });
    } catch (error) {
        console.error("Courses retrieval error:", error);
        res.status(500).json({
            message: "Error retrieving courses",
            error: error.message
        });
    }
});

module.exports = {adminRouter: adminRouter};