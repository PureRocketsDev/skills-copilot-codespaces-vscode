// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const qs = require('querystring');
const comments = [];
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const parsedQuery = qs.parse(parsedUrl.query);
    const pathname = parsedUrl.pathname;
    if (pathname === '/') {
        fs.readFile('./views/index.html', 'utf8', (err, data) => {
            if (err) {
                return console.error(err);
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data);
        });
    } else if (pathname === '/comments') {
        if (req.method === 'GET') {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(comments));
        } else if (req.method === 'POST') {
            let body = '';
            req.on('data', (data) => {
                body += data;
            });
            req.on('end', () => {
                const comment = qs.parse(body);
                comments.push(comment);
                res.writeHead(201, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(comment));
            });
        } else {
            res.writeHead(404);
            res.end();
        }
    } else {
        fs.readFile(`.${pathname}`, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end();
                return;
            }
            const extname = path.extname(pathname).substring(1);
            res.writeHead(200, {
                'Content-Type': `text/${extname}`
            });
            res.end(data);
        });
    }
});
server.listen(3000);
console.log('Server is running on http://localhost:3000');


