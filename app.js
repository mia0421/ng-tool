import angular from 'angular';
import ngRoute from 'angular-route';
import './src/ngToolApp.js';


let ngApp = angular.module('ngApp', ['ngRoute', 'ngToolApp']);

ngApp.value('menuVal',[
	{name:'ngToolSidebar', src:'/ngToolSidebar',show:true},
	{name:'ngToolPage', src:'/ngToolPage',show:true}
]);

ngApp.config(($routeProvider) => {
	$routeProvider
	.when('/:pageName', {
		templateUrl: (params) => {
			return '/view/'+ params.pageName +'.html';
		}
	})
	.otherwise({redirectTo: '/view/ngToolSidebar.html'})
});

ngApp.controller('isCtrl', ['$scope','$location', 'menuVal',($scope,$location, menuVal) => {
	$scope.menu = menuVal;
	$scope.active = 0;

	let init = (() => {
		$scope.active = 0;
		$location.path($scope.menu[$scope.active].src);
	})();

	$scope.changeActive = (index) => {
		$scope.active = index;
		$location.path($scope.menu[index].src);
	}

	$scope.ngSidebar = {
		 isSwitch:false,
		 isDirection:'left',
		 isWidth:'400',
		 load(data) {
		 	console.log('load');
		 }
	}

	$scope.ngPage ={
		pageItems : 10,
		pageTotal : 9,
		nowPage: 8
	}
}]);




