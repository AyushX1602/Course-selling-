const {Router} = require('express');
const { userModel, courseModel ,purchaseModel } = require('../db');
const { usermiddleware: userMiddleware } = require('../middleware/user');
const courseRouter = Router();

courseRouter.post('/purchase', userMiddleware, async function (req, res) {
    try {
        const userId = req.userId;
        const courseId = req.body.courseId;

        if (!courseId) {
            return res.status(400).json({
                message: "Course ID is required"
            });
        }

        // Check if course exists
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        // Check if already purchased
        const existingPurchase = await purchaseModel.findOne({
            user_id: userId,
            course_id: courseId
        });

        if (existingPurchase) {
            return res.status(400).json({
                message: "Course already purchased"
            });
        }

        const purchase = await purchaseModel.create({
            user_id: userId,
            course_id: courseId
        });

        res.json({ 
            message: 'Course purchased successfully',
            purchaseId: purchase._id
        });
    } catch (error) {
        console.error('Purchase error:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
});


courseRouter.get('/preview', async function (req, res) {
    const courses = await courseModel.find({});

    res.json({ courses })
});



module.exports = {CoursesRouter: courseRouter};