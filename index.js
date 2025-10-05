const express = require('express');
const app = express();

const{UserRouter} = require('./routes/users');
const{CoursesRouter} = require('./routes/courses');
const{adminRouter} = require('./routes/admin');

app.use("/user",UserRouter);
app.use("/courses",CoursesRouter);
app.use("/admin", adminRouter);

app.listen(3000);
console.log('Server is listening on port 3000');