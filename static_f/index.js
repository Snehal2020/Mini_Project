const http = require('http')
const fs = require('fs')

const hostname = '127.0.0.1';
const port = 3000;
const home = fs.readFileSync('index.html');
const about = fs.readFileSync('./about.html');
const join = fs.readFileSync('./join.html');
const contact = fs.readFileSync('./contact.html');
const donate = fs.readFileSync('./donate.html');

const server = http.createServer((req, res) => {
    console.log(req.url)
    url = req.url;
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    if (url == '/')
        res.end(home)
    else if (url == '/about')
        res.end(about)
    else if (url == '/join')
        res.end(join)
    else if (url == '/contact')
        res.end(contact)
    else if (url == '/donate')
        res.end(donate)
    else {
        res.statusCode = 404
        res.end("404 not found")
    }


})
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});