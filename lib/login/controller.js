export default function($log, $scope, $state, $WPHCLogin, $ionicHistory, $ionicSideMenuDelegate, $AuthService, $FacebookService, $WPHCLoading, $WPHCToast, $localStorage) {
    'ngInject';

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
            $WPHCToast.showLongBottom('Please input all fields!');
        } else if (user.password != user.confirmPassword) {
            $WPHCToast.showLongBottom('Password and confirm password must be matched!');
        } else {
            $WPHCLoading.show('signing up...');
            $AuthService.signupUser(user).then(function(signupResult) {
                $AuthService.loginUser(user).then(function(loginResult) {
                    saveFireBaseCredentials(user);
                    $AuthService.updateUserProfile(user).then(function(updateProfileResult) {
                        $WPHCLoading.hide();
                        $WPHCToast.showShortTop('Welcome to Teknoputra!');
                        $ionicHistory.nextViewOptions({
                            disableBack: true,
                            historyRoot: true
                        });
                        $state.go("public.taxonomies.id", { term: 'categories', id: 25, postType: 'post', title: 'Home' }, {reload: true});
                    });
                });
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
            $AuthService.loginUser(user).then(function(result) {
                saveFireBaseCredentials(user);
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
                doLoginWithFacebook(response.authResponse.accessToken);
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

    $scope.logout = function() {
        doLogout();
    }

    function onEnter() {
        $scope.$storage = $localStorage;
        $FacebookService.init({appId: '1412554948821138'});
        $ionicSideMenuDelegate.canDragContent(false);

        switch($state.current.name) {
            case "public.login":
                switch ($scope.$storage.loginProvider) {
                    case "firebase":
                        if ($scope.$storage.email && $scope.$storage.password) {
                            var credential = ({
                                email: $scope.$storage.email,
                                password: $scope.$storage.password
                            });
                            $scope.doLogin(credential);
                        }
                        break;
                    case "facebook":
                        if ($scope.$storage.token) {
                            doLoginWithFacebook($scope.$storage.token);
                        }
                        break;
                    default:
                        break;
                }
                break;
            case "public.logout":
                doLogout();
                break;
            case "public.profile":
                $scope.user = $AuthService.getCurrentUser();
                break;
            case "public.oathCallback":
                debugger;
                break;
        }
    }

    function doLoginWithFacebook(token) {
        $WPHCLoading.show('logging in...');
        $AuthService.loginWithFacebook(token).then(function () {
            console.log('Facebook login succeeded', token);
            saveFacebookToken(token);
            $ionicHistory.nextViewOptions({
                disableBack: true,
                historyRoot: true
            });
            $WPHCLoading.hide();
            $WPHCToast.showShortTop('Welcome to Teknoputra!');
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
    }

    function doLogout() {
        var result = $AuthService.logoutUser().then(function() {
            delete $scope.$storage.email;
            delete $scope.$storage.password;
            $WPHCToast.showShortBottom('You are logged out.');
        }).catch(function(error) {
            console.log(result.errorCode + ': ' + result.message);
            $WPHCToast.showLongBottom(result.message);
        });
    }

    function saveFireBaseCredentials(user) {
        $scope.$storage = $localStorage.$default({
            loginProvider: "firebase",
            email: user.email,
            password: user.password
        });
    }

    function saveFacebookToken(token) {
        $scope.$storage = $localStorage.$default({
            loginProvider: "facebook",
            token: token
        });
    }
}