'use strict';

var express = require('express');
var path = require('path');
var app = express();
var staticPath = path.join(__dirname, 'build');

app.use(express.static(staticPath))
    .get('/', function(req, res) {
        res.sendFile('index.html', {
            root: staticPath
        });
    }).listen(process.env.PORT || 8080, function(err) {
        if (err) {
            console.log(err);
        };
        console.log('Listening at localhost:8080');
    });

