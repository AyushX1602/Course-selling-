const {Router} = require('express');

const UserRouter = Router();

UserRouter.post('/signup', (req, res) => {
    res.json({ message: 'User created' });
});


UserRouter.post('/signin', (req, res) => {
    res.json({ message: 'User signed in' });
});


UserRouter.post('/purchases', (req, res) => {
    res.json({ message: 'User purchases' });
});

module.exports = {UserRouter: UserRouter};