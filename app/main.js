'use strict';

var
    async = require('async'),
    Main = require('./components/main'),
    googleClient = require('./lib/google-client'),
    React = require('react/addons');

var mainComponent;

function loadFiles() {
    mainComponent.setProps({
        loadingFiles: true
    });
    async.waterfall([
        googleClient.load,
        googleClient.listAllFiles
    ], function(err, files) {
        if (err) {
            return console.error(err);
        }
        mainComponent.setProps({
            loadingFiles: false,
            files: files
        });
    });
}

function handleAuthClick() {
    mainComponent.setProps({
        loadingClient: true
    });
    googleClient.handleAuthClick(function(err) {
        mainComponent.setProps({
            loadingClient: false
        });
        if (!err) {
            mainComponent.setProps({
                requestAuthorization: false
            });
            loadFiles();
        } else {
            console.error(err);
        }
    });
}

function loadClient() {
    mainComponent.setProps({
        loadingClient: true
    });
    googleClient.auth(function(err) {
        if (err) {
            mainComponent.setProps({
                loadingClient: false,
                requestAuthorization: true
            });
        } else {
            mainComponent.setProps({
                loadingClient: false,
                requestAuthorization: false
            });
            loadFiles();
        }
    });
}

function initializeApp() {
    var props = {
        handleAuthClick: handleAuthClick,
        requestAuthorization: true,
        files: [],
        loadingFiles: false,
        loadingClient: false
    };

    mainComponent = React.render(<Main {...props} />, document.body);

    loadClient();
}

initializeApp();
