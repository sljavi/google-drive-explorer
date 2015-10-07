'use strict';

var
    fs = require('fs'),
    ReactTools = require('react-tools'),
    glob = require('glob'),
    async = require('async'),
    path = require('path'),
    _ = require('lodash'),
    mkpath = require('mkpath');

function getJsxFiles(cb) {
    glob(path.join(__dirname, '../app/**/*.js'), {}, cb);
}

function readFile(file, cb) {
    fs.readFile(file, 'utf8', function(err, data) {
        cb(err, file, data);
    });
}

function transformFile(file, fileContent, cb) {
    fileContent = ReactTools.transform(fileContent, {harmony: true});
    cb(null, file, fileContent);
}

function cleanCssRequires(fileContent) {
    var lines = fileContent.split('\n');
    return _.reject(lines, function(line) {
        return line.indexOf('require(') >= 0 && line.indexOf('.css') >= 0;
    }).join('\n');
}

function saveFile(file, fileContent, cb) {
    var folder;
    file = file.replace('/app/', '/tmp/app/');
    folder = file.split('/');
    folder.pop();
    fileContent = cleanCssRequires(fileContent);
    mkpath(folder.join('/'), function() {
        fs.writeFile(file, fileContent, 'utf8', cb);
    });
}

function transformFiles(files, cb) {
    async.eachSeries(files, function(file, innerCb) {
        async.waterfall([
            function(acb) {
                acb(null, file);
            },
            readFile,
            transformFile,
            saveFile
        ], innerCb);
    }, cb);
}

async.waterfall([getJsxFiles, transformFiles], function(err) {
    if (err) {
        return console.error(err);
    }
    console.log('JSX scripts transformed');
});
