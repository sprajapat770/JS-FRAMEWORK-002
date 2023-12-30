const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const { result } = require('lodash');
const  blogRoutes = require('./routes/blogRoutes');

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

app.get('/about', (req, res) => {
    res.render('about',{title: 'About'});
});

//redirects
app.get('/about-us', (req, res) => {
    //send file response
    res.redirect('/about');
});

app.use('/blogs', blogRoutes);

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