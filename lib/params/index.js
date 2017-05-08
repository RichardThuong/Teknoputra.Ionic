import modConfig from './config.js';
import modController from './controller.js';

let mod = angular.module('Teknoputra.Ionic.params', []);

mod.config(modConfig);
mod.controller('WPHCParamsController', modController);

export default mod = mod.name;
