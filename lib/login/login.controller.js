export default function($log, $scope, $WPHCLogin) {
    'ngInject';

    let vm = this;
    vm.posts = [];
    vm.remove = remove;

    $scope.$on('$ionicView.enter', () => onEnter());

    function onEnter() {
        // return loadPosts();
    }

    function loadPosts() {
        return $WPHCLogin.getList().then((posts) => vm.posts = posts);
    }

    function remove(post) {
        $WPHCLogin.remove(post);
        return loadPosts();
    }
}