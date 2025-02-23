'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const recipeRouter = require('./recipeRouter')

const app = express();
const router = express.Router();
router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>You are running the root function</h1>');
    res.end();
});
router.get('/another', (req, res) => res.json({ ts: (new Date().toISOString()), route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/.netlify/functions/server', recipeRouter);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err.message
    });
});

module.exports = app;
module.exports.handler = serverless(app);
