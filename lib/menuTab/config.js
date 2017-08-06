export default function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('public.menu', {
            url: "/menu",
            class: 'module-menu',
            views: {
                'content': {
                    templateProvider: ($templateCache) => $templateCache.get('module/menuTab.html'),
                    controller: "MenuController as menuController"
                }
            }
        })
}