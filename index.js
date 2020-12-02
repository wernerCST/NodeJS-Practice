const http = require('http');

// Servenr
const server = http.createServer((req, res) => {
    const pathName = req.url;

    if(pathName === '/' || pathName === '/overview') {
        res.end('This is the overview');
    } else if (pathName === '/product') {
        res.end('Helo from the product');
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