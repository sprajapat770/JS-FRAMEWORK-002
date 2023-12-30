const http = require('http');
const fs = require('fs');
const _ = require('lodash');

//server request handler
const server = http.createServer((req, res) => {

    //lodash
    const num = _.random(0, 20);
    console.log(num);
    // request object
    // console.log('request made');
    // console.log(req.url, req.method);

    const greet = _.once(() => {
        console.log('hello');
    });

    // const greet = () => {
    //     console.log('hello');
    // };

    greet();
    greet();

    let diff = _.difference([2, 1, 5, 3], [2, 4, 3]);

    console.log(diff);
    // response object
    // res.setHeader('Content-Type', 'text/plain');
    // res.write('Hello Server')
    // res.end();

    //response object 2 (html)
    // res.setHeader('Content-Type', 'text/html');
    // res.write('<h1>Hello Server</h1>');
    // res.write('<p>Hello Server</p>');
    // res.end();

    // returning html page
    // fs.readFile('./view/index.html', (err, data) => {

    //     if(err) {
    //         console.log(err);
    //         res.end();
    //     }else {
    //         // res.write(data);
    //         // res.end();
    //         res.end(data);
    //     }
    // })

    // Basic Routing
    let path = './view/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location','/about');
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        }else {
            res.end(data);
        }
    })

    //status code
    // 200 - ok
    // 301 - resource moved permanent redirect
    // 404- Not founf
    // 500 Internal server error

    // 100 range - informational response
    // 200 range - success codes
    // 300 range - coces for redirect
    // 400 range - user or client error codes
    // 500 range - server error codes
    // res.statusCode = 200;

    // // redirect
    // res.statusCode = 301;
    // res.setHeader('Location', '/about');
})

//serer configurations
server.listen(3000, 'localhost', () => {
    console.log('listening on request on port 3000');
});