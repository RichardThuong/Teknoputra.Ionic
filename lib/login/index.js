import modConfig from './config.js';
import modController from './login.controller.js';
import modService from './service.js';

let mod = angular.module('Teknoputra.Ionic.login', []);

mod.config(modConfig);
mod.controller('WPHCLoginController', modController);
mod.factory('$WPHCLogin', modService);

export default mod = mod.name;
