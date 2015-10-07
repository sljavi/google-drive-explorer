'use strict';

var
    React = require('react'),
    _ = require('lodash'),
    FileList = require('./file-list'),
    Loader = require('react-loader');

require('../../styles/explorer.css');

module.exports = React.createClass({
    displayName: 'Explorer',
    propTypes: {
        files: React.PropTypes.array.isRequired,
        maxHeight: React.PropTypes.number.isRequired,
        loadingFiles: React.PropTypes.bool.isRequired,
        maxWidth: React.PropTypes.number.isRequired
    },
    getFileList: function() {
        return _.filter(this.props.files, function(file) {
            return _.some(file.parents, function(parent) {
                return parent.isRoot;
            });
        });
    },
    getLoaderOptions: function() {
        return {
            lines: 13,
            length: 28,
            width: 14,
            radius: 42,
            scale: 0.75,
            corners: 1,
            color: '#fff',
            opacity: 0.25,
            rotate: 0,
            direction: 1,
            speed: 1,
            trail: 60,
            fps: 20,
            zIndex: 2e9,
            className: 'spinner',
            top: '50%',
            left: '50%',
            shadow: true,
            hwaccel: false,
            position: 'absolute'
        };
    },
    render: function() {
        var style = {
            maxHeight: this.props.maxHeight + 'px',
            maxWidth: this.props.maxWidth + 'px',
        };
        return (
            <Loader loaded={!this.props.loadingFiles} options={this.getLoaderOptions()}>
                <pre className="explorer" style={style}>
                    <FileList files={this.getFileList()} allFiles={this.props.files} opened={true}/>
                </pre>
            </Loader>
        );
    }
});
