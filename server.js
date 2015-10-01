'use strict';

var express = require('express');
var path = require('path');
var webpack = require('webpack');
var app = express();
var config = require('./webpack.config');
var WebpackDevServer = require('webpack-dev-server');

var isDevelopment = (process.env.NODE_ENV !== 'production');
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

if (isDevelopment) {
    new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true,
        inline: true
    }).listen(3000, 'localhost', function(err) {
        if (err) {
            console.log(err);
        }
        console.log('Listening at localhost:3000');
    });
}
