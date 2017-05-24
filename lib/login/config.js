export default function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('public.login', {
            url: "/login",
            class: 'module-login',
            views: {
                'content': {
                    templateProvider: ($templateCache) => $templateCache.get('module/login.html'),
                    controller: "WPHCLoginController as loginCtrl"
                }
            }
        })
        .state('public.logout', {
            url: "/logout",
            class: 'module-login',
            views: {
                'content': {
                    templateProvider: ($templateCache) => $templateCache.get('module/login.html'),
                    controller: "WPHCLoginController as loginCtrl"
                }
            }
        })
}