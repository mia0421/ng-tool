import angular from 'angular';
import $ from 'jquery';

var ngToolTreeView =  angular.module('ngToolTreeView', [])
.directive('ngTreeView',[() => {
    return {
        template: "<span tree-repeat rsource='_source' rclick='_click({data:data})'  pid='root' class='TvStyle'></span>",
        scope: {
            source: "=",
            bind  : "=",
            click : "&",
        },
        controller($scope, $element, $attrs) {
            let tool = {
                changeNode(nodeId) {
                    $scope._bind = angular.copy(parseInt( nodeId,10));
                    if ($scope._bind != null) {
                        angular.forEach($scope._source, (val, index) => {
                            console.log('changeNode', val.NodeID , $scope._bind);
                            val.isSelect = (val.NodeID === $scope._bind);
                        });
                        /*從程式內指定打開某一層時 找到上層節點都點開(遞迴)*/
                        let fun = (id) => {
                            angular.forEach($scope._source, function (val) {
                                if (val.NodeID == id) {
                                    val.isOpen = true;
                                    fun(val.ParentID);
                                }
                            });
                        };
                        fun($scope._bind);
                    } else {
                        angular.forEach($scope._source, (val, index) => {
                            val.isSelect = false;
                        });
                    }
                },
                init(){
                    $scope._source = angular.isObject($scope.source) ? angular.copy($scope.source) : [];
                    $scope._bind   = !angular.isUndefined($scope.bind) ? angular.copy($scope.bind) : 0;
                    $scope.click   = angular.isFunction($scope.click) ? $scope.click : () => {};
                    $scope.root    = 0;
                    angular.forEach($scope._source, (val) => {
                        val.isOpen    = false;
                        val.isSelect  = false;
                        val.Checked   = true;
                        val.isParents = $scope._source.filter((item) => { return item.ParentID === val.NodeID }).length !== 0;
                    });
                    tool.changeNode(0);
                }
            };
            tool.init();
            $scope.$watch("source", (newVal) => {
                $scope._source = angular.copy( $scope.source);
                tool.init();
            }, true);
            $scope.$watch("bind", (newVal) => {
               tool.changeNode(newVal);
            }, true);
            $scope._click = (item) => {
                if(!item.data.disabled) {
                    tool.changeNode(item.data.NodeID);
                    $scope.click(item);
                }
            }
        }
    }
}])
.directive("treeRepeat", ['$timeout',($timeout) => {
    return {
       scope: {
            pid    : "=",
            rsource: "=",
            rclick : "&"
        },
        templateUrl: '../src/ngToolTreeView/template.html',
        link(scope, element, attrs) {
            scope.arrowClick = (item,index) => {
                item.isOpen = !item.isOpen;
            }
        }
    }
}])
.filter("treeFil", function () {
    return function (data, key) {
        var newarr = [];
        if (angular.isUndefined(key)) {
            return newarr;
        }
        angular.forEach(data, function (value, index) {
            if (value.ParentID == key) {
                this.push(value);
            }
        }, newarr);
        return newarr;
    }
});



