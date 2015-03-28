/**
 * 列表
 * @author yuxuan
 * @date 2015-03-14
 * @version 1.0.0
 */
var share = require('ldsn-wap:widget/share/share.js'); //引入分享组件
var listMethod = require('ldsn-wap:widget/list/list-method.js');
var api = require('ldsn-wap:widget/api/api.js');
var toast = require('ldsn-wap:widget/toast/toast.js');
var errMessage = require('common:widget/error-message/error-message.js');
var tmpl = require('ldsn-wap:widget/list/list.tpl.js');
//私有方法
var _pri = {
    node: {
        listMod: $('section[node-type="module-list"]'),
        favourNum: 'em[node-type="favour-num"]',
        favourBtn: 'click[node-type="favour-button"]',
        listItem: 'li[node-type="list-item"]',
        articleItem: 'section[node-type="article-item"]',
        commentList: 'ul[node-type="comment-list"]',
        submitComment: 'click[node-type="submit-comment"]',
        commentInput: 'input[node-type="comment-input"]',
        articleDetail: 'section[node-type="article-detail"]'
    },
    tmpl: {
        comment: tmpl.comment.join('')
    },
    //绑定元素事件
    bindUI: function () {
        _pri.node.listMod.delegate('.share-click', "click", function () { //分享点击事件
            console.log(11122);
            var aid = $(this).find("em").attr("aid"); //获取分享文章aid
            var shareAid = $('li[aid="' + aid + '"]');
            var bdText = shareAid.find(".article-title").text() //获取分享文章标题
            var bdDesc = shareAid.find(".article-description").text() //获取分享文章描述
            var bdUrl = _pri.init.getUrl(); //获取分享文章url
            if (shareAid.find(".article-image")) { //判断文章是否有图片
                var bdPic = shareAid.find(".article-image").attr("src"); //获取分享文章图片url
            }
            share.share(bdText, bdDesc, bdUrl, bdPic) //传递参数到分享组件
        });
        _pri.node.listMod.delegate(_pri.node.favourBtn, 'click', _pri.util.setFavour);
        _pri.node.listMod.delegate(_pri.node.submitComment, 'click', _pri.util.setComment);
        _pri.node.listMod.delegate(_pri.node.articleDetail, 'click', function () {
            ldev.message.trigger('to_article', $(this).attr('aid'));
        });

    },
    bindListener: function () {
        ldev.message.listen('refresh_list', function (page) {
            listMethod.toColumn(page);
        })
    },
    util: {
        getUrl: function () { //获取分享url函数
            console.log("hello world!")
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
            var comment = $(_pri.node.commentInput + '[aid="' + aid + '"]');
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
}

init();