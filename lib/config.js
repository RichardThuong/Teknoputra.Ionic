import defaultConfig from '../config/config.default.cson';
import configOverwrite from '../config/config.cson';
import menu from '../config/menu.json';
import deepExtend from 'deep-extend';
var firebase = require("firebase");
var fbConfig = {
    apiKey: "AIzaSyA2g0sB9hnSkSJ6T4ojpvv1-_OYyqW7W6Y",
    authDomain: "teknoputra-cd8bb.firebaseapp.com",
    databaseURL: "https://teknoputra-cd8bb.firebaseio.com",
    projectId: "teknoputra-cd8bb",
    storageBucket: "teknoputra-cd8bb.appspot.com",
    messagingSenderId: "1040704240201"
};

firebase.initializeApp(fbConfig);

let config = {};

config = deepExtend(defaultConfig, configOverwrite, _.get(window, 'WPHC.config'));

let mod = angular.module('Teknoputra.Ionic.config', []);

mod.constant('$WPHCConfig', config);

mod.constant('$WPHCMenu', menu);

export default mod;
