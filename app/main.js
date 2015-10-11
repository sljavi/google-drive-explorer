'use strict';

var
    Main = require('./components/main'),
    React = require('react'),
    ReactDOM = require('react-dom'),
    configureStore = require('./store/configureStore'),
    Provider = require('react-redux').Provider,
    actions = require('./actions/actions');

var
    store = configureStore(),
    providerComponent = <Provider store={store}><Main/></Provider>;

store.dispatch(actions.downloadGoogleClient());
ReactDOM.render(providerComponent, document.getElementById('app'));
