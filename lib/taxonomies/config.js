export default function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('public.taxonomies', {
            url: "/taxonomies/:term/:postType/:title",
            class: 'module-taxonomies-<%=term%>-<%=postType%>-<%=title%>',
            views: {
                'content': {
                    templateProvider: ($templateCache) => $templateCache.get('module/taxonomies/list.html'),
                    controller: "WPHCTaxonomiesController as taxonomiesCtrl"
                }
            }
        })
        .state('public.taxonomies.id', {
            url: "/:id/:title",
            class: 'module-taxonomies-<%=term%>-<%=postType%>-<%=id%>-<%=title%>',
            params: {
                taxonomy: null
            },
            views: {
                'content@public': {
                    templateProvider: ($templateCache, $stateParams) => {
                        //debugger;
                        if ($stateParams.postType != 'post') {
                            return $templateCache.get('module/customPosts/list.html');
                        }
                        return $templateCache.get('module/posts/list.html');
                    },
                    controllerProvider: function($stateParams) {
                        //debugger;
                        if ($stateParams.postType != 'post') {
                            return "WPHCTaxonomiesPostsController as customPostsCtrl";
                        }
                        return "WPHCTaxonomiesPostsController as postsCtrl";
                    }
                }
            }
        });
}
