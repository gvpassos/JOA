cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "es6-promise-plugin.Promise",
      "file": "plugins/es6-promise-plugin/www/promise.js",
      "pluginId": "es6-promise-plugin",
      "runs": true
    },
    {
      "id": "cordova-plugin-x-socialsharing.SocialSharing",
      "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
      "pluginId": "cordova-plugin-x-socialsharing",
      "clobbers": [
        "window.plugins.socialsharing"
      ]
    },
    {
      "id": "cordova-plugin-x-socialsharing.SocialSharingProxy",
      "file": "plugins/cordova-plugin-x-socialsharing/src/windows/SocialSharingProxy.js",
      "pluginId": "cordova-plugin-x-socialsharing",
      "runs": true
    },
    {
      "id": "cordova-plugin-inappbrowser.inappbrowser",
      "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
      "pluginId": "cordova-plugin-inappbrowser",
      "clobbers": [
        "cordova.InAppBrowser.open"
      ]
    },
    {
      "id": "cordova-plugin-inappbrowser.InAppBrowserProxy",
      "file": "plugins/cordova-plugin-inappbrowser/src/windows/InAppBrowserProxy.js",
      "pluginId": "cordova-plugin-inappbrowser",
      "runs": true
    },
    {
      "id": "phonegap-plugin-push.PushNotification",
      "file": "plugins/phonegap-plugin-push/www/push.js",
      "pluginId": "phonegap-plugin-push",
      "clobbers": [
        "PushNotification"
      ]
    },
    {
      "id": "phonegap-plugin-push.PushPlugin",
      "file": "plugins/phonegap-plugin-push/src/windows/PushPluginProxy.js",
      "pluginId": "phonegap-plugin-push",
      "runs": true
    }
  ];
  module.exports.metadata = {
    "at.modalog.cordova.plugin.cache": "1.1.0",
    "cordova-plugin-whitelist": "1.3.4",
    "es6-promise-plugin": "4.2.2",
    "cordova-plugin-x-socialsharing": "5.6.4",
    "cordova-plugin-inappbrowser": "4.0.0",
    "phonegap-plugin-push": "2.3.0"
  };
});