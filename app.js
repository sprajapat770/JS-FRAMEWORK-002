const express = require('express');

//express app
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'view');
//listen for port 3000
app.listen(3000);

//middleware
app.use((req, res, next) => {
    console.log('new request made');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

app.use((req, res, next) => {
    console.log('in the next middleware');
    next();
});

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Your First Blog', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, voluptas?'},
        {title: 'Your Second Blog', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, voluptas?'},
        {title: 'Your Third Blog', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, voluptas?'},
    ]
    res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about',{title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'A New Blog'});
});

//redirects
app.get('/about-us', (req, res) => {
    //send file response
    res.redirect('/about');
});

//404 page
app.use((req, res) => {
    //use function trigger for every single request //this should be at bottom
    //send file response
    res.status(404).render('404', {title: '404'});
});

//some concept of websocket connection possible with express

//middleware
//Logger middleware to log details of every request
//Authentication check middleware for protected routes
//Middleware to parse JSON data from request
//Return 404 Pages