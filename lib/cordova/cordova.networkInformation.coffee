module.exports = angular.module 'Teknoputra.Ionic.cordova'
    .run ($log, $WPHCConfig, $cordovaNetwork, $ionicPlatform) ->
        $log.info 'cordova network information'

        $ionicPlatform.ready () ->
            $log.debug $cordovaNetwork.getNetwork(), 'network information'
