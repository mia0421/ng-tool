import angular from 'angular';

let ngToolApp = angular.module('ngToolApp', ["ngToolSidebar"]);

ngToolApp.controller('isCtrl', ['$scope', function ($scope) {
	$scope.menu = [
		{name:'ngToolSidebar', src:'',show:true,active: true},
		{name:'分頁', src:'',show:true,active:false}

	]



	$scope.ngSidebar = {
		 isSwitch:false,
		 isDirection:'left',
		 isWidth:'400',
		 load(data) {
		 	console.log('load',data);
		 }
	}
}]);

//export default ngToolApp;



