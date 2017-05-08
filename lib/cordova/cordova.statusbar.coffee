module.exports = angular.module 'Teknoputra.Ionic.cordova'
    .run ($log, $WPHCConfig, $cordovaStatusbar, $ionicPlatform) ->
        $log.info 'cordova statusbar'

        $ionicPlatform.ready () ->
            $cordovaStatusbar.styleHex $WPHCConfig.cordova.statubar.color
            if $WPHCConfig.cordova.statubar.show
                $cordovaStatusbar.show()
            else
                $cordovaStatusbar.hide()
