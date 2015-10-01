'use strict';

var
    googleClientApi = require('google-client-api'),
    _ = require('lodash'),
    async = require('async');

var gapi = null;

function checkAuth(immediate, cb) {
    gapi.auth.authorize({
        client_id: '929630120120-7h4qmlflg6bmjp6csg2rqkascjbstb20.apps.googleusercontent.com',
        scope: ['https://www.googleapis.com/auth/drive.metadata.readonly'],
        authuser: '0',
        immediate: immediate
    }, function(authResult) {
        if (authResult && authResult.error) {
            return cb(new Error(authResult.error));
        }
        cb();
    });
}

function handleAuthClick(cb) {
    checkAuth(false, cb);
}

function auth(cb) {
    googleClientApi(function(gapiInstance) {
        gapi = gapiInstance;
        checkAuth(true, cb);
    });
}

function loadDriveApi(cb) {
    gapi.client.load('drive', 'v2', function(result) {
        if (result && result.error) {
            return cb(new Error(result.error));
        }
        cb();
    });
}

function listAllFiles(cb) {
    var
        items = [],
        nextPageToken = null,
        request = gapi.client.drive.files.list();

    async.doWhilst(
        function loadPageFiles(loadCallback) {
            request = gapi.client.drive.files.list({
                'pageToken': nextPageToken
            });
            request.execute(function(resp) {
                if (resp && resp.error) {
                    return loadCallback(resp.error);
                }
                items = items.concat(resp.items);
                nextPageToken = resp.nextPageToken;
                loadCallback();
            });
        },
        function areThereMoreFilesToLoad() {
            return nextPageToken;
        },
        function endHandler(err) {
            if (err) {
                return cb(err);
            }
            items = _.reject(items, function(file) {
                return file.explicitlyTrashed || file.labels.trashed;
            });
            items = _.sortBy(items, 'title');
            return cb(null, items);
        }
    );
}

module.exports = {
    auth: auth,
    handleAuthClick: handleAuthClick,
    load: loadDriveApi,
    listAllFiles: listAllFiles
};
