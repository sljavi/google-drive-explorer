'use strict';

var
    jsdom = require('mocha-jsdom'),
    TestUtils = require('react-addons-test-utils'),
    React = require('react'),
    ReactDOM = require('react-dom'),
    assert = require('assert'),
    File = require('../../../../tmp/app/components/explorer/file.js');

describe('file', function() {
    jsdom();

    var file, props, $;

    before(function loadJquery() {
        var jquery = require('jquery');
        $ = function(el) {
            return jquery(ReactDOM.findDOMNode(el) || el);
        };
    });

    before(function initializeComponent() {
        props = {
            file: {
                alternateLink: 'http://foo.bar/',
                iconLink: 'http://bar/foo.png',
                title: 'baz'
            }
        };
        file = TestUtils.renderIntoDocument(React.createElement(File, props));
    });

    it('renders the component', function() {
        assert.ok($(file).length);
    });

    it('renders the file url', function() {
        assert.equal($(file).prop('href'), props.file.alternateLink);
    });

    it('renders the icon', function() {
        assert.equal($(file).find('img').prop('src'), props.file.iconLink);
    });

    it('renders the file title', function() {
        assert.equal($(file).find('.file-name').text(), props.file.title);
    });

});
