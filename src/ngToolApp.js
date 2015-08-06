import angular from 'angular';
import '../src/ngToolPage/ngToolPage.js';
import '../src/ngToolSidebar/ngToolSidebar.js';

var ngToolApp =  angular.module('ngToolApp',[
	'ngToolSidebar',
	'ngToolPage'
]);
