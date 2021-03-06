import modConfig from './config.js';
import modService from './service.js';
import modController from './controller.js';

let mod = angular.module('Teknoputra.Ionic.params.pushNotifications', []);

mod.config(modConfig);
mod.service('$WPHCPushNotifications', modService);
mod.controller('WPHCParamsPushNotificationsController', modController);

export default mod = mod.name;
