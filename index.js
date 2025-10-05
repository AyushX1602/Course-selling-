const express = require('express');
const app = express();

// Import database connection
require('./db');

// Middleware to parse JSON requests
app.use(express.json());

const{UserRouter} = require('./routes/users');
const{CoursesRouter} = require('./routes/courses');
const{adminRouter} = require('./routes/admin');

app.use("/user",UserRouter);
app.use("/courses",CoursesRouter);
app.use("/admin", adminRouter);


async function startServer(){
   await mongoose.connect(process.env.MONGODB_URI);
   console.log("Connected to MongoDB");
    app.listen(3000);
console.log('Server is listening on port 3000');
}
