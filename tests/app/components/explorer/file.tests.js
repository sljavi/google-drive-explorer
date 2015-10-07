'use strict';

var
    jsdom = require('mocha-jsdom'),
    React = require('react/addons'),
    _ = require('lodash'),
    File = require('../../../../tmp/app/components/explorer/file.js');

var TestUtils = React.addons.TestUtils;

global.reactModulesToStub = [

];

var assert = require('assert');

describe('file', function() {
    jsdom();

    var file, props, fileComponent;

    before(function() {
        props = {
            file: {
                alternateLink: 'foo',
                iconLink: 'bar',
                title: 'baz'
            }
        };
        file = TestUtils.renderIntoDocument(React.createElement(File, props));
    });

    it('renders the file component', function() {
        fileComponent = TestUtils.findRenderedDOMComponentWithClass(file, 'file');
        assert.equal(fileComponent.props.href, props.file.alternateLink);
    });

    it('renders the icon', function() {
        var icon = TestUtils.findRenderedDOMComponentWithTag(file, 'img');
        assert.equal(icon.props.src, props.file.iconLink);
    });

    it('renders the file title', function() {
        assert.equal(_.last(fileComponent.props.children), props.file.title);
    });

});
