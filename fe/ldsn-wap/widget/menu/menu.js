/**
 * 菜单js
 * @author yuxuan
 * @date 2015-02-08
 * @version 1.0.0
 */
'use strict';

var listMethod = require('ldsn-wap:widget/list/list-method.js');
var api = require('ldsn-wap:widget/api/api.js');
//私有方法
var _pri = {
    //UI元素集合
    node: {
    	mod: $('menu[node-type="ldsn-menu"]'),
    	menuList:$('section[node-type="menu-list"]'),
    	menuClick:$("click[node-type='menu-click']"),
        rightClick:$("click[node-type='right-click']"),
    	ldsnBox:$("section[node-type='ldsn-box']"),
    	ldsnMainFrame:$("section[node-type='ldsn-main-frame']"),
        editArticle:$("section[node-type='module-edit-article']"),
        logOut: $('click[node-type="logout"]')
    },
    //绑定元素事件
    bindUI: function () {
    	_pri.node.menuClick.on("click",_pri.util.leftSlide);//菜单点击事件
    	_pri.node.ldsnMainFrame.on("click", function () {
            if (_pri.node.ldsnBox.hasClass('active')){
                _pri.util.clearLeftSlide();
            }
        });//清除菜单
    	_pri.node.ldsnBox.swipeRight(_pri.util.leftSlide);
        _pri.node.ldsnBox.swipeLeft( function () {
            if (_pri.node.ldsnBox.hasClass('active')){
                _pri.util.clearLeftSlide();
            }
        });
        _pri.node.menuList.delegate('click', 'click', function () {
            var cid = $(this).attr('cid');
            listMethod.toColumn(cid);
            _pri.util.clearLeftSlide();
        });
        _pri.node.logOut.on('click', function () {
            ldev.message.trigger('logout');
        });
    },
    util: {
    	leftSlide: function(){//左滑事件函数
    		_pri.node.ldsnBox.addClass("active");
            _pri.node.ldsnMainFrame.addClass("active");
    	},
    	clearLeftSlide: function(){//清除菜单函数
    		_pri.node.ldsnBox.removeClass("active");
    		_pri.node.ldsnMainFrame.removeClass("active");
    	},
    	initMenu: function (){//页面初始化函数
    		_pri.node.mod.css("height", $(window).height());
        	if (ldsn && ldsn.column) {
                for(var i = 0; i < ldsn.column.length; i++){
                    _pri.node.menuList.append("<click cid='"+ldsn.column[i].column_id+"'>"+ldsn.column[i].column_name+"</click>");
                }
            }
    	}
    }
}

/**
 * 如果页面需要加载后运行某些函数
 * 需要定义init()代表初始化 并执行
 */

  var init = function () {
  	_pri.util.initMenu();
  	_pri.bindUI();
}

init();
