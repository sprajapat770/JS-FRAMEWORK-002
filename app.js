const express = require('express');

//express app
const app = express();

//listen for port 3000
app.listen(3000);

app.get('/', (req, res) => {
    
    //possible old methods
    //res.write()
    //res.end();
    
    //express response object
    // res.send('<p>home page</p>');

    //send file response
    res.sendFile('./view/index.html', {root: __dirname });
});

app.get('/about', (req, res) => {
    //express response object
    // res.send('<p>About Page</p>');

    //send file response
    res.sendFile('./view/about.html', {root: __dirname });
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
    res.sendFile('./view/404.html', {root: __dirname });
});

//some concept of websocket connection possible with express