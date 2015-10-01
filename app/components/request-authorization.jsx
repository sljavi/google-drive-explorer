'use strict';

var
    React = require('react'),
    Loader = require('react-loader');

module.exports = React.createClass({
    displayName: 'RequestAuthorization',
    propTypes: {
        handleAuthClick: React.PropTypes.func.isRequired,
        loadingClient: React.PropTypes.bool.isRequired
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
        return (
            <div>
                <Loader loaded={!this.props.loadingClient} options={this.getLoaderOptions()}>
                    <div>
                        <h1 className="cover-heading">Accede a Google Drive</h1>
                        <p className="lead">Solo permisos de lectura son solicitados</p>
                        <p className="lead">
                            <button
                                className="btn btn-lg btn-default"
                                onClick={this.props.handleAuthClick}>Autorizar</button>
                        </p>
                    </div>
                </Loader>
            </div>
        );
    }
});
