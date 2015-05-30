/**
 * 菜单js
 * @author yuxuan
 * @date 2015-02-08
 * @version 1.0.0
 */
'use strict';

var api = require('common:widget/api/api.js');
var userInfoTpl = require('ldsn-wap:widget/menu/menu.tpl.js');
//私有方法
var _pri = {
    //UI元素集合
    node: {
    	mod: $('menu[node-type="ldsn-menu"]'),
    	menuList: $('section[node-type="menu-list"]'),
    	menuClick: $("click[node-type='menu-click']"),
        rightClick: $("click[node-type='right-click']"),
    	ldsnBox: $('section[node-type="ldsn-box"]'),
        ldsnMenu: $('section[node-type="module-menu"]'),
    	ldsnMainFrame: $('section[node-type="ldsn-main-frame"]'),
        editArticle: $('section[node-type="module-edit-article"]'),
        userInfo: 'header[node-type="user-info"]',
        logout: 'click[node-type="logout"]',
        loginBtn: 'click[node-type="login-btn"]',

    },
    tmpl: {
        userInfo: userInfoTpl.join('')
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
            ldev.message.trigger('to_column',cid);
            ldev.hash('article', null);
            ldev.message.trigger('clear_frame');
            _pri.util.clearLeftSlide();
        });
        _pri.node.ldsnMenu.delegate( _pri.node.logout, 'click', function () {
            ldev.message.trigger('logout');
            ldev.message.trigger('clear_frame');
            _pri.util.clearLeftSlide();
        });
        _pri.node.ldsnMenu.delegate( _pri.node.loginBtn, 'click', function () {
            ldev.message.trigger('check_login');
            _pri.util.clearLeftSlide();
        });
    },
    bindListener: function () {
        ldev.message.listen('login_end', function (flag) {
            _pri.util.setLogout();
            _pri.util.setUserInfo();
        });
        ldev.message.listen('logout_end', function (flag) {
            _pri.util.setLogout();
            _pri.util.setUserInfo();
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
            if (ldsn.loginStatus) {
                _pri.util.setLogout(true);
            }
            _pri.util.setUserInfo();
    	},
        setLogout: function (flag) {
            if (ldsn.loginStatus) {
                var html = '<click node-type="logout">退出登录</click>';
                _pri.node.ldsnMenu.append($(html));
            } else {
                _pri.node.ldsnMenu.find(_pri.node.logout).remove();
            }
        },
        setUserInfo: function () {
            if (ldsn.loginStatus) {
                _pri.node.ldsnMenu.find(_pri.node.loginBtn).remove();
                var html = ldev.tmpl(_pri.tmpl.userInfo, ldsn.user);
                _pri.node.ldsnMenu.prepend($(html));
            } else {
                _pri.node.ldsnMenu.find(_pri.node.userInfo).remove();
                var html = '<click node-type="login-btn" class="login-btn">登陆</click>';
                _pri.node.ldsnMenu.prepend($(html));
            }
        },
    }
}

/**
 * 如果页面需要加载后运行某些函数
 * 需要定义init()代表初始化 并执行
 */

  var init = function () {
  	_pri.util.initMenu();
  	_pri.bindUI();
    _pri.bindListener();
}

init();
