/**
 * 用户信息
 * @author fanmingfei
 * @date 2015-05-28
 * @version 1.0.0
*/


var api = require('common:widget/api/api.js');
var errMessage = require('common:widget/error-message/error-message.js');
var toast = require('ldsn-pc:widget/toast/toast.js');
if (ldsn && ldsn.isMe) {
    var upload = require('common:widget/upload/upload.js');
}

var _pri = {
    node: {
        updateBtn: 'a[node-type="info-update-save"]',
        logout: 'a[node-type="logout"]'
    },
    bindUI: function () {
        $(_pri.node.updateBtn).on('click', function () {
            _pri.util.updateInfo();
        });
        $(_pri.node.logout).on('click', function () {
            _pri.util.logout();
        });
    },
    util: {
        updateInfo: function () {
            var username = $('#username').val().trim();
            var password = $('#password').val();
            if (username.length < 2) {
                toast('warning', '用户名最少3位哦~');
                return;
            }
            if (password && password.length < 6) {
                toast('warning', '密码最少6位哦~');
                return;
            }
            var data = {
                username: username,
                password: password,
                qq: $('#qq').val().trim(),
                telphone: $('#telphone').val().trim(),
                email: $('#email').val().trim(),
                head_pic: $('#headPic').val().trim()
            }
            $.ajax({
                url: api.updateInfo,
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (data) {
                    if (data.status != 1) {
                        toast('error', errMessage['updateInfo'][data.status]);
                    }
                    toast('success', '修改信息成功！');
                },
                error: function () {
                    toast('error', '更新失败,请稍后重试！');
                }
            });
        },
        logout: function () {
            $.get(api.logout, function () {
                location.reload();
            });
        }
    }
};



var initUpload = function () {
    var event = {
        'FilesAdded': function(up, files) {
            console.log(up)
            plupload.each(files, function(file) {
                if(file.type != 'image/jpeg' && file.type != 'image/jpg' && file.type != 'image/png' && file.type != 'image/gif'){
                    toast('error', '文件类型错误，请上传图片文件', true);
                    up.removeFile(file);
                    up.stop();
                }
            });
            up.start();
        },
        'BeforeUpload': function(up, file) {
           // 每个文件上传前,处理相关的事情
            toast('warning', '正在上传中，请稍后...', true);
        },
        'UploadProgress': function(up, file) {
            // 每个文件上传时,处理相关的事情
            if(file.percent) {
                toast('warning', '正在上传中 ' + file.percent+'%', false);
            } else {
                toast('warning', '正在上传中，请稍后...', false);
            }
        },
        'FileUploaded': function(up, file, info) {
            var domain = up.getOption('domain')
            var res = $.parseJSON(info);
            var sourceLink = domain + res.key + ldev.context.IMG_200_100;

            $('#headPicImg').attr('src', sourceLink);
            $('#headPic').val(res.key);
        },
        'Error': function(up, err, errTip) {
               //上传出错时,处理相关的事情
            toast('error', '文件上传错误请重试！', false);
        },
        'UploadComplete': function() {
               //队列文件处理完毕后,处理相关的事情
        },
        'Key': function(up, file) {
            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
            // 该配置必须要在 unique_names: false , save_key: false 时才生效
            if(file.type == 'image/jpeg' || file.type == 'image/jpg' || file.type == 'image/png' || file.type == 'image/gif'){
              var nameSuffix = file.name.substring(file.name.lastIndexOf('.'));
              var key = 'headPic/' + new Date().getTime() + '_' + ldsn.user.user_id + nameSuffix;
              // do something with key here
              return key
            }
        }
    };
    if (ldsn && ldsn.isMe) {
        upload('changeHead', event);
    }
}

$(document).ready(function () {
    _pri.bindUI();
    initUpload();
})