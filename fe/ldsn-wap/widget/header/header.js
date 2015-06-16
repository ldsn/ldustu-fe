/**
 * 页面标题修改
 * @author yuxuan
 * @date 2015-02-08
 * @version 1.0.0
 */
'use strict';

//私有方法
var _pri = {
    //UI元素集合
    node: {
    	mod: $('section[node-type="module-header"]'),
        header: $('h1[node-type="header-title"]'),
    	backClick: '[node-type="back-click"]',
        menu: '.menu'
    },
    bindUI: function () {
        _pri.node.mod.delegate(_pri.node.backClick, 'click', function (e) {
            if (history.length === 1) {
                location.href="/#column=0";
            } else {
                ldev.message.trigger('go_back');
            }
            _pub.setGoBack(false);
        });
    },
    util: {
    }
        
}
var _pub = {
    setTitle: function (title) {
        title = title || '鲁大学生网';
	   _pri.node.mod.find(_pri.node.header).text(title);
    },
    setGoBack: function (flag) {
        var menuDom = _pri.node.mod.find(_pri.node.menu);
        if (flag) {
            menuDom.addClass('goback')
                   .attr('node-type', 'back-click')
                   .find('i').addClass('left')
                             .removeClass('category');
        } else {
            menuDom.removeClass('goback')
                   .attr('node-type', 'menu-click')
                   .find('i').addClass('category')
                             .removeClass('left');
        }
    }
}

$(document).ready(function (){
    _pri.bindUI();

});
module.exports = _pub;