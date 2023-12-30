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
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then(result => res.render('index', {title: 'Home', blogs: result}))
    .catch(err =>console.log(err));
});

app.get('/about', (req, res) => {
    res.render('about',{title: 'About'});
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    
    blog.save().then(result => {
        res.redirect('/blogs');
    }).catch(err => console.log(err));
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'A New Blog'});
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result => res.render('details', {title: 'Blog Detail', blog: result}))
    .catch(err => console.log( err));
});

app.delete('/blogs/:id', (req, res) => { 
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result => { res.json({ redirect: '/blogs'})})
    .catch(err => console.log( err));
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


//Request Types
//GET
//POST
//DELETE
//PUT