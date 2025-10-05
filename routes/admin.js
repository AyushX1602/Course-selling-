const {Router} = require('express');

const adminRouter = Router();

adminRouter.post('/signup', (req, res) => {
    res.json({ message: 'User created' });
});


adminRouter.post('/signin', (req, res) => {
    res.json({ message: 'User signed in' });
});

adminRouter.post('/courses', (req, res) => {
    res.json({ message: 'Course created' });
});

adminRouter.put('/courses', (req, res) => {
    res.json({ message: 'Course updated' });
});


adminRouter.get('/courses/bulk', (req, res) => {
    res.json({ message: 'Bulk courses retrieved' });
});



module.exports = {adminRouter: adminRouter};