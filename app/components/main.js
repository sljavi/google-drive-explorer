'use strict';

var
    React = require('react'),
    RequestAuthorization = require('./request-authorization'),
    Explorer = require('./explorer/explorer'),
    Footer = require('./footer'),
    Header = require('./header'),
    $ = require('jquery'),
    actions = require('../actions/actions');

var connectRedux = require('react-redux').connect;

require('bootstrap.css');
require('bootstrap-theme.css');
require('../styles/theme.css');

var mainComponet = React.createClass({
    displayName: 'Main',
    propTypes: {
        requestAuthorization: React.PropTypes.bool.isRequired,
        files: React.PropTypes.array,
        loadingFiles: React.PropTypes.bool.isRequired,
        loadingClient: React.PropTypes.bool.isRequired
    },
    componentDidMount: function() {
        $(window).resize((function() {
            this.forceUpdate();
        }).bind(this));
    },
    handleAuthClick: function() {
        this.props.dispatch(actions.authorizeGoogleClient());
    },
    renderRequestAuthorization: function() {
        var props;
        if (this.props.requestAuthorization) {
            props = {
                handleAuthClick: this.handleAuthClick,
                loadingClient: this.props.loadingClient
            };
            return <RequestAuthorization {...props} />;
        }
    },
    rederExplorer: function() {
        var props;
        if (!this.props.requestAuthorization) {
            props = {
                files: this.props.files,
                maxHeight: this.calculateExplorerMaxHeight(),
                maxWidth: this.calculateExplorerMaxWidth(),
                loadingFiles: this.props.loadingFiles
            };
            return <Explorer {...props} />;
        }
    },
    calculateExplorerMaxHeight: function() {
        var
            headerHeight = $('.masthead').outerHeight(true),
            footerHeight = $('.mastfoot').outerHeight(true),
            bodyHeight = $('body').outerHeight(true);

        return bodyHeight - headerHeight - footerHeight;
    },
    calculateExplorerMaxWidth: function() {
        return $('body').outerWidth() - 40;
    },
    render: function() {
        return (
            <div className="site-wrapper">
                <div className="site-wrapper-inner">
                    <div className="cover-container">
                        <Header />
                        <div className="inner cover clearfix">
                            {this.renderRequestAuthorization()}
                            {this.rederExplorer()}
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
});

function selectProps(state) {
    return {
        requestAuthorization: state.app.requestAuthorization,
        files: state.app.files,
        loadingFiles: state.app.loadingFiles,
        loadingClient: state.app.loadingClient
    };
}

module.exports = connectRedux(selectProps)(mainComponet);
