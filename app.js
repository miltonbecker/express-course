'use strict';
let express = require('express');
let logger = require('./logger');
let bodyParser = require('body-parser');

//creates an app instance
let app = express();

app.use(logger);
app.use(express.static('public'));
app.use('/lib', express.static('lib'));

let blocks = {
    Fixed: 'Fastened',
    Movable: 'Capable',
    Rotating: 'Moving'
};

app.get('/blocks', function (req, res) {
    let keys = Object.keys(blocks);
    if (req.query.limit > 0) {
        res.json(keys.slice(0, req.query.limit))
    } else {
        res.json(keys);
    }
});

function formatName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

// app.param maps placeholders to callback functions
// it is used to run pre-conditions on dynamic routes / intercept and treat dynamic route variables 
app.param('name', function (req, res, next) {
    let name = req.params.name;
    let blockName = formatName(name);

    req.blockName = blockName;

    next();
});

// :name is called a 'dynamic route variable'
app.get('/blocks/:name', function (req, res) {
    let desc = blocks[ req.blockName ];
    if (!desc) {
        res.status(404).json('No description found for ' + req.params.name);
    } else {
        res.json(desc);
    }
});

let parseUrlEncoded = bodyParser.urlencoded({ extended: false });

app.post('/blocks', parseUrlEncoded, function (req, res) {
    let newBlock = req.body;
    let blockName = formatName(newBlock.name);
    blocks[ blockName ] = newBlock.desc;
    // status 201 = created
    res.status(201).json(blockName);
});

app.delete('/blocks/:name', function (req, res) {
    if (!blocks[ req.blockName ]) {
        res.sendStatus(404);
    } else {
        delete blocks[ req.blockName ];
        res.sendStatus(200);
    }
});

/* If you use the same route, you can chain methods, like:

app.route('/blocks') //creates a route instance for '/blocks'
  .get(function (req, res) {

  })
  .post(function (req, res) {

  })
  .delete(function (req, res) {

  });

*/

let port = 3000;
app.listen(port, function () {
    console.log('Listening on port %d', port);
});