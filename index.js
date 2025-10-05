const express = require('express');
const app = express();

const{UserRouter} = require('./routes/User');
const{CoursesRouter} = require('./routes/courses');


app.use("/user",UserRouter);
app.use("/courses",CoursesRouter);

app.listen(3000);
console.log('Server is listening on port 3000');