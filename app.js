const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { result } = require('lodash');

//express app
const app = express();
const dbURI = 'mongodb+srv://suraj:suraj@nodetuts.xtrdwpo.mongodb.net/node-tuts?retryWrites=true&w=majority';

mongoose.connect(dbURI)

.then(result =>  { console.log('connected to db'); app.listen(3000)})
.catch(err => console.log('err'));

app.set('view engine', 'ejs');
app.set('views', 'view');
//listen for port 3000

//middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/add-blog', (req, res) => {
    console.log('blog page');
    const blog = new Blog({
        title: 'My First Blog',
        snippet: 'My first Blog snippet',
        body: 'Finally Released the blog to show you guys!'
    });

    blog.save().then(result => {
        res.send(result);
    }).catch(err => console.log(err));
});

app.get('/all-blog', (req, res) => {
    Blog.find().then(result => res.send(result))
    .catch(err =>console.log(err));
});

app.get('/single-blog', (req, res) => {
    Blog.findById('65900bc5220740e0db6b39e2').then(result => res.send(result))
    .catch(err =>console.log(err));
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