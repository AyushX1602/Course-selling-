const express = require('express');
const app = express();

app.post('/user/signup', (req, res) => {

    res.send('User signed up');
});


app.post('/user/signin', (req, res) => {

    res.send('User signed in');
});


app.get('/user/purchases', (req, res) => {

    res.send('User purchased a course');
});


app.post('/course/purchase', (req, res) => {

    res.send('User purchased a course');
});


app.get('/courses', (req, res) => {

    res.send('User purchased a course');
});



app.listen(3000);
console.log('Server is listening on port 3000');