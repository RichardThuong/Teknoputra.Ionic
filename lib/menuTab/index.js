import modConfig from './config.js';
import modController from './controller.js';
import modService from './service.js';

let mod = angular.module('Teknoputra.Ionic.menuTab', []);

mod.config(modConfig);
mod.controller('MenuController', modController);
mod.factory('$MenuService', modService);

export default mod = mod.name;
