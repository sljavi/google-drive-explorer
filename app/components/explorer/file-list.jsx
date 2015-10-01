'use strict';

var
    React = require('react'),
    File = require('./file.jsx'),
    Folder = require('./folder.jsx'),
    _ = require('lodash'),
    cx = require('classnames');

require('./../../styles/file-list.css');

module.exports = React.createClass({
    displayName: 'FileList',
    propTypes: {
        files: React.PropTypes.array.isRequired,
        allFiles: React.PropTypes.array.isRequired,
        opened: React.PropTypes.bool.isRequired
    },
    sort: function(files) {
        return _.sortBy(files, function(file) {
            return file.title;
        });
    },
    isFolder: function(file) {
        return file.mimeType === 'application/vnd.google-apps.folder';
    },
    renderFiles: function() {
        return this.getFiles().map(function(file) {
            return <File file={file} key={file.id}/>;
        });
    },
    renderFolders: function() {
        return this.getFolders().map(function(file) {
            return <Folder folder={file}
                allFiles={this.props.allFiles}
                key={file.id}
                opened={false}/>;
        }, this);
    },
    getFiles: function() {
        return _.reject(this.props.files, this.isFolder);
    },
    getFolders: function() {
        return _.filter(this.props.files, this.isFolder);
    },
    render: function() {
        if (_.isEmpty(this.props.files)) {
            return null;
        }
        var classes = cx('fileList', {
            hide: !this.props.opened
        });
        return (
            <div className={classes}>
                {this.renderFolders()}
                {this.renderFiles()}
            </div>
        );
    }
});
