export default function($log, $scope, $state, $MenuService, $ionicTabsDelegate, $AuthService, $localStorage, $WPHCToast) {
    'ngInject';

    let vm = this;

    $scope.$on('$ionicView.enter', function() {
        $scope.user = $AuthService.getCurrentUser();
    });

    $scope.myAccount = function() {
        $state.go("public.profile");
    }

    $scope.goToHomePage = function() {
        window.open('http://teknoputra.com', '_system');
    }

    $scope.settings = function() {
        $state.go("public.params");
    }

    $scope.logout = function() {
        var result = $AuthService.logoutUser().then(function() {
            delete $localStorage.loginProvider;
            delete $localStorage.token;
            delete $localStorage.email;
            delete $localStorage.password;
            // debugger;
            // $localStorage.clear();
            $state.go("public.login", {}, { reload: true });
            $WPHCToast.showShortBottom('You are logged out.');
        }).catch(function(error) {
            console.log(result.errorCode + ': ' + result.message);
            $WPHCToast.showLongBottom(result.message);
        });
    }
}