/**
 * 登录相关
 * @author fanmingfei
 * @date 2015-05-30
 * @version 1.0.0
*/

var api = require('common:widget/api/api.js');
var errMessage = require('common:widget/error-message/error-message.js');
var toast = require('ldsn-pc:widget/toast/toast.js');

var _pri = {
    node: {
        loginBtn: '[node-type="login"]'
    },
    conf: {
        isRender: false
    },
    bindUI: function () {
        $(_pri.node.loginBtn).on('click', function () {
            // _pri.util.alertLogin();
            QC.Login.showPopup({appId:"101199587", redirectURI: 'http://www.ldustu.com'})
        });
    },
    util: {
        // alertLogin =function  () {
        //  if (!_pri.conf.isRender) {
        //      _pri.util.render();
        //  }
        // }
        checkToken: function () {
            var accessToken = ldev.hash('access_token');
            if (accessToken) {
                _pri.util.bindQq();
            }
        },
        bindQq: function () {
            console.log(ldsn);
            if (ldsn.loginStatus) return;
            var checkReady = setInterval(function () {
                if (window.QC) {
                    clearInterval(checkReady);
                    QC.api("get_user_info", _pri.conf.qqParam)
                    .success(function(s){//成功回调
                        QC.Login.getMe(function(openId, accessToken){
                            _pri.conf.openId = openId;
                            _pri.util.checkOpenId(openId);
                        });
                    })
                    .error(function(f){//失败回调
                        toast('error', '登陆失败，请重试！');
                    })
                    ldev.hash('access_token','');
                }
            },400);
        },
        checkOpenId: function (openId) {
            $.ajax({
                url: api.checkOpenId,
                data: {openid: openId},
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    if (data.status == 1) {
                        location.reload();
                        // toast('success', '登陆成功！');
                        // ldsn.user = data.data;
                        // ldsn.loginStatus = true;
                        // ldev.message.trigger('login_end');
                    } else if (data.status == -3) {
                        // panel.build(_pri.tmpl.regTpl);
                        alert('请注册');
                    }
                },
                error: function () {
                    toast('error', '登陆失败，请重试！');
                }
            });
        },

    }
}


            

var init = function () {
    _pri.bindUI();
    _pri.util.checkToken();
}
init();

// module.exports.alertLogin = alertLogin;