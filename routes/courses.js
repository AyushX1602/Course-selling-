const {Router} = require('express');

const courseRouter = Router();

courseRouter.post('/purchase', (req, res) => {
    res.json({ message: 'Course purchased' });
});


courseRouter.get('/preview', (req, res) => {
    res.json({ message: 'Course previewed' });
});



module.exports = {CoursesRouter: courseRouter};