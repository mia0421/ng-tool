import angular from 'angular';
import $ from 'jquery';


/*UI 處理頁碼*/
var ngToolPage =  angular.module('ngToolPage', [])
.directive("ngPage",['$window', ($window) => {
    return {
        templateUrl: '../src/ngToolPage/ngToolPage.html',
        scope: {
            pageItems : "=", /*一組幾頁*/
            pageTotal : "=",/*共幾頁*/
            nowPage   : "=",/*現在頁數*/
            chengEvent: "="/*頁碼變換事件*/
        },
        link (scope, element, attr) {
             /*給預設值 */
            scope.pageItems = scope.pageItems || 1;
            scope.pageTotal = scope.pageTotal || 1;
            scope.nowPage = scope.nowPage || 1;


            scope.showPageArry = scope.showPageArry || false;
            scope.leftShowPageArry = false;
            scope.PageArray = [];
            scope.view = true;
            /*變換頁碼工具*/
            var PageToole = {
                /*初始化*/
                initPage: () => {
                    /*計算要移動到哪一組頁*/
                    var newPageArray = Math.floor((scope.nowPage) / scope.pageItems);
                    var Spage = (newPageArray * scope.pageItems) + 1;
                    var Epage = Spage + scope.pageItems - 1;
                    Epage = Epage <= scope.pageTotal  ? Epage : scope.pageTotal ;
                    /*呼叫建立頁碼Fun 回傳新陣列*/
                    PageToole.createPage(Spage, Epage);
                },
                /*移動頁碼*/
                toPage: (goPage) => {
                    /*判斷是否是需要換組頁*/
                    var arrayStart = scope.PageArray[scope.PageArray.length - 1] ;
                    var arrayEnd = scope.PageArray[0] ;
                    if (scope.nowPage < arrayEnd || scope.nowPage > arrayStart) {
                        /*計算要移動到哪一組頁*/
                        var newPageArray = Math.floor((scope.nowPage-1) / scope.pageItems);
                        var Spage = (newPageArray * scope.pageItems) + 1;
                        var Epage = Spage + scope.pageItems - 1;
                        Epage = Epage <= scope.pageTotal ? Epage : scope.pageTotal ;
                        /*呼叫建立頁碼Fun 回傳新陣列*/
                        PageToole.createPage(Spage, Epage);
                    }
                },
                /*產生頁數Array*/
                createPage: (Spage, Epage) => {
                    scope.PageArray = [];
                    var Spage = Spage <=1 ? 1 : Spage;
                    var Epage = Epage >= scope.pageTotal  ? scope.pageTotal  : Epage;
                    for (var i = Spage; i <= Epage; i++) {
                        scope.PageArray.push(i);
                    }
                    /*判斷是否還有上下一組頁*/
                    scope.showPageArry = scope.PageArray[scope.PageArray.length - 1]  < scope.pageTotal;
                    scope.leftShowPageArry = scope.PageArray[0]  > 1;
                }
            }
            /*初始化*/
            PageToole.initPage();

            /*關注 頁碼變換 方便從外面更改頁碼 也可同步異動*/
            scope.$watch("nowPage", function (newVal, oldVal) {
                /*判斷 重要參數都有質 才可執行 改變頁碼工作*/
                var checkNowpage = newVal !== "" && newVal >= 1 && !angular.isUndefined(scope.nowPage);
                if (!checkNowpage) {
                    return;
                }
                if (newVal >=1 && newVal <= scope.pageTotal) {
                    PageToole.toPage(scope.nowPage);
                }
            });
            /*等 pageTotal 及 pageItems 有資料更新陣列資料*/
            scope.$watch("pageItems", () => {
                PageToole.initPage();
            });
            scope.$watch("pageTotal", (newVal, oldVal) => {
                PageToole.initPage();
            },true);

            /*UI 上 變換資料事件*/
            scope.toPage = (chengTyep, page) => {
                switch (chengTyep) {
                    case "next":
                        var goPage = scope.nowPage + 1;
                        if (goPage >=1 && goPage <= scope.pageTotal) {
                            scope.nowPage++;
                            if (!angular.isUndefined(scope.chengEvent)) {
                                scope.chengEvent(goPage);
                            }
                        }
                        break;
                    case "previous":
                        var goPage = scope.nowPage - 1;
                        if (goPage >= 1 && goPage <= scope.pageTotal) {
                            scope.nowPage--;
                            if (!angular.isUndefined(scope.chengEvent)) {
                                scope.chengEvent(goPage);
                            }
                        }
                        break;
                    case "nextArray":
                        var goPage = scope.PageArray[scope.PageArray.length - 1]+1;
                        if (goPage >=1 && goPage <= scope.pageTotal) {
                            scope.nowPage = goPage;
                            if (!angular.isUndefined(scope.chengEvent)) {
                                scope.chengEvent(goPage);
                            }
                        }
                        break;
                    case "previousArray":
                        var goPage = scope.PageArray[0] - scope.pageItems;
                        if (goPage >= 1 && goPage <= scope.pageTotal) {
                            scope.nowPage = goPage;
                            if (!angular.isUndefined(scope.chengEvent)) {
                                scope.chengEvent(goPage);
                            }
                        }
                        break;
                    case "toPage":
                        if (page >= 1 && page <= scope.pageTotal) {
                            scope.nowPage = page;
                            if (!angular.isUndefined(scope.chengEvent)) {
                                scope.chengEvent(page);
                            }
                        }
                        break;
                }
            }
        }
    }
}]);

$(window).bind('resize', () => {
   var  uiWidth = $("[name=centerW]").width();
   if ((uiWidth + 250) < $("#uiPagination").width()) {
        var scope = angular.element($("#uiPagination").parent()).scope();
        if (typeof( scope)!="undefined") {
            scope.$apply(() => {
                scope.view = true;
            });
        }
    } else {
        var scope = angular.element($("#uiPagination").parent()).scope();
        if (typeof(scope) != "undefined") {
            scope.$apply(() => {
                scope.view = false;
            });
        }
    }
});

