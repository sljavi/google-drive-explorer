'use strict';

var
    redux = require('redux'),
    rootReducer = require('../reducers/reducers'),
    thunkMiddleware = require('redux-thunk'),
    createLogger = require('redux-logger');

var
    createStore = redux.createStore,
    applyMiddleware = redux.applyMiddleware,
    loggerMiddleware = createLogger(),
    createStoreWithMiddleware;

createStoreWithMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore);

module.exports = function(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
};
