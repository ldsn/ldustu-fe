/**
     * 文章发布js
     * @author yuxuan
     * @date 2015-02-08
     * @version 1.0.0
     */
 
'use strict';

var login = require('ldsn-wap:widget/login/login.js');
var toast = require('ldsn-wap:widget/toast/toast.js');
var api = require('ldsn-wap:widget/api/api.js');
var errMessage = require('common:widget/error-message/error-message.js');
//私有方法
var _pri = {
    //UI元素集合
    node: {
        mod: $('section[node-type="ldsn-edit-article"]'),
        editModule: $('section[node-type="module-edit-article"]'),
        editReset:$('click[node-type="edit-reset"]'),
        editSubmit:$('click[node-type="edit-submit"]'),
        editClick: $('click[node-type="right-click"]'),
        textTitle: $('.textTitle'),
        editBox: $('#editor'),
        selectColumn: $('select[node-type="select-column"]')
    },
    //绑定元素事件
    bindUI: function () {
        _pri.node.editReset.on("click",function(){
            _pri.util.hide();
        });
        _pri.node.editSubmit.on("click",function(){
            if($(this).hasClass('cancel')) {
                return;
            }
            $(this).addClass('cancel');
            _pri.util.articleRelease();
        });
        _pri.node.editClick.on("click",function () {
            ldev.message.trigger('check_login','该操作需要登录哦~');
            if(ldsn.loginStatus) _pri.util.editClick();
        });
    },
    bindListener: function () {
        ldev.message.listen('clear_frame', function (){
            _pri.util.hide();
        });
    },
    util: {
        articleRelease:function(){
            var title = _pri.node.textTitle.val();
            var content = _pri.node.editBox.html().trim();
            var column = _pri.node.selectColumn.val();
            if (!title) {
                toast('error', '请填写标题');
                _pri.node.editSubmit.removeClass('cancel');
                return;
            }
            if (!content) {
                toast('error', '请填写内容');
                _pri.node.editSubmit.removeClass('cancel');
                return;
            }
            var imgSrc = '';
            if(_pri.node.editBox.find("img").length > 0){
                imgSrc = _pri.node.editBox.find("img").eq(0).attr('_src');
            }

            var data = {
                'column_id': column,
                'title': title,
                'thumbnail': imgSrc,
                'content': content
            }
            $.ajax({
                url: api.publishArc,
                dataType:'json',
                data:data,
                type: 'post',
                success:function(data){
                    if (data.status != 1) {
                        toast('error', errMessage['publishArc'][data.status]);
                        _pri.node.editSubmit.removeClass('cancel');
                        return;
                    }
                    _pri.node.textTitle.val('');
                    _pri.node.editBox.empty();
                    _pri.util.hide();
                    ldev.message.trigger('refresh_list', 0);
                    ldev.message.trigger('clear_frame');
                    toast('success', '发布成功！');
                    _pri.node.editSubmit.removeClass('cancel');
                },
                error: function (data) {
                    toast('error', '发布失败，请稍后重试！');
                    _pri.node.editSubmit.removeClass('cancel');
                }
            });
        },
        show: function () {
            _pri.node.editModule.addClass('show');
        },
        hide: function () {
            _pri.node.editModule.removeClass('show');
        },
        editClick:function(){
            if (_pri.node.editModule.hasClass('show')) {
                _pri.util.hide();
            } else {
                _pri.util.show();
                require("ldsn-wap:widget/upload-image/upload-image.js");
            }
                        //ldev.hash('page','editor');
        },
        initSelectColumn: function () {
            var html = '';
            for (var i = 0; i < ldsn.column.length; i++) {
                html += '<option value="' + ldsn.column[i].column_id + '">' + ldsn.column[i].column_name + '</option>';
            }
            _pri.node.selectColumn.html(html);
        }
    }
}

/**
 * 如果页面需要加载后运行某些函数
 * 需要定义init()代表初始化 并执行
 */

var init = function () {
    _pri.bindUI();
    _pri.bindListener();
    _pri.util.initSelectColumn();
}

init();
