const {Router} = require('express');
const { userModel, courseModel ,purchaseModel } = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const{z} = require('zod');
const { JWT_user_SECRET } = require('../config');
const UserRouter = Router();
const { usermiddleware : userMiddleware } = require('../middleware/user');

UserRouter.post('/signup',async function (req, res) {
    try {
        const requiredBody = z.object({
            email: z.string().email(),
            name: z.string(),
            password: z.string().min(6)
        })
        
        const parsedDataWithString = requiredBody.safeParse(req.body);

        if (!parsedDataWithString.success){
            res.status(400).json({
                message: "Invalid request body",
                errors: parsedDataWithString.error.errors
            })
            return;
        }
        
        const { email, password, name } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email: email });
        if(existingUser) {
            return res.status(400).json({ 
                message: "User with this email already exists" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        console.log(hashedPassword);

        await userModel.create({
            email: email,
            password: hashedPassword,
            Fname: name,
            Lname: name
        })
        
        res.json({
            message: "You are signed up successfully"
        });

    } catch (error) {
        console.error("User signup error:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});


UserRouter.post('/signin',async function (req, res) {
    const email = req.body.email;
       const password = req.body.password;
   
       const user = await userModel.findOne({
           email : email,
       })
       if(!user){
           res.status(403).json({
               message : "Invalid credentials"
           })
           return;
       }
   
      const passwordMatch = await bcrypt.compare(password,user.password);
   
       if (passwordMatch){
           const token = jwt.sign({
               id : user._id.toString(),
           }, JWT_user_SECRET);
           res.json({
               message : "You are signed in ",
               token : token
           })
       }
       else {
           res.json({
               message : "Invalid credentials"
           })
       }
});




UserRouter.get('/purchases',userMiddleware,async function (req, res) {
    try {
        const userId = req.userId;
        
        const purchases = await purchaseModel.find({
            user_id: userId,
        }).populate('course_id', 'title description price imageUrl'); // This will include course details
        
        res.json({
            message: "Purchases fetched successfully",
            purchases: purchases 
        });
    } catch (error) {
        console.error('Fetch purchases error:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
});




module.exports = {UserRouter: UserRouter};