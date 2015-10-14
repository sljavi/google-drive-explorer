'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'Header',
    render: function() {
        return (
            <div className="masthead clearfix">
                <div className="inner">
                    <h3 className="masthead-brand">Google Drive Explorer</h3>
                    <nav>
                        <ul className="nav masthead-nav">
                            <li className="active"><a href="/">Home</a></li>
                            <li><a href="/report" target="_blank">Report</a></li>
                            <li><a href="/coverage.html" target="_blank">Coverage</a></li>
                            <li><a href="https://github.com/sljavi/google-drive-explorer" target="_blank">Github</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
});
