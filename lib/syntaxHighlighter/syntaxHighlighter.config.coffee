module.exports = angular.module('Teknoputra.Ionic.syntaxHighlighter')
    .config ($WPHCConfig, hljsServiceProvider) ->
        hljsServiceProvider.setOptions $WPHCConfig.syntaxHighlighter
