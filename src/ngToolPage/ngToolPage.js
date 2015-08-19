import angular from 'angular';
import $ from 'jquery';


/*UI 處理頁碼*/
var ngToolPage =  angular.module('ngToolPage', [])
.directive('ngPage',[() => {
    return {
        templateUrl: '../src/ngToolPage/ngToolPage.html',
        scope: {
            pageItems : "=", /*一組幾頁*/
            pageTotal : "=",/*共幾頁*/
            nowPage   : "=",/*現在頁數*/
            chengEvent: "=",/*頁碼變換事件*/
            simpleView: "=" //是否顯示簡單頁碼
        },
        link (scope, element, attr) {
            // tool
            let PageToole = {
                /*移動頁碼*/
                toPage(goPage) {
                    let {
                            PageArray,
                            _nowPage,
                            pageItems
                        } = scope
                    /*判斷是否是需要換組頁*/
                    if (goPage < PageArray[pageItems - 1] || goPage > PageArray[0]) {
                        PageToole.createPage(goPage - 1);
                    }
                },
                searchPageArray(_nowPage) {
                    let {
                        pageItems,
                        pageTotal
                    } = scope,
                        newPageArray = Math.floor((_nowPage) / pageItems),
                        Spage        = (newPageArray * pageItems) + 1 <= 1 ? 1 : (newPageArray * pageItems) + 1,
                        Epage        = (Spage + pageItems - 1) <= pageTotal ? (Spage + pageItems - 1) : pageTotal;
                    return {
                        Spage,
                        Epage
                    };
                },
                /*產生頁數Array*/
                createPage(_nowPage) {
                    let {
                            PageArray,
                            pageItems,
                            pageTotal
                        } = scope,
                        {
                            Spage,
                            Epage
                        } = PageToole.searchPageArray(_nowPage);
                    /*判斷是否還有上下一組頁*/
                    scope.showPageArray = [Spage > 1, Epage < pageTotal];
                    scope.PageArray = [];
                    for (var i = Spage; i <= Epage; i ++) {
                        scope.PageArray.push(i);
                    }
                },
                initPage() {
                    scope._pageItems = scope.pageItems || 1;
                    scope._pageTotal = scope.pageTotal || 1;
                    scope._nowPage = scope.nowPage || 1;
                    scope.chengEvent = scope.chengEvent || (() => {});
                    scope.showPageArray = [false, false];
                    scope.PageArray = [];
                    scope.view = scope.simpleView || false;
                    PageToole.createPage(scope._nowPage);
                }
            }

            // event
            scope.toPage = (chengTyep, page) => {
                let {
                        _nowPage,
                        _pageTotal,
                        _pageItems,
                        chengEvent,
                        PageArray,
                    } = scope;
                switch (chengTyep) {
                    case "next":
                        if (_nowPage + 1 >= 1 && _nowPage + 1 <= _pageTotal) {
                            scope._nowPage += 1;
                            chengEvent(scope._nowPage);
                        }
                        break;
                    case "previous":
                        if (_nowPage - 1 >= 1 && _nowPage - 1 <= _pageTotal) {
                            scope._nowPage -= 1;
                            chengEvent(scope._nowPage);
                        }
                        break;
                    case "nextArray":
                        let newPage = PageArray[_pageItems - 1]+1;
                        if (newPage >=1 && newPage <= scope._pageTotal) {
                            scope._nowPage = newPage;
                            chengEvent(newPage);
                        }
                        break;
                    case "previousArray":
                        var newPage = PageArray[0] - _pageItems;
                        if (newPage >= 1 && newPage <= _pageTotal) {
                            scope._nowPage = newPage;
                            chengEvent(newPage);
                        }
                        break;
                    case "toPage":
                        if (page >= 1 && page <= _pageTotal) {
                            scope._nowPage = page;
                            chengEvent(page);
                        }
                        break;
                }
                PageToole.toPage(scope._nowPage);
            }

            /*關注 頁碼變換 方便從外面更改頁碼 也可同步異動*/
            scope.$watch("nowPage", function (newVal, oldVal) {
                if (newVal === "" || newVal < 1 || angular.isUndefined(scope._nowPage)) {
                    return;
                }
                if (newVal >=1 && newVal <= scope._pageTotal) {
                    PageToole.toPage(scope._nowPage);
                }
            });
            /*等 pageTotal 及 pageItems 有資料更新陣列資料*/
            scope.$watch("pageItems", (newVal, oldVal) => {
                if(newVal){
                    PageToole.initPage();
                }
            });
            scope.$watch("pageTotal", (newVal, oldVal) => {
                if(newVal){
                    PageToole.initPage();
                }
            });
        }
    }
}]);


