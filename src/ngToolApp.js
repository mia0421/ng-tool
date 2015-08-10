import angular from 'angular';
import '../src/ngToolPage/ngToolPage.js';
import '../src/ngToolSidebar/ngToolSidebar.js';
import '../src/ngToolTreeView/ngToolTreeView.js';


var ngToolApp =  angular.module('ngToolApp',[
	'ngToolSidebar',
	'ngToolPage',
	'ngToolTreeView'
]);
