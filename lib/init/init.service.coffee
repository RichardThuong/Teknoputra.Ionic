module.exports = angular.module 'Teknoputra.Ionic.init'
    .service '$WPHCInit', ($q, $WPHCConfig, $log, $WPHCCacheImg) ->
        init: ->
            promises = []
            promises.push $WPHCCacheImg.init()
            $q.all promises
            .then ->
                $log.info 'Init: success!'
