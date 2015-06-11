/**
 * 文章评论js
 * @author fanmingfei
 * @date 2015-05-30
 * @version 1.0.0
*/

var api = require('common:widget/api/api.js');
var errMessage = require('common:widget/error-message/error-message.js');
var toast = require('ldsn-pc:widget/toast/toast.js');
var commentTpl = require('ldsn-pc:widget/comment/comment.tpl.js');

var _pri = {
    node: {
        articleComment: '.article-comment',
        commentUl: '.comment-ul',
        contentTextarea: '.comment-textarea',
        commentSubmit: 'a[node-type="article-comment-submit"]',
        loadMore: 'a[node-type="comment-load-more"]'
    },
    conf: {
        currentPage: 0,
        commentNum: article.commentNum,
        articleId: article.id,
        commentPage: Math.ceil((article.commentNum - 10) / 20)
    },
    bindUI: function () {
        $(_pri.node.commentSubmit).on('click', function () {
            if ($(this).hasClass('disabled')){
                return;
            }
            $(this).addClass('disabled');

            var content = $(_pri.node.articleComment).find(_pri.node.contentTextarea).val();
            if (!content) {
                toast('warning', '请填写内容！');
                return;
            }
            _pri.util.submitComment(content);
        });
        $(_pri.node.loadMore).on('click', function () {
             if ($(this).hasClass('disabled')){
                return;
            }
            $(this).addClass('disabled');

            _pri.util.getMore();
            $(this).text('正在加载...')
        });

    },
    tmpl: {
        commentTpl: commentTpl.join('')
    },
    util: {
        submitComment: function (content) {
            var data = {
                aid: _pri.conf.articleId,
                content: content
            };
            $.ajax({
                url: api.addComment,
                data: data,
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    $(_pri.node.commentSubmit).removeClass('disabled');
                    if (data.status != 1) {
                        toast('error', errMessage['comment'][data.status]);
                        return;
                    }
                    $(_pri.node.articleComment).find(_pri.node.contentTextarea).val('');
                    var commentData = {
                        comment_id: data.data,
                        content: content,
                        head_pic: ldsn.user.head_pic,
                        time: ldev.timeFormat(new Date().getTime()),
                        username: ldsn.user.username
                    };
                    var html = ldev.tmpl(_pri.tmpl.commentTpl, commentData);
                    $(html).appendTo($(_pri.node.commentUl));
                },
                error: function  () {
                        toast('error', '发表评论遇到错误，请稍后重试！');
                }
            });
        },
        getMore: function () {
            _pri.conf.currentPage ++;
            var data = {
                aid: _pri.conf.articleId,
                p: _pri.conf.currentPage
            }
            $.ajax({
                url: api.getMoreComment,
                data: data,
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    $(_pri.node.loadMore).text('加载更多');
                    $(_pri.node.loadMore).removeClass('disabled');
                    if (data.status != 1) {
                        _pri.conf.currentPage --;
                        if (data.status == 0) {
                            _pri.util.setGetMore(false);
                        }
                        if (data.status == -1) {
                            login.alertLogin();
                        }
                        toast('error', errMessage['comment'][data.status]);
                        return;
                    }
                    console.log(_pri.conf.currentPage, _pri.conf.commentPage)
                    if (_pri.conf.currentPage === _pri.conf.commentPage) {
                        _pri.util.setGetMore(false);
                    }
                    _pri.util.renderList(data.data);
                },
                error: function () {
                    $(_pri.node.loadMore).removeClass('disabled');
                        _pri.conf.currentPage --;
                        toast('error', '获取评论遇到错误，请稍后重试！');
                }
            })
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
                html += ldev.tmpl(_pri.tmpl.commentTpl, commentData);
            });
            $(html).appendTo($(_pri.node.commentUl));
        },
        setGetMore: function (flag) {
            if (flag) {
                $(_pri.node.loadMore).css('display', 'block');
            } else {
                $(_pri.node.loadMore).hide();
            }
        },
        initGetMore: function () {
            if (_pri.conf.commentNum < 10) {
                _pri.util.setGetMore(false);
            } else {
                _pri.util.setGetMore(true);
            }
        }
    }
}



var init = function () {
    _pri.bindUI();
    _pri.util.initGetMore();
};

$(document).ready(function () {
    init();
});
