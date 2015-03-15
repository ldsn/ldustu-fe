/**
 * Copyright 2015 LDSN. All Rights Reserved.
 * 首页滑动
 * Smooth,
 * create by fanmingfei 2015-02-01
*/

var listMethod = require('ldsn-wap:widget/list/list-method.js');

var _pri = {
    node : {
        ldsnMain: $('section[node-type="ldsn-main"]'),
        ldsnBox: $('section[node-type="ldsn-box"]')
    },
    bindUI: function () {
        //xxx
    },
    util: {
        renderDom: function () {
            $('.ldsn-content').css("height",$(window).height()-40);
            $('.ldsn-box').css("width",$(window).width()+300);
            $('.ldsn-main').css("width",$(window).width());
        },
        renderIndex: function () {
            listMethod.toColumn(0);
        }
    }
};



var init = function () {
    _pri.bindUI();
	_pri.util.renderDom();
    _pri.util.renderIndex();
}
$(document).ready(function () {
	init();
})
