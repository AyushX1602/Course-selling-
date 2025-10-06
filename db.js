const mongoose = require('mongoose');
require('dotenv').config();
const ObjectId =mongoose.ObjectId; 
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

const userSchema = Schema({
   email: {type :String , unique : true},
   password : String,
   Fname : String,
   Lname : String, 
})

const adminSchema = Schema({
    email: {type :String , unique : true},
    password : String,
    Fname : String,
    Lname : String, 
 })

const courseSchema = Schema({
    title : String,
    description : String,
    price : Number,
    imgurl : String,
    creator_id : ObjectId
})

const purchaseSchema = Schema({
    user_id: { type: ObjectId, ref: 'User' },
    course_id: { type: ObjectId, ref: 'Course' }
})

const userModel = mongoose.model("User", userSchema);
const adminModel = mongoose.model("Admin", adminSchema);
const courseModel = mongoose.model("Course", courseSchema);
const purchaseModel = mongoose.model("Purchase", purchaseSchema);


module.exports = {userModel, adminModel, courseModel, purchaseModel};