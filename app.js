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
    
});

app.get('/about', (req, res) => {
    //express response object
    // res.send('<p>About Page</p>');
});


//some concept of websocket connection possible with express