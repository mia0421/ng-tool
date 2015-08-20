import angular from 'angular';
import ngRoute from 'angular-route';
import './src/ngToolApp.js';


let ngApp = angular.module('ngApp', ['ngRoute', 'ngToolApp']);

ngApp.value('menuVal',[
	{name: 'ngToolSidebar' , src: '/ngToolSidebar' ,show: true},
	{name: 'ngToolPage'    , src: '/ngToolPage'    ,show: true},
	{name: 'ngToolTreeView', src: '/ngToolTreeView',show: true}
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
		pageItems : 5,
		pageTotal : 101,
		nowPage: 8,
		simpleView: false
	}

	$scope.ngTreeView = {
		bind  :0,
		click :(node) => {
			console.log('TreeView cick', node) ;
		},
		source: [
            {
                "NodeID": 0,
                "Val": 0,
                "Name": " 鼎盛",
                "ParentID": null
            },
            {
                "NodeID": 12,
                "Val": 12,
                "Name": " 鼎盛2",
                "ParentID": null

            },
            {
                "NodeID": 1,
                "Val": 1,
                "Name": " 雲端",
                "ParentID": 0,
                "img": "img/1383752285_folder.png",
                "disabled": true
            },
            {
                "NodeID": 2,
                "Val": 2,
                "Name": " 業務",
                "ParentID": 0,
                "icon": "fa fa-folder",
                "disabled": false
            },
            {
                "NodeID": 3,
                "Val": 3,
                "Name": " 行管",
                "ParentID": 0,
                "icon": "fa fa-folder"
            },
            {
                "NodeID": 4,
                "Val": 4,
                "Name": " 雲端一",
                "ParentID": 1,
                "icon": "fa fa-folder"
            },
            {
                "NodeID": 5,
                "Val": 5,
                "Name": " 雲端二",
                "ParentID": 1,
                "icon": "fa fa-folder"
            },
            {
                "NodeID": 6,
                "Val": 6,
                "Name": " 業務政府",
                "ParentID": 2,
                "icon": "fa fa-folder"
            },
            {
                "NodeID": 7,
                "Val": 7,
                "Name": " 業務企業",
                "ParentID": 2,
                "icon": "fa fa-folder"
            },
            {
                "NodeID": 8,
                "Val": 8,
                "Name": " 財務",
                "ParentID": 2,
                "icon": "fa fa-folder"
            },
            {
                "NodeID": 9,
                "Val": 9,
                "Name": " 行政",
                "ParentID": 2,
                "icon": "fa fa-folder"
            },
            {
                "NodeID": 10,
                "Val": 10,
                "Name": " 人事",
                "ParentID": 9,
                "icon": "fa fa-folder"
            },
            {
                "NodeID": 11,
                "Val": 11,
                "Name": " 總機",
                "ParentID": 9,
                "icon": "fa fa-folder"
            }
        ]
	}
}]);




