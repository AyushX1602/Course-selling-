const express = require('express');
const app = express();

// Import database connection
require('./db');

// Enable CORS for HTML frontend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// Middleware to parse JSON requests
app.use(express.json());

const{UserRouter} = require('./routes/users');
const{CoursesRouter} = require('./routes/courses');
const{adminRouter} = require('./routes/admin');

app.use("/user",UserRouter);
app.use("/courses",CoursesRouter);
app.use("/admin", adminRouter);

app.listen(3000);
console.log('Server is listening on port 3000');