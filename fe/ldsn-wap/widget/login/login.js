/**
 * 登陆
 * author: fanmingfei
 * date: 2015-03-14
 * version: v1.0.0
 */

var toast = require('ldsn-wap:widget/toast/toast.js');

var _pri = {
	node: {
		mod: $('section[node-type="module-login"]'),
		qqLoginBtn: $('div[node-type="login-qq"]')
	},
	conf: {
		qqParam: {}
	},
	bindUI: function () {
		_pri.node.qqLoginBtn.on('click', _pri.util.qqLogin);
	},
	bindListener: function () {
    	QC.api("get_user_info", _pri.conf.qqParam)
		.success(function(s){//成功回调
			QC.Login.getMe(function(openId, accessToken){

			});
		})
		.error(function(f){//失败回调
			toast('error', '登陆失败，请重试！')
		})
		.complete(function(c){//完成请求回调
		});
	},
	util: {
		qqLogin: function () {
    		QC.Login.showPopup({appId:"101199587", redirectURI: 'http://test.wap.ldustu.com/'})
		},
		checkOpenId: function () {
			
		}
	}
}

var init = function () {
	_pri.bindUI();
	_pri.bindListener();
}

init();

var _pub = {
	alertLogin: function () {
		_pri.node.mod.addClass('show');

	},
	hideLogin: function () {
		_pri.node.mod.removeClass('show');
	}
}
module.exports = _pub;
