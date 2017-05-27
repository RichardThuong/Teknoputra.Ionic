import firebase from 'firebase';

export default class {

    constructor() {
        'ngInject';
    }

    initFirebase() {
        var fbConfig = {
            apiKey: "AIzaSyA2g0sB9hnSkSJ6T4ojpvv1-_OYyqW7W6Y",
            authDomain: "teknoputra-cd8bb.firebaseapp.com",
            databaseURL: "https://teknoputra-cd8bb.firebaseio.com",
            projectId: "teknoputra-cd8bb",
            storageBucket: "teknoputra-cd8bb.appspot.com",
            messagingSenderId: "1040704240201"
        };

        firebase.initializeApp(fbConfig);
        console.log('Firebase initiated!');
    }

    signupUser(user) {
        return  firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
    }

    loginUser(user) {
        return firebase.auth().signInWithEmailAndPassword(user.email, user.password);
    }

    loginWithFacebook() {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function() {
            debugger;
            firebase.auth().getRedirectResult().then(function(result) {
                debugger;
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
                window.localStorage.setItem("user", user);
            }).catch(function(error) {
                debugger;
                // console.log(error.code + ': ' + error.message);
            });
        });
    }

    getLoginRedirectResult() {
        return firebase.auth().getRedirectResult();
    }

    isUserLoggedIn() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                return true;
            } else {
                return false;
            }
        });
    }

    logoutUser() {
        return firebase.auth().signOut();
    }
}