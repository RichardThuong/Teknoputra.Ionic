var firebase = require("firebase");
var firebaseui = require('firebaseui');

export default function($log, $scope, $WPHCLogin) {
    'ngInject';

    let vm = this;
    vm.posts = [];
    vm.remove = remove;

    $scope.$on('$ionicView.enter', () => onEnter());

    function onEnter() {
        // debugger;
        // initFirebase();
        // doRegister('test@abc.com', '@BCD3fgh');
    }

    function loadPosts() {
        return $WPHCLogin.getList().then((posts) => vm.posts = posts);
    }

    function remove(post) {
        $WPHCLogin.remove(post);
        return loadPosts();
    }

    function doRegister(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            alert(errorCode + ": " + error.message);
        });
    }

    function doLogin(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            // ...
            alert(errorCode + ": " + error.message);
        });
    }

    function doSignout() {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
    }
}