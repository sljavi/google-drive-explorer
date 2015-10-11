'use strict';

var
    googleClient = require('../lib/google-client'),
    async = require('async');

function startGoogleClientDownload() {
    return {
        type: 'START_GOOGLE_CLIENT_DOWNLOAD'
    };
}

function endGoogleClientDownload() {
    return {
        type: 'END_GOOGLE_CLIENT_DOWNLOAD'
    };
}

function requestGoogleClientAuth() {
    return {
        type: 'REQUEST_GOOGLE_CLIENT_AUTH'
    };
}

function doNotRequestGoogleClientAuth() {
    return {
        type: 'DO_NOT_REQUEST_GOOGLE_CLIENT_AUTH'
    };
}

function startFilesDownload() {
    return {
        type: 'START_FILES_DOWNLOAD'
    };
}

function receiveDownloadedFiles(files) {
    return {
        type: 'RECEIVE_DOWNLOADED_FILES',
        files: files
    };
}

function startAuthorizeGoogleClient() {
    return {
        type: 'START_AUTORIZE_GOOGLE_CLIENT'
    };
}

function endAuthorizeGoogleClient() {
    return {
        type: 'END_AUTORIZE_GOOGLE_CLIENT'
    };
}

function loadFiles() {
    return function(dispatch) {
        dispatch(startFilesDownload());
        async.waterfall([
            googleClient.load,
            googleClient.listAllFiles
        ], function(err, files) {
            if (err) {
                return console.error(err);
            }
            dispatch(receiveDownloadedFiles(files));
        });
    };
}

function authorizeGoogleClient() {
    return function(dispatch) {
        dispatch(startAuthorizeGoogleClient());
        googleClient.handleAuthClick(function(err) {
            dispatch(endAuthorizeGoogleClient());
            if (!err) {
                dispatch(doNotRequestGoogleClientAuth());
                dispatch(loadFiles());
            } else {
                console.error(err);
            }
        });
    };
}

function downloadGoogleClient() {
    return function(dispatch) {
        dispatch(startGoogleClientDownload());
        googleClient.auth(function(err) {
            dispatch(endGoogleClientDownload());
            if (err) {
                console.error(err);
                dispatch(requestGoogleClientAuth());
            } else {
                dispatch(doNotRequestGoogleClientAuth());
                dispatch(loadFiles());
            }
        });
    };
}


module.exports = {
    startGoogleClientDownload: startGoogleClientDownload,
    endGoogleClientDownload: endGoogleClientDownload,
    requestGoogleClientAuth: requestGoogleClientAuth,
    doNotRequestGoogleClientAuth: doNotRequestGoogleClientAuth,
    startFilesDownload: startFilesDownload,
    receiveDownloadedFiles: receiveDownloadedFiles,
    startAuthorizeGoogleClient: startAuthorizeGoogleClient,
    endAuthorizeGoogleClient: endAuthorizeGoogleClient,
    loadFiles: loadFiles,
    authorizeGoogleClient: authorizeGoogleClient,
    downloadGoogleClient: downloadGoogleClient
};
