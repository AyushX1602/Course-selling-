const {Router} = require('express');
const { adminModel, courseModel } = require('../db');
const adminRouter = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import { JWT_admin_SECRET } from '../config';   
import admin from '../middleware/admin';
const{z} = require('zod');
const{ adminMiddleware } = require('../middleware/admin');

adminRouter.post('/signup',async function (req, res){

        const requiredBody = z.object({
        email : z.string(),
        name : z.string(),
        password : z.string()
    })
        const parsedDataWitString = requiredBody.safeParse(req.body);

    if (!parsedDataWitString.success){
        res.status(400).json({
            message : "Invalid request body"
        })
        return;
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hashedPassword = await bcrypt.hash(password, 5);
    console.log(hashedPassword);

   await  adminModel.create({
        email : email,
        password : hashedPassword,
        firstname : name,
        lastname: name
    })
    res.json({
        message : "You are signed up "
    });

});


adminRouter.post('/signin', async function (req, res) {
       const email = req.body.email;
       const password = req.body.password;
   
       const user = await adminModel.findOne({
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
           }, JWT_SECRET);
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

adminRouter.post('/courses', adminMiddleware, async function (req, res) {
    const adminId = req.adminId;
    const{title,description,imageurl,price} = req.body;
   const course = await courseModel.create({
        title : title,
        description : description,
        imageurl : imageurl,
        price : price,
        creatorId : adminId
    })
    res.json({ 
        message: 'Course created successfully',
        courseId: course._id
     }); 
});

adminRouter.put('/courses', adminMiddleware,  async function (req, res) {
    const adminId = req.adminId;
    const{title,description,imageurl,price} = req.body;
   const course = await courseModel.updateOne({
        title : title,
        description : description,
        imageurl : imageurl,
        price : price,
        creatorId : adminId
    })
    res.json({
         message: 'Course updated',
        courseId: course._id
     });
});


adminRouter.get('/courses/bulk', async function (req, res)  {
    const adminId = req.adminId;
    const{title,description,imageurl,price} = req.body;
   const course = await courseModel.find({
        title : title,
        description : description,
        imageurl : imageurl,
        price : price,
        creatorId : adminId
    })
    res.json({
         message: 'Course updated',
        courseId: course._id
     });
});



module.exports = {adminRouter: adminRouter};