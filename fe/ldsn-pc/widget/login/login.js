/**
 * 登录相关
 * @author fanmingfei
 * @date 2015-05-30
 * @version 1.0.0
*/

var api = require('common:widget/api/api.js');
var errMessage = require('common:widget/error-message/error-message.js');
var toast = require('ldsn-pc:widget/toast/toast.js');
var frame = require('ldsn-pc:widget/frame/frame.js');

var _pri = {
    node: {
        loginBtn: '[node-type="login"]',
        register: '.module-register',

    },
    conf: {
        isRender: false,
        openId: null
    },
    bindUI: function () {
        $(_pri.node.loginBtn).on('click', function () {
            // _pri.util.alertLogin();
            // QC.Login.showPopup({appId:"101199587", redirectURI: 'http://www.ldustu.com'})
            location.href="http://openapi.qzone.qq.com/oauth/show?which=ConfirmPage&display=pc&client_id=101199587&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.ldustu.com";
        });
        $('a[node-type="register-submit"]').on('click', function () {
            _pri.util.registerSub();
        })
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
                        toast('success', '棒棒哒！第一次登陆需要填写信息哦~')
                        _pri.util.register();
                    }
                },
                error: function () {
                    toast('error', '登陆失败，请重试！');
                }
            });
        },
        register: function () {
            _pri.util.setRegisterVisible(true);
        },
        setRegisterVisible: function (flag) {
            if (flag) {
                $(_pri.node.register).show();
            } else {
                $(_pri.node.register).hide();
            }
            frame(flag);
        },
        registerSub: function () {

            var username = $('#username').val().trim();
            var password = $('#password').val();
            if (username.length < 3) {
                toast('warning', '用户名最少3位哦~');
                return;
            }
            if (password.length < 6) {
                toast('warning', '密码最少6位哦~');
                return;
            }
            var data = {
                username: username,
                password: password,
                repassword: password,
                qq: $('#qq').val().trim(),
                telphone: $('#telphone').val().trim(),
                email: $('#email').val().trim(),
                head_pic: $('#headPic').val().trim(),
                openid: _pri.conf.openId
            };


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
                    toast('success', '登陆成功！');
                    location.reload();
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
    _pri.util.checkToken();
}
$(document).ready(function () {
    init();
});