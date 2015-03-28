/**
 * 登陆
 * author: fanmingfei
 * date: 2015-03-14
 * version: v1.0.0
 */

var toast = require('ldsn-wap:widget/toast/toast.js');
var errMessage = require('common:widget/error-message/error-message.js');
var api = require('ldsn-wap:widget/api/api.js');
var regTpl = require('ldsn-wap:widget/login/register.tpl.js');
var panel = require('ldsn-wap:widget/panel/panel.js');

var _pri = {
    node: {
        mod: $('section[node-type="module-login"]'),
        qqLoginBtn: $('div[node-type="login-qq"]'),
        ldsnMainFrame:$("section[node-type='ldsn-main-frame']"),
        panel: $('section[node-type="module-panel"]')
    },
    conf: {
        qqParam: {},
        openId: ''
    },
    tmpl: {
        regTpl: regTpl.join('')
    },
    bindUI: function () {
        _pri.node.qqLoginBtn.on('click', _pri.util.qqLogin);
        _pri.node.ldsnMainFrame.on('click', function () {
            if (_pri.node.mod.hasClass('active')) {
                _pri.util.loginBox(false);
            }
        });
        _pri.node.panel.delegate('click[node-type="register-submit"]', 'click', function () {
            _pri.util.checkRegisterInfo();
        })

    },
    bindListener: function () {
        ldev.message.listen('check_login', function (errWord) {
            if(!ldsn.loginStatus){
                _pri.util.alertLogin();
                toast('error', errWord);
            }
        });
        ldev.message.listen('logout', function () {
            _pri.util.logout();
        })
    },
    util: {
        checkToken: function () {
            var accessToken = ldev.hash('access_token');
            if (accessToken) {
                _pri.util.bindQq();
            }
        },
        qqLogin: function () {

            if (ldsn.loginStatus) return;
            var checkReady = setInterval(function () {
                if (window.QC) {
                    clearInterval(checkReady);
                    QC.Login.showPopup({appId:"101199587", redirectURI: 'http://test.wap.ldustu.com/'})
                }
            },400);

        },
        bindQq: function () {
            if (ldsn.loginStatus) return;
            _pri.util.asyncAddQqLogin();
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
                        toast('success', '登陆成功！');
                        ldsn.user = data.data;
                        ldsn.loginStatus = true;
                        ldev.message.trigger('login_end');
                    } else if (data.status == -3) {
                        panel.build(_pri.tmpl.regTpl);
                    }
                },
                error: function () {
                    toast('error', '登陆失败，请重试！');
                }
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
            if (window.QC) return;
            var checkReady = setInterval(function () {
                if (document.readyState == 'complete') {
                    clearInterval(checkReady);
                    var script = document.createElement('script');
                    script.src = "http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js";
                    script.type = "text/javascript";
                    script.charset = 'utf-8';
                    $(script).attr('data-appid', '101199587');
                    $(script).attr('data-redirecturi', 'http://test.wap.ldustu.com/');
                    $(script).appendTo('body');
                }
            },400);
        },
        alertLogin: function () {
            _pri.util.asyncAddQqLogin();
            _pri.util.loginBox(true);
        },
        checkRegisterInfo: function () {
            var from = $('section[node-type="register"]'),
                nameBox = from.find('input[name="username"]'),
                passwdBox = from.find('input[name="password"]'),
                emailBox = from.find('input[name="email"]'),
                qqBox = from.find('input[name="qq"]');
            var name = nameBox.val(),
                passwd = passwdBox.val(),
                email = emailBox.val(),
                qq = qqBox.val();
            if (!name || !passwd || !email || !qq) {
                toast('error', '请填写完整信息');
                return;
            }
            var data = {
                username: name,
                password: passwd,
                repassword: passwd,
                email: email,
                qq: qq,
                openid: _pri.conf.openId
            };
            _pri.util.postRegisterData(data);
        },
        postRegisterData: function (data) {
            $.ajax({
                url: api.register,
                data: data,
                type: 'post',
                dataType: 'json',
                success: function(d) {
                    if (d.status !== 1){
                        toast('error', errMessage.register[d.status]);
                        return;
                    }
                    toast('success', errMessage.register[d.status]);
                    ldsn.user = d.data;
                    panel.close();
                    ldev.message.trigger('login_end');
                },
                error: function(err) {
                    toast('error', '请求错误，请稍后再试。', true);
                }
            });
        },
        logout: function () {
            _pri.util.asyncAddQqLogin();
            var checkReady = setInterval(function () {
                if (window.QC) {
                    clearInterval(checkReady);
                    QC.Login.signOut();
                }
            },400);
            $.ajax({
                url: api.logout,
                type: 'get',
                dataType: 'json',
                success: function(d) {
                    toast('success', '账号已退出');
                    ldsn.user = '';
                    ldev.message.trigger('logout_end');
                },
                error: function(err) {
                    toast('error', '请求错误，请稍后再试。', true);
                }
            });
        }

    }
}

var init = function () {
    _pri.bindUI();
    _pri.bindListener();
    _pri.util.checkToken();
}

init();

