/**
 * 菜单js
 * @author yuxuan
 * @date 2015-02-08
 * @version 1.0.0
*/
'use strict';

var tmpl = require('ldsn-wap:widget/article/article.tpl.js');
var api = require('ldsn-wap:widget/api/api.js');
var toast = require('ldsn-wap:widget/toast/toast.js');
var errMessage = require('common:widget/error-message/error-message.js');

    //私有方法
var _pri = {
        //UI元素集合
    node: {
    	articleMod: $('section[node-type="module-article"]'),
        favourNum: 'em[node-type="favour-num"]',
        favourBtn: 'click[node-type="favour-button"]',
        articleItem: 'section[node-type="module-article"]',
        commentList: 'ul[node-type="comment-list"]',
        submitComment: 'click[node-type="submit-comment"]',
        commentInput: 'input[node-type="comment-input"]'
    },
    //绑定元素事件
    bindUI: function () {
        _pri.node.articleMod.delegate(_pri.node.favourBtn, 'click', _pri.util.setFavour);
        _pri.node.articleMod.delegate(_pri.node.submitComment, 'click', _pri.util.setComment);
	},
    bindListener: function () {
        ldev.message.listen('to_article', function (id) {
            _pri.util.toArticle(id);
        });
        ldev.message.listen('clear_frame', function () {
            _pri.util.hide();
        })
    },
    util: {

        setFavour: function () {
            if (!ldsn.loginStatus) {
                ldev.message.trigger('check_login');
                return;
            }
            var aid = $(this).attr('aid');
            var favourBtn = $(_pri.node.favourBtn + '[aid="' + aid + '"]');
            if(favourBtn.hasClass('active')) {
                favourBtn.removeClass('active');
            } else {
                favourBtn.addClass('active');
            }
            _pri.util.sendFavour(aid);
        },
        sendFavour: function (aid) {
            var data = {
                aid: aid
            };
            $.ajax({
                url: api.favour,
                type: 'post',
                data: data,
                dataType: 'json',
                success: function (data) {
                    var favourBtn = $(_pri.node.favourBtn + '[aid="' + aid + '"]');
                    if (data.status == 1) {
                        favourBtn.addClass('active');
                        $(_pri.node.favourNum + '[aid="' + aid + '"]').html(data.data);
                        favourBtn.closest(_pri.node.articleItem).find(_pri.node.favourNum).html(data.data);
                    } else if (data.status == 2 ) {
                        favourBtn.removeClass('active');
                        $(_pri.node.favourNum + '[aid="' + aid + '"]').html(data.data);
                        favourBtn.closest(_pri.node.articleItem).find(_pri.node.favourNum).html(data.data);
                    } else if (data.status == -1 || data.status == -2 || data.status == -4) {
                        favourBtn.removeClass('active');
                        toast('error', errMessage['favour'][data.status]);
                    } else {
                        favourBtn.addClass('active');
                        toast('error', errMessage['favour'][data.status]);
                    }
                },
                error: function () {
                    toast('error', '网络问题，请重试');
                }
            });
        },
        setComment: function () {
            if (!ldsn.loginStatus) {
                ldev.message.trigger('check_login');
                return;
            }
            var aid = $(this).attr('aid');
            var comment = _pri.node.articleMod.find(_pri.node.commentInput + '[aid="' + aid + '"]');
            var content = comment.val().trim();
            if (!content) {
                toast('error', '请填写评论内容!');
                return;
            }
            _pri.util.sendComment(aid, content);
            comment.val('');
        },
        sendComment: function (aid, content) {
            var data = {
                aid: aid,
                content: content
            }
            $.ajax({
                url: api.addComment,
                type: 'post',
                data: data,
                dataType: 'json',
                success: function (data) {
                    if (data.status != 1) {
                        toast('error', errMessage['comment'][data.status]);
                        return;
                    }
                    var commentData = {
                        comment_id: data.data,
                        content: content
                    }
                    var html = ldev.tmpl(_pri.tmpl.comment, commentData);
                    $(html).appendTo($(_pri.node.commentList + '[aid="' + aid + '"]'));
                },
                error: function () {
                    toast('error', '网络问题，请重试');
                }
            });
        },
        toArticle: function (id) {
            _pri.util.getArticle(id);
            _pri.util.show();
        },
        getArticle: function (id) {
            var data = {
                aid: id
            };
            $.ajax({
                url: api.getArticle,
                data: data,
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    if (data.status != 1) {
                        toast('error', '获取错误，请重试!');
                        return;
                    }
                    _pri.util.renderArticle(data.data);
                },
                error: function () {
                    toast('error', '获取失败，请重试!');
                }
            });
        },
        renderArticle: function (data) {
            var html = ldev.tmpl(_pri.tmpl.article, data);
            _pri.node.articleMod.html(html);
        },
    	initBox: function (){//页面初始化函数
    	},
        hide: function () {
            _pri.node.articleMod.removeClass("active");
        },
        show: function () {
            _pri.node.articleMod.addClass("active");
        }
    },
    tmpl: {
        article: tmpl.article.join(''),
        comment: tmpl.comment.join('')
    },
}
  
var init = function () {
  	_pri.bindUI();
    _pri.bindListener();
   //_pri.util.openArticle();
}

    init();
