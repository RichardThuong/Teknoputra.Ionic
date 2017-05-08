import truncate from './truncate.js';
import toArray from './toArray.js';

let mod = angular.module('Teknoputra.Ionic.filters', []);

mod.filter('truncate', truncate);
mod.filter('toArray', toArray);

export default mod = mod.name;
