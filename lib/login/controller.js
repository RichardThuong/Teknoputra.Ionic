import firebase from 'firebase';
// import {Facebook} from 'ionic-native';
// import openFB from '../../scripts/openfb.js';

export default function($log, $scope, $state, $WPHCLogin, $ionicHistory, $ionicSideMenuDelegate, $AuthService, $FacebookService, $WPHCLoading, $WPHCToast) {
    'ngInject';

    let vm = this;
    vm.posts = [];
    vm.remove = remove;

    $scope.$on('$ionicView.enter', () => onEnter());
    $scope.$on('$ionicView.leave', function () { $ionicSideMenuDelegate.canDragContent(true) });

    $scope.goHome = function() {
        $ionicHistory.nextViewOptions({
            disableBack: true,
            historyRoot: true
        });

        $state.go("public.taxonomies.id", { term: 'categories', id: 25, postType: 'post', title: 'Home' }, {reload: true});
    }

    $scope.goSignup = function() {
        $state.go("public.signup", {}, {reload: true});
    }

    $scope.goLogin = function() {
        $state.go("public.login", {}, {reload: true});
    }

    $scope.doSignup = function(user) {
        if (!user || !user.email || !user.password) {
            $WPHCToast.showShortBottom('Please enter your email and password!');
        } else {
            $WPHCLoading.show('signing up...');
            $AuthService.signupUser(user).then(function(result) {
                $WPHCLoading.hide();
                $scope.doLogin(user);
            }).catch(function(error) {
                $WPHCLoading.hide();
                console.log(error.code + ': ' + error.message);
                $WPHCToast.showLongBottom(error.message);
            });
        }
    }

    $scope.doLogin = function(user) {
        if (!user || !user.email || !user.password) {
            $WPHCToast.showShortBottom('Please enter your email and password!');
        } else {
            $WPHCLoading.show('logging in...');
            $AuthService.loginUser(user).then(function(user) {
                $WPHCLoading.hide();
                $WPHCToast.showShortTop('Welcome to Teknoputra!');
                $ionicHistory.nextViewOptions({
                    disableBack: true,
                    historyRoot: true
                });
                $state.go("public.taxonomies.id", { term: 'categories', id: 25, postType: 'post', title: 'Home' }, {reload: true});
            }).catch(function(error) {
                $WPHCLoading.hide();
                console.log(error.code + ': ' + error.message);
                $WPHCToast.showLongBottom(error.message);
            });
        }
    };

    $scope.loginWithFacebook = function() {
        $FacebookService.login({ scope: 'public_profile,email' }).then(function (response) {
            if (response.status === 'connected') {
                $WPHCLoading.show('logging in...');
                console.log('Facebook login succeeded', response);

                var credential = firebase.auth.FacebookAuthProvider.credential(
                    response.authResponse.accessToken);

                firebase.auth().signInWithCredential(credential).then(function () {
                    $WPHCLoading.hide();
                    $WPHCToast.showShortTop('Welcome to Teknoputra!');
                    $ionicHistory.nextViewOptions({
                        disableBack: true,
                        historyRoot: true
                    });
                    $state.go("public.taxonomies.id", { term: 'categories', id: 25, postType: 'post', title: 'Home' }, {reload: true});
                }).catch(function (error) {
                    $WPHCLoading.hide();
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                    $WPHCToast.showLongBottom(errorMessage);
                });

            } else {
                $WPHCToast.showLongBottom('Facebook login failed');
            }
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log(errorCode + ': ' + errorMessage);
            $WPHCToast.showLongBottom(errorMessage);
        });
    }

    $scope.loginWithGoogle = function() {
        $WPHCToast.showLongBottom('This feature is not yet implemented!');
    }

    $scope.doSignout = function() {
        doSignout();
    }

    function onEnter() {
        $FacebookService.init({appId: '1412554948821138'});
        $ionicSideMenuDelegate.canDragContent(false);
        if ($state.current.name == "public.logout")
        {
            doSignout();
        }
    }

    function doSignout() {
        var result = $AuthService.logoutUser().then(function() {
            $WPHCToast.showShortBottom('You are logged out.');
        }).catch(function(error) {
            console.log(result.errorCode + ': ' + result.message);
            $WPHCToast.showLongBottom(result.message);
        });
    }

    function loadPosts() {
        return $WPHCLogin.getList().then((posts) => vm.posts = posts);
    }

    function remove(post) {
        $WPHCLogin.remove(post);
        return loadPosts();
    }
}