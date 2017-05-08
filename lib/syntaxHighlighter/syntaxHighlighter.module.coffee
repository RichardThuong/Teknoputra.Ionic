# highlight code

# module.exports = angular.module 'Teknoputra.Ionic.syntaxHighlighter', [] if !IS_TECH

require 'highlight.js'
require 'highlight.js/styles/default.css'
require 'angular-highlightjs'

module.exports = angular.module 'Teknoputra.Ionic.syntaxHighlighter', [
    'hljs'
]

require "./syntaxHighlighter.filter.coffee"
require "./syntaxHighlighter.config.coffee"
