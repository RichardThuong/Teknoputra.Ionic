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

    $scope.doSignout = function() {
        doSignout();
    }

    function onEnter() {
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

    // function loadPosts() {
    //     return $WPHCLogin.getList().then((posts) => vm.posts = posts);
    // }

    // function remove(post) {
    //     $WPHCLogin.remove(post);
    //     return loadPosts();
    // }
}