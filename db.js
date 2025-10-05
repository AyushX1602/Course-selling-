const mongoose = require('mongoose');
const ObjectId =mongoose.ObjectId; 
const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://ayushpathak16022005_db_user:sdkaLqtfFbZ7Qs0p@cluster0.nzijvyg.mongodb.net/course-selling")

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
    user_id : ObjectId,
    course_id : ObjectId
})

const userModel = mongoose.model("User", userSchema);
const adminModel = mongoose.model("Admin", adminSchema);
const courseModel = mongoose.model("Course", courseSchema);
const purchaseModel = mongoose.model("Purchase", purchaseSchema);


module.exports = {userModel, adminModel, courseModel, purchaseModel};