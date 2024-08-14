// Create web server
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Read comments.json file
const comments = require('./comments.json');

// Create server
http.createServer((req, res) => {
    // Get the URL
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    let path = parsedUrl.pathname;

    // Get the query
    const query = parsedUrl.query;

    // Get the method
    const method = req.method;

    // Handle GET request
    if (method === 'GET') {
        // If the path is /comments
        if (path === '/comments') {
            // Set the response header
            res.setHeader('Content-Type', 'application/json');
            // Send the comments
            res.end(JSON.stringify(comments));
        }
    }

    // Handle POST request
    if (method === 'POST') {
        // If the path is /comments
        if (path === '/comments') {
            // Set the response header
            res.setHeader('Content-Type', 'application/json');
            // Set the response status
            res.statusCode = 201;

            // Get the body
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });

            // When the request has ended
            req.on('end', () => {
                // Parse the body
                const bodyParsed = JSON.parse(body);
                // Add the new comment
                comments.push(bodyParsed);
                // Write the new comments to the comments.json file
                fs.writeFileSync('./comments.json', JSON.stringify(comments));
                // Send the comments
                res.end(JSON.stringify(comments));
            });
        }
    }
}).listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});