'use strict';
let express = require('express');

// returns a router instance which can be mounted as a middleware 
let router = express.Router();

router.route('/') // the root path relative to the path where it is mounted 
    .get(function (req, res) {

    })
    .post(function (req, res) {
    
    });

router.route('/:name')
    .all(function (req, res, next) { // this comes in place of the app.param() used in the app.js
        req.blockName = 'some formatting here';
        next();
    })
    .get(function (req, res) {

    });

// exports the router as a Node module
module.exports = router;


// then, in the app.js we would import this route and mount it in the '/blocks' path

let blocks = require('./routes/blocks');
app.use('/blocks', blocks);
