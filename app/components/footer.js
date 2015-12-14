'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'Footer',
    render: function() {
        return (
            <div className="mastfoot clearfix">
                <div className="inner">
                    By Javier Perez
                </div>
            </div>
        );
    }
});
