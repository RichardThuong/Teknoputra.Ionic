import firebase from 'firebase';
// import { NativeStorage } from '@ionic-native';
// import ionicNativeCore from '@ionic-native/core';
// import NativeStorage from '@ionic-native/native-storage';
// import Facebook from '@ionic-native/facebook';
// import NativeStorage from '@ionic-native/native-storage';

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

    loginWithFacebook(token) {
        var credential = firebase.auth.FacebookAuthProvider.credential(obj['access_token']);
        return firebase.auth().signInWithCredential(credential);
    }

    getLoginRedirectResult() {
        return firebase.auth().getRedirectResult();
    }

    isUserLoggedIn() {
        // NativeStorage.getItem('user').then(function(data) {
        //     debugger;
        //     console.log('User already logged in.');
        //     console.log(data);
        //     return true;
        // }, function (error) {
        //     debugger;
        //     console.log('User haven\'t logged in.');
        //     return false;
        // });

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

    setUserInfo(displayName) {
        
    }
}