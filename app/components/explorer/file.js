'use strict';

var React = require('react');

require('../../styles/file.css');

module.exports = React.createClass({
    displayName: 'File',
    propTypes: {
        file: React.PropTypes.object.isRequired
    },
    render: function() {
        var file = this.props.file;
        return (
            <a href={file.alternateLink} className="file" target="_blank">
                <img src={file.iconLink} /> {file.title}
            </a>
        );
    }
});
