import angular from 'angular';
import $ from 'jquery';

/*
注意事項:
 此UI 遮蔽範圍 會尋找 上層第一個有設定  CSS  position  為absolute 的容器
 故 放置位置 需注意 建議 放在 放置 ng-controller 容器內的第一層

 說明:
  isSwitch: 顯示 隱藏
    isDirection: 方向 left right
    isWidth: 彈出寬度 直接設定數值 不須加px
 */

var ngToolSidebar =angular.module('ngToolSidebar', []).directive('ngSidebar', () => {
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            isSwitch   : '=',/*顯示 隱藏*/
            isDirection: '=',/*方向 left right*/
            isWidth    : '=',/*彈出寬度*/
            onLoadEvent: '&' /*填入參數為function，頁面載入完成後會執行此function*/
        },
        template: 	'<div class=\'SidebarDialog_bg\'></div>' +
		           		'<div class=\'SidebarDialog_content\' >' +
		           		'<div ng-transclude></div>' +
		           	'</div>',
        link (scope, elem, attrs) {

       
            let divCont     = $(elem).find('div[class="SidebarDialog_content"]:first'),
                divBg       = $(elem).find('div[class="SidebarDialog_bg"]:first');

            /*抓取 開關變動 */
            scope.$watch('isSwitch', (newVal, oldVal) => {
                let isWidth     = (scope.isWidth ? scope.isWidth + 'px' : '500px'),
                    isDirection = (scope.isDirection ? scope.isDirection.toLowerCase() : 'right'),
                    isReverse   = '';

                /*判斷是為 不合法的變動 */
                if (newVal === oldVal || angular.isUndefined(newVal) || angular.isUndefined(oldVal)) {
                    return;
                }
                if (isDirection === 'right' || isDirection === 'left') {
                	/*左右*/
                    isReverse = isDirection === 'right' ? 'left':'right';
                    divCont.css({
	                   	[isDirection]: '-' + isWidth,
                        [isReverse]  : 'initial' ,
	                   	width        : isWidth,
                        height       : 'initial',
                        top          :0,
                        bottom       :0
                    });
                } else {
                	/*上下*/
                    isReverse = isDirection === 'top' ? 'bottom':'top';
                	divCont.css({
	                   	[isDirection]: '-' + isWidth,
                        [isReverse]  : 'initial',
	                   	height       :  isWidth,
                        width        : 'initial',
                        right        :0,
                        left         :0
                   });
                }

                if (scope.isSwitch) { /*顯示 */
                    /*漸層 */
                    divBg.fadeIn(200);
                    divCont.show(0, () => {
                        /*滑動 */
                        divCont.animate({
                        	[isDirection]: 0
                        }, 600, () => {
                            scope.onLoadEvent();
                        });

                    });
                } else { /*隱藏*/
                    divCont.css({
                        [isDirection]:0
                    });

                    divCont.animate({
                    	[isDirection]: '-' + isWidth
                    }, 600, () => {
                        divBg.fadeOut(200);
                        divCont.hide(); 
                    });
                }
            });
        }
    }
});

