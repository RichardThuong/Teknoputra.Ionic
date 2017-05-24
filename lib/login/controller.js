var firebase = require("firebase");
var firebaseui = require('firebaseui');

export default function($log, $scope, $state, $WPHCLogin, $ionicHistory, $ionicSideMenuDelegate) {
    'ngInject';

    let vm = this;
    vm.posts = [];
    vm.remove = remove;

    $scope.$on('$ionicView.enter', () => onEnter());
    $scope.$on('$ionicView.leave', function () { $ionicSideMenuDelegate.canDragContent(true) });

    $scope.doSignup = function(user) {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            alert(errorCode + ": " + error.message);
        });
    }

    $scope.doLogin = function(user) {
        // debugger;
        firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(function(result){
                $ionicHistory.nextViewOptions({
                    disableBack: true,
                    historyRoot: true
                });
                $state.go("public.taxonomies.id", { term: 'categories', id: 25, postType: 'post', title: 'Home' }, {reload: true});
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                // ...
                alert(errorCode + ": " + error.message);
            });
    };

    $scope.doSignout = function() {
        doSignout();
    };

    $scope.goHome = function() {
        $ionicHistory.nextViewOptions({
            disableBack: true,
            historyRoot: true
        });

        $state.go("public.taxonomies.id", { term: 'categories', id: 25, postType: 'post', title: 'Home' }, {reload: true});
    }

    function onEnter() {
        $ionicSideMenuDelegate.canDragContent(false);
        if ($state.current.name == "public.logout")
        {
            doSignout();
        }
    }

    function loadPosts() {
        return $WPHCLogin.getList().then((posts) => vm.posts = posts);
    }

    function remove(post) {
        $WPHCLogin.remove(post);
        return loadPosts();
    }

    function doSignout() {
        firebase.auth().signOut().then(function() {
            alert('You are logged out!');
        }).catch(function(error) {
            alert('Logout failed!');
        });
    }
}