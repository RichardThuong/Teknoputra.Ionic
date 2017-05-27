import firebase from 'firebase';
// import { Facebook } from '@ionic-native/facebook';

export default function($log, $scope, $state, $WPHCLogin, $ionicHistory, $ionicSideMenuDelegate, $AuthService, $WPHCLoading, $WPHCToast) {
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
            $AuthService.signupUser(user).then(function(user) {
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
        // Facebook.login(['email']).then(function(response) {
        //     const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

        //     firebase.auth().signInWithCredential(facebookCredential)
        //     .then(function(success) {
        //         console.log("Firebase success: " + JSON.stringify(success));
        //         this.userProfile = success;
        //     })
        //     .catch(function(error) {
        //         console.log("Firebase failure: " + JSON.stringify(error));
        //     });

        // }).catch(function(error) { console.log(error) });

        // $WPHCLoading.show('Authenticating with Facebook...');
        // $AuthService.loginWithFacebook();

        // This is almost working
        // var provider = new firebase.auth.FacebookAuthProvider();
        // firebase.auth().signInWithRedirect(provider).then(function() {
        //     debugger;
        //     firebase.auth().getRedirectResult().then(function(result) {
        //         debugger;
        //         var token = result.credential.accessToken;
        //         // The signed-in user info.
        //         var user = result.user;
        //         // ...
        //         console.log('success!');
        //         window.localStorage.setItem("user", user);
        //     }).catch(function(error) {
        //         debugger;
        //         console.log(error.code + ': ' + error.message);
        //     });
        // });
        
        // .then(function() {
        //     // debugger;
        //     // $WPHCLoading.hide();
        //     $WPHCToast.showShortTop('Welcome to Teknoputra!');
        //     $ionicHistory.nextViewOptions({
        //         disableBack: true,
        //         historyRoot: true
        //     });
        //     $state.go("public.taxonomies.id", { term: 'categories', id: 25, postType: 'post', title: 'Home' }, {reload: true});
        // }).catch(function(error) {
        //     // debugger;
        //     // $WPHCLoading.hide();
        //     console.log(result.errorCode + ': ' + result.message);
        //     $WPHCToast.showLongBottom(result.message);
        // });
    }

    $scope.loginWithGoogle = function() {
        // $WPHCToast.showShortTop('Welcome ' + window.localStorage.getItem("user"));


        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // return true;
                $WPHCToast.showLongTop('logged in');
            } else {
                // return false;
                $WPHCToast.showLongTop('not logged in');
            }
        });
    }

    $scope.doSignout = function() {
        doSignout();
    }

    function onEnter() {
        $ionicSideMenuDelegate.canDragContent(false);
        // if ($state.current.name == "public.logout")
        // {
        //     doSignout();
        // }
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