/**
 * 列表
 * @author yuxuan
 * @date 2015-03-14
 * @version 1.0.0
 */
var share = require('ldsn-wap:widget/share/share.js'); //引入分享组件
var listMethod = require('ldsn-wap:widget/list/list-method.js');
var api = require('common:widget/api/api.js');
var toast = require('ldsn-wap:widget/toast/toast.js');
var errMessage = require('common:widget/error-message/error-message.js');
var tmpl = require('ldsn-wap:widget/list/list.tpl.js');
//私有方法
var _pri = {
    node: {
        listMod: $('section[node-type="module-list"]'),
        itemList: 'ul[node-type="item-list"]',
        favourNum: 'em[node-type="favour-num"]',
        favourBtn: 'click[node-type="favour-button"]',
        listItem: 'li[node-type="list-item"]',
        articleItem: 'section[node-type="article-item"]',
        commentList: 'ul[node-type="comment-list"]',
        submitComment: 'click[node-type="submit-comment"]',
        commentInput: 'input[node-type="comment-input"]',
        articleDetail: 'section[node-type="article-detail"]',
        shareBtn: 'click[node-type="share-btn"]',
        title: 'h2[node-type="article-title"]',
        description: 'article[node-type="article-description"]',
        pic: 'img[node-type="article-image"]',
        getMoreList: 'click[node-type="get-more-list"]'
    },
    tmpl: {
        comment: tmpl.comment.join('')
    },
    conf: {
        geting: false,
        isLast: false,
        currentCid: 0
    },
    //绑定元素事件
    bindUI: function () {
        _pri.node.listMod.delegate(_pri.node.shareBtn, "click", _pri.util.createShare);
        _pri.node.listMod.delegate(_pri.node.favourBtn, 'click', _pri.util.setFavour);
        _pri.node.listMod.delegate(_pri.node.submitComment, 'click', _pri.util.setComment);
        _pri.node.listMod.delegate(_pri.node.articleDetail, 'click', function () {
            ldev.message.trigger('to_article', $(this).attr('aid'));
        });
        _pri.node.listMod.on('scroll', function () {
            var h = _pri.node.listMod.height() * 2;
            var scrollTop = _pri.node.listMod.scrollTop();
            var itemListHeight = _pri.node.listMod.find(_pri.node.itemList).height();
            if (itemListHeight - h < 0) {
                return;
            }
            if (scrollTop > itemListHeight - h) {
                _pri.util.getMoreList();
            }
        });
        _pri.node.listMod.delegate(_pri.node.getMoreList, 'click', _pri.util.getMoreList);
    },
    bindListener: function () {
        ldev.message.listen('refresh_list', function (cid) {
            listMethod.toColumn(cid);
        });
        ldev.message.listen('to_column', function (cid) {
            ldsn.util.goNext = 1;
            ldsn.currentPage = 'column';
            _pri.node.listMod.scrollTop(0);
            _pri.conf.isLast = false;
            // ldev.hash('column', cid);
            var id = ldev.hash('column');
            if (id != cid) {
                history.pushState(null, null, '#column=' + cid);
            }
            _pri.conf.currentCid = cid;
            ldev.message.trigger('clear_frame');
            listMethod.toColumn(cid);
        });
        ldev.bindHash('column', function (cid) {
            if (ldsn.util.goNext === 1) {
                ldsn.util.goNext = 0;
                return;
            }
            if (ldsn.util.goBack === 1) {
                ldsn.util.goBack = 0
                return;
            }
            var id = ldev.hash('column');
            var aid = ldev.hash('article');
            if (aid || ldev.hash('page')) {
                ldsn.util.goNext = 0;
                ldsn.util.goBack = 0
                return;
            }
            if (!cid) cid = 0;
            if (id != _pri.conf.currentCid) {
                ldsn.util.goNext = 0;
                ldsn.util.goBack = 0;
                ldev.message.trigger('to_column', id);
            } else if (id == _pri.conf.currentCid) {
                ldsn.util.goNext = 0;
                ldsn.util.goBack = 0;
                ldev.message.trigger('clear_frame');
            }
        });
    },
    util: {
        createShare: function () {
            var item = $(this).closest(_pri.node.listItem);
            var desc = item.find(_pri.node.description).text();
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
                        content: content,
                        head_pic: ldsn.user.head_pic,
                        time: ldev.timeFormat(new Date().getTime()),
                        username: ldsn.user.username
                    }
                    var html = ldev.tmpl(_pri.tmpl.comment, commentData);
                    $(html).appendTo($(_pri.node.commentList + '[aid="' + aid + '"]'));
                },
                error: function () {
                    toast('error', '网络问题，请重试');
                }
            });
        },
        getMoreList: function () {
            if (_pri.conf.geting || _pri.conf.isLast) {
                return;
            }
            _pri.conf.geting = true;
            listMethod.getMore(_pri.util.afterGetMore);
        },
        afterGetMore: function (flag) {
            if (flag) {
                _pri.conf.isLast = true;
            }
            _pri.conf.geting = false;
        },
        autoColumn: function () {
            // 解决登陆后和文章自动跳转问题
            if(ldev.hash('article') || ldev.hash('access_token'))return;
            var cid = ldev.hash('column') || 0;
            ldev.message.trigger('to_column', cid);
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
    _pri.util.autoColumn();
}

init();