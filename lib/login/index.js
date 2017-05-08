import modConfig from './config.js';
import modController from './controller.js';
import modService from './service.js';

let mod = angular.module('Teknoputra.Ionic.bookmark', []);

mod.config(modConfig);
mod.controller('WPHCBookmarkController', modController);
mod.factory('$WPHCBookmark', modService);

export default mod = mod.name;
