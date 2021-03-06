/**
 * 菜单js
 * @author yuxuan
 * @date 2015-02-08
 * @version 1.0.0
*/
'use strict';

var tmpl = require('ldsn-wap:widget/article/article.tpl.js');
var api = require('common:widget/api/api.js');
var toast = require('ldsn-wap:widget/toast/toast.js');
var errMessage = require('common:widget/error-message/error-message.js');
var listMethod = require('ldsn-wap:widget/list/list-method.js');
var header = require('ldsn-wap:widget/header/header.js');
var wxShare = require('ldsn-wap:widget/wx-share/wx-share.js');

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
        commentInput: 'input[node-type="comment-input"]',
        getMoreComment: 'click[node-type="get-more-comment"]',
        shareBtn: 'click[node-type="share-btn"]',
        title: '.article-title',
        content: '.article-content'
    },
    conf: {
        article: null,
        currentArticle: 0,
        currentPage: 0,
        commentPage: 0
    },
    //绑定元素事件
    bindUI: function () {
        _pri.node.articleMod.delegate(_pri.node.favourBtn, 'click', _pri.util.setFavour);
        _pri.node.articleMod.delegate(_pri.node.submitComment, 'click', _pri.util.setComment);
        _pri.node.articleMod.delegate(_pri.node.getMoreComment, 'click', _pri.util.getMoreComment);
        _pri.node.articleMod.delegate(_pri.node.shareBtn, 'click', _pri.util.createShare);
	},
    bindListener: function () {
        ldev.message.listen('to_article', function (id) {
            ldsn.util.goNext = 1;
            ldev.message.trigger('close_edit');
            // ldev.hash('article', id);
            var aid = ldev.hash('article');
            if (aid != id) {
                history.pushState(null, null, '#article=' + id);
            }
            _pri.conf.currentArticle = id;
            _pri.conf.currentPage = 0;
            _pri.util.toArticle(id);
            ldsn.currentPage = 'article';
            header.setGoBack(true);
        });
        ldev.message.listen('clear_frame', function () {
            _pri.util.hide();
        });
            
        ldev.message.listen('go_back', function () {
            history.go(-1);
            ldsn.util.goBack = 1;
            _pri.util.hide();
        });
            
        ldev.bindHash('article', function (aid) {
            if (ldsn.util.goNext === 1) {
                ldsn.util.goNext = 0;
                return;
            }
            if (ldsn.util.goBack === 1) {
                ldsn.util.goBack = 0
                return;
            }
            if (!aid) {
                ldsn.util.goNext = 0;
                ldsn.util.goBack = 0
                return;
            }
            if (aid != _pri.conf.currentArticle) {
                ldsn.util.goNext = 0;
                ldsn.util.goback = 0;
                ldev.message.trigger('to_article', aid);
            }
        });
    },
    util: {
        createShare: function () {
            var item = _pri.node.articleMod;
            var desc = item.find(_pri.node.content).text();
            var title = item.find(_pri.node.title).text();
            var pics = ldev.context.IMG_DOMAIN + item.find(_pri.node.pic).attr('__src');
            var obj = {
                url:location.href,
                summary: desc,
                desc: '在鲁大学生网上看到一篇文章很赞哦~',
                title: title,
                site:'http://www.ldustu.com',
                pics: pics
            }
            ldev.message.trigger('open_share_panel', obj);
        },
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
                        content: content,
                        head_pic: ldsn.user.head_pic,
                        time: ldev.timeFormat(new Date().getTime()),
                        username: ldsn.user.username
                    };
                    var html = ldev.tmpl(_pri.tmpl.comment, commentData);
                    $(html).appendTo($(_pri.node.commentList + '[aid="' + aid + '"]'));
                },
                error: function () {
                    toast('error', '网络问题，请重试');
                }
            });
        },
        toArticle: function (id) {
            if (!id) {
                var col = ldev.hash('column');
                listMethod.toColumn(col);
                return;
            }
            _pri.util.empty();
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
                    _pri.conf.commentPage = Math.ceil((data.data.comment_num - 10) / 20);
                    _pri.util.renderArticle(data.data);
                    _pri.conf.article = data.data;
                },
                error: function () {
                    toast('error', '获取失败，请重试!');
                }
            });
        },
        renderArticle: function (data) {
            var html = ldev.tmpl(_pri.tmpl.article, data);
            _pri.node.articleMod.html(html);
            if (data.comment_list && (data.comment_list.length == data.comment_num)) {
                _pri.node.articleMod.find(_pri.node.getMoreComment).hide();
                return;
            }
            if (_pri.node.articleMod.find(_pri.node.getMoreComment).length > 0) {
                _pri.util.getMoreComment();
            }
            wxShare(data.title, data.thumbnail);
        },
        hide: function () {
            _pri.node.articleMod.removeClass("active");
        },
        show: function () {
            _pri.node.articleMod.addClass("active");
        },
        empty: function () {
            _pri.node.articleMod.empty();
        },
        autoArticle: function () {
            var aid = ldev.hash('article');
            if (aid) {
                ldev.message.trigger('to_article', aid);  
            }
        },
        getMoreComment: function () {
            if (_pri.node.articleMod.find(_pri.node.getMoreComment).hasClass('disable')) {
                return;
            }
            _pri.conf.currentPage ++ ;
            _pri.node.articleMod.find(_pri.node.getMoreComment).text('正在加载...');
            var data = {
                aid: _pri.conf.currentArticle,
                p: _pri.conf.currentPage
            };
            $.ajax({
                url: api.getMoreComment,
                type: 'post',
                data: data,
                dataType: 'json',
                success: function (data) {

                    _pri.node.articleMod.find(_pri.node.getMoreComment).text('加载更多评论');

                    if (data.status != 1) {
                        _pri.conf.currentPage --;
                        toast('error', '获取新评论失败！');
                        return;
                    }

                    if (_pri.conf.currentPage === _pri.conf.commentPage) {
                        _pri.node.articleMod.find(_pri.node.getMoreComment).hide();
                    }
                    _pri.util.renderList(data.data);
                },
                error: function () {
                    _pri.conf.currentPage --;
                    toast('error', '获取新评论失败！');
                }
            });
        },
        renderList: function (data) {
            var html = '';
            data.forEach(function (d) {
                var commentData = {
                    comment_id: d.comment_id,
                    content: d.content,
                    head_pic: d.user_info.head_pic,
                    time: ldev.timeFormat(d.create_time),
                    username: d.user_info.username
                }
                html += ldev.tmpl(_pri.tmpl.comment, commentData);
            });
            $(html).appendTo(_pri.node.articleMod.find(_pri.node.commentList));
        }
    },
    tmpl: {
        article: tmpl.article.join(''),
        comment: tmpl.comment.join('')
    }
}
  
var init = function () {
  	_pri.bindUI();
    _pri.bindListener();
    _pri.util.autoArticle();
}

init();
