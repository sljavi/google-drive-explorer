'use strict';

var
    React = require('react'),
    _ = require('lodash');

var FileList;

require('../../styles/folder.css');

module.exports = React.createClass({
    displayName: 'Folder',
    propTypes: {
        folder: React.PropTypes.object.isRequired,
        allFiles: React.PropTypes.array.isRequired,
        opened: React.PropTypes.bool.isRequired
    },
    componentWillMount: function() {
        FileList = require('./file-list');
    },
    getInitialState: function() {
        return {
            opened: this.props.opened
        };
    },
    getFiles: function() {
        var self = this;
        return _.filter(this.props.allFiles, function(file) {
            return _.any(file.parents, function(parent) {
                return parent.id === self.props.folder.id;
            });
        });
    },
    handleClick: function() {
        this.setState({
            opened: !this.state.opened
        });
    },
    render: function() {
        var folder = this.props.folder;
        return (
            <div className="folder">
                <div className="folder-name" onClick={this.handleClick}><img src={folder.iconLink} /> {folder.title}</div>
                <FileList
                    files={this.getFiles()}
                    allFiles={this.props.allFiles}
                    opened={this.state.opened}/>
            </div>
        );
    }
});
