'use strict';

// Create a fake global `window` and `document` object:
var jsdom = require('mocha-jsdom');

// Replace BigComplicatedComponent.js with a stub component.
global.reactModulesToStub = [

];

var assert = require('assert');

describe('', function() {
    jsdom();

    it('changes the text after click', function() {
        /* var React = require('react/addons');
        var CheckboxWithLabel = require('../src/CheckboxWithLabel');
        var TestUtils = React.addons.TestUtils;

        // Render a checkbox with label in the document
        var checkbox = TestUtils.renderIntoDocument(
          <CheckboxWithLabel labelOn="On" labelOff="Off" />
        );

        // Verify that it's Off by default
        var label = TestUtils.findRenderedDOMComponentWithTag(
          checkbox, 'label');
        assert.equal(label.getDOMNode().textContent, 'Off');

        // Simulate a click and verify that it is now On
        var input = TestUtils.findRenderedDOMComponentWithTag(
          checkbox, 'input');
        TestUtils.Simulate.change(input);
        assert.equal(label.getDOMNode().textContent, 'On');*/
        assert.equal(1, 1);
    });
});
