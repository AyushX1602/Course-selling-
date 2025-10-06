const {Router} = require('express');
const { userModel } = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const{z} = require('zod');
const { JWT_SECRET } = require('../config');
const UserRouter = Router();

UserRouter.post('/signup',async function (req, res) {
    
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

   await  userModel.create({
        email : email,
        password : hashedPassword,
        firstname : name,
        lastname: name
    })
    res.json({
        message : "You are signed up "
    });
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



UserRouter.put('/courses', (req, res) => {
    res.json({ message: 'Course updated' });
});


UserRouter.get('/courses/bulk', (req, res) => {
    res.json({ message: 'Bulk courses retrieved' });
});


UserRouter.post('/purchases', (req, res) => {
    res.json({ message: 'User purchases' });
});

module.exports = {UserRouter: UserRouter};