
module.exports = angular.module('Teknoputra.Ionic.directives').directive 'bindAndCompileHtml', ($compile) ->
    restrict: 'A'
    link: (scope, element, attrs) ->
        scope.$watch attrs.bindAndCompileHtml, (newValue, oldValue) ->
            element.html newValue
            $compile(element.contents())(scope)
