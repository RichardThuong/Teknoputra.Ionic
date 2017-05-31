export default function($q, $window) {
    'ngInject';

    var loginURL = 'https://www.facebook.com/dialog/oauth',

        logoutURL = 'https://www.facebook.com/logout.php',

    // By default we store fbtoken in sessionStorage. This can be overridden in init()
        tokenStore = window.sessionStorage,

    // The Facebook App Id. Required. Set using init().
        fbAppId,

        context = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/")),

        baseURL = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + context,

    // Default OAuth redirect URL. Can be overriden in init()
        oauthRedirectURL = baseURL + 'http://localhost:8080/webpack-dev-server/www/index.html#/public/login',

    // Default Cordova OAuth redirect URL. Can be overriden in init()
        cordovaOAuthRedirectURL = "https://www.facebook.com/connect/login_success.html",

    // Default Logout redirect URL. Can be overriden in init()
        logoutRedirectURL = baseURL + '/logoutcallback.html',

    // Because the OAuth login spans multiple processes, we need to keep the login callback function as a variable
    // inside the module instead of keeping it local within the login function.
        loginCallback,

    // Indicates if the app is running inside Cordova
        runningInCordova,

    // Used in the exit event handler to identify if the login has already been processed elsewhere (in the oauthCallback function)
        loginProcessed;

    // MAKE SURE YOU INCLUDE <script src="cordova.js"></script> IN YOUR index.html, OTHERWISE runningInCordova will always by false.
    // You don't need to (and should not) add the actual cordova.js file to your file system: it will be added automatically
    // by the Cordova build process
    document.addEventListener("deviceready", function () {
        runningInCordova = true;
    }, false);

    return {
        init: function(params) {
            return doInit(params); 
        },
        login: function(options) {
            var deferred = $q.defer();
            doLogin(function(result) {
                if (result.status === "connected") {
                    deferred.resolve(result);
                } else {
                    deferred.reject(result);
                }
            }, options);
            return deferred.promise;
        }
    };

    function doInit(params) {
        if (params.appId) {
            fbAppId = params.appId;
        } else {
            throw 'appId parameter not set in init()';
        }

        if (params.tokenStore) {
            tokenStore = params.tokenStore;
        }

        if (params.accessToken) {
            tokenStore.fbAccessToken = params.accessToken;
        }

        loginURL = params.loginURL || loginURL;
        logoutURL = params.logoutURL || logoutURL;
        oauthRedirectURL = params.oauthRedirectURL || oauthRedirectURL;
        cordovaOAuthRedirectURL = params.cordovaOAuthRedirectURL || cordovaOAuthRedirectURL;
        logoutRedirectURL = params.logoutRedirectURL || logoutRedirectURL;
    }

    function doLogin(callback, options) {
        var loginWindow,
            startTime,
            scope = '',
            redirectURL = runningInCordova ? cordovaOAuthRedirectURL : oauthRedirectURL;

        if (!fbAppId) {
            return callback({status: 'unknown', error: 'Facebook App Id not set.'});
        }

        // Inappbrowser load start handler: Used when running in Cordova only
        function loginWindow_loadStartHandler(event) {
            var url = event.url;
            if (url.indexOf("access_token=") > 0 || url.indexOf("error=") > 0) {
                // When we get the access token fast, the login window (inappbrowser) is still opening with animation
                // in the Cordova app, and trying to close it while it's animating generates an exception. Wait a little...
                var timeout = 600 - (new Date().getTime() - startTime);
                setTimeout(function () {
                    loginWindow.close();
                }, timeout > 0 ? timeout : 0);
                oauthCallback(url);
            }
        }

        // Inappbrowser exit handler: Used when running in Cordova only
        function loginWindow_exitHandler() {
            console.log('exit and remove listeners');
            // Handle the situation where the user closes the login window manually before completing the login process
            if (loginCallback && !loginProcessed) loginCallback({status: 'user_cancelled'});
            loginWindow.removeEventListener('loadstart', loginWindow_loadStartHandler);
            loginWindow.removeEventListener('exit', loginWindow_exitHandler);
            loginWindow = null;
            console.log('done removing listeners');
        }

        if (options && options.scope) {
            scope = options.scope;
        }

        loginCallback = callback;
        loginProcessed = false;

        startTime = new Date().getTime();
        loginWindow = window.open(loginURL + '?client_id=' + fbAppId + '&redirect_uri=' + redirectURL +
            '&response_type=token&scope=' + scope, '_blank', 'location=no,clearcache=yes');

        // If the app is running in Cordova, listen to URL changes in the InAppBrowser until we get a URL with an access_token or an error
        if (runningInCordova) {
            loginWindow.addEventListener('loadstart', loginWindow_loadStartHandler);
            loginWindow.addEventListener('exit', loginWindow_exitHandler);
        }
        // Note: if the app is running in the browser the loginWindow dialog will call back by invoking the
        // oauthCallback() function. See oauthcallback.html for details.
    }
    
    function oauthCallback(url) {
        // Parse the OAuth data received from Facebook
        var queryString,
            obj;

        loginProcessed = true;
        if (url.indexOf("access_token=") > 0) {
            queryString = url.substr(url.indexOf('#') + 1);
            obj = parseQueryString(queryString);
            tokenStore.fbAccessToken = obj['access_token'];
            if (loginCallback) loginCallback({status: 'connected', authResponse: {accessToken: obj['access_token']}});
        } else if (url.indexOf("error=") > 0) {
            queryString = url.substring(url.indexOf('?') + 1, url.indexOf('#'));
            obj = parseQueryString(queryString);
            if (loginCallback) loginCallback({status: 'not_authorized', error: obj.error});
        } else {
            if (loginCallback) loginCallback({status: 'not_authorized'});
        }
    }

    function parseQueryString(queryString) {
        var qs = decodeURIComponent(queryString),
            obj = {},
            params = qs.split('&');
        params.forEach(function (param) {
            var splitter = param.split('=');
            obj[splitter[0]] = splitter[1];
        });
        return obj;
    }
}