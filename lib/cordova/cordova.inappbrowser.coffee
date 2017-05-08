module.exports = angular.module 'Teknoputra.Ionic.cordova'
    .config ($cordovaInAppBrowserProvider) ->
        defaultOptions =
            location: 'no',
            clearcache: 'no',
            toolbar: 'no'

        $cordovaInAppBrowserProvider.setDefaultOptions(defaultOptions)
