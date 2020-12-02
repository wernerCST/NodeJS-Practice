const fs = require('fs');
const http = require('http');
const url = require('url');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// Servenr
const server = http.createServer((req, res) => {
    const pathName = req.url;

    if(pathName === '/' || pathName === '/overview') {
        res.end('This is the overview');
    } else if (pathName === '/product') {
        res.end('Helo from the product');
    } else if (pathName === '/api') {
       res.writeHead(200, {'Content-type': 'application/json'});
       res.end(data);
        
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world'
        });
        res.end('<h1>404 Page not found</h1>');
    }
    


});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listne to requests on port 8000');
});