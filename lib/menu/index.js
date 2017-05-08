import modConfig from './config.js';
import modController from './controller.js';

let mod = angular.module('Teknoputra.Ionic.menu', []);

mod.config(modConfig);
mod.controller('WPHCMenuController', modController);

export default mod = mod.name;
