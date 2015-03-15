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
		qqLoginBtn: $('div[node-type="login-qq"]'),
    	ldsnMainFrame:$("section[node-type='ldsn-main-frame']")
	},
	conf: {
		qqParam: {}
	},
	bindUI: function () {
		_pri.node.qqLoginBtn.on('click', _pri.util.qqLogin);
		_pri.node.ldsnMainFrame.on('click', function () {
			if (_pri.node.mod.hasClass('active')) {
				_pri.util.loginBox(false);
			}
		})
	},
	bindListener: function () {
	},
	util: {
		qqLogin: function () {
    		QC.Login.showPopup({appId:"101199587", redirectURI: 'http://test.wap.ldustu.com/'})
		},
		checkOpenId: function () {
			
		},
		bindQq: function () {
	    	QC.api("get_user_info", _pri.conf.qqParam)
			.success(function(s){//成功回调
				QC.Login.getMe(function(openId, accessToken){


				});
			})
			.error(function(f){//失败回调
				toast('error', '登陆失败，请重试！');
			})
			.complete(function(c){//完成请求回调
			});
		},
		loginBox: function (flag) {
			if(flag) {
				_pri.node.mod.addClass('active');
				_pri.node.ldsnMainFrame.addClass('active');
			} else {
				_pri.node.mod.removeClass('active');
				_pri.node.ldsnMainFrame.removeClass('active');
			}
		},
		asyncAddQqLogin: function () {
			var script = document.createElement('script');
			script.src = "http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js";
			script.type = "text/javascript";
			script.charset = 'utf-8';
			$(script).attr('data-appid', '101199587');
			$(script).attr('data-redirecturi', 'http://test.wap.ldustu.com/');
			$(script).appendTo('body');
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
		_pri.util.asyncAddQqLogin();
		_pri.util.loginBox(true);
	},
	hideLogin: function () {
		_pri.util.loginBox(false);
	}
}

module.exports = _pub;
