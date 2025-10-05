const {Router} = require('express');

const courseRouter = Router();

courseRouter.post('/create', (req, res) => {
    res.json({ message: 'Course created' });
});


courseRouter.post('/signin', (req, res) => {
    res.json({ message: 'Course signed in' });
});


UserRouter.post('/purchases', (req, res) => {
    res.json({ message: 'User purchases' });
});

module.exports = {courseRoute: courseRouter};