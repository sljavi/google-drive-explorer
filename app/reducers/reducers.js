'use strict';

var combineReducers = require('redux').combineReducers;

var initialState = {
    requestAuthorization: true,
    files: [],
    loadingFiles: false,
    loadingClient: false
};

var handlers = {
    START_GOOGLE_CLIENT_DOWNLOAD: function(state) {
        state.loadingClient = true;
    },
    END_GOOGLE_CLIENT_DOWNLOAD: function(state) {
        state.loadingClient = false;
    },
    REQUEST_GOOGLE_CLIENT_AUTH: function(state) {
        state.requestAuthorization = true;
    },
    DO_NOT_REQUEST_GOOGLE_CLIENT_AUTH: function(state) {
        state.requestAuthorization = false;
    },
    START_FILES_DOWNLOAD: function(state) {
        state.loadingFiles = true;
    },
    RECEIVE_DOWNLOADED_FILES: function(state, action) {
        state.loadingFiles = false;
        state.files = action.files;
    },
    START_AUTORIZE_GOOGLE_CLIENT: function(state) {
        state.loadingClient = true;
    },
    END_AUTORIZE_GOOGLE_CLIENT: function(state) {
        state.loadingClient = false;
    }
};

function app(state, action) {
    state = state || initialState;
    if (handlers[action.type]) {
        state = Object.assign({}, state);
        handlers[action.type](state, action);
    }
    return state;
};

module.exports = combineReducers({
    app: app
});
