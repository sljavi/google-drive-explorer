(function () {
  'use strict';

  // Your Client ID can be retrieved from your project in the Google
  // Developer Console, https://console.developers.google.com
  var CLIENT_ID = '929630120120-7h4qmlflg6bmjp6csg2rqkascjbstb20.apps.googleusercontent.com';
  var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];

  /**
   * Check if current user has authorized this application.
   */
  function checkAuth() {
    window.gapi.auth.authorize({
      'client_id': CLIENT_ID,
      'scope': SCOPES,
      'immediate': true
    }, handleAuthResult);
  }

  /**
   * Handle response from authorization server.
   *
   * @param {Object} authResult Authorization result.
   */
  function handleAuthResult(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
      // Hide auth UI, then load client library.
      authorizeDiv.style.display = 'none';
      loadDriveApi();
    } else {
      // Show auth UI, allowing the user to initiate authorization by
      // clicking authorize button.
      authorizeDiv.style.display = 'inline';
    }
  }

  /**
   * Initiate auth flow in response to user clicking authorize button.
   *
   * @param {Event} event Button click event.
   */
  function handleAuthClick(event) {
    gapi.auth.authorize({
      client_id: CLIENT_ID,
      scope: SCOPES,
      immediate: false
    }, handleAuthResult);

    return false;
  }

  /**
   * Load Drive API client library.
   */
  function loadDriveApi() {
    gapi.client.load('drive', 'v2', listFiles);
  }

  /**
   * Print files.
   */
  function listFiles() {
    var request = gapi.client.drive.files.list({
      'maxResults': 10000
    });

    request.execute(function(resp) {
      appendPre('Files:');
      var files = resp.items;
      if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          appendPre(file.title + ' (' + file.id + ')');
        }
      } else {
        appendPre('No files found.');
      }
    });
  }

  /**
   * Append a pre element to the body containing the given message
   * as its text node.
   *
   * @param {string} message Text to be placed in pre element.
   */
  function appendPre(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }

  //Exposing google check out function
  window.checkAuth = checkAuth;
})();