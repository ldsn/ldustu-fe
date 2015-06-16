/**
 * 菜单
 * @author fanmingfei
 * @date 2015-05-28
 * @version 1.0.0
*/
var api = require('common:widget/api/api.js');
var errMessage = require('common:widget/error-message/error-message.js');
var toast = require('ldsn-pc:widget/toast/toast.js');
if (window.ldsn && window.ldsn.user && window.ldsn.user.level_status > 0) {
    var updateArticle = require('ldsn-pc:widget/update-article/update-article.js');
}
var _pri = {
    node: {
        dom: $('.article_main'),
        content: '.arc_content',
        articleMod: '[node-type="article-model"]',
        articleDelete: '[node-type="delete-article"]',
        articleModify: '[node-type="modify-article"]',
        articleFavour: '[node-type="favour-article"]'
    },
    conf: {
        aid: article.id

    },
    bindUI: function () {
        $(_pri.node.articleDelete).on('click', function () {
            if ($(this).find('.icon').hasClass('disabled')) {
                return;
            }
            $(this).find('.icon').addClass('disabled');
            var articleId = $(this).attr('data-id');

            var dom = $(_pri.node.articleMod + '[data-id="' + articleId + '"');
            var h = dom.css('height');
            dom.css('height', h);
            _pri.util.deleteArticle(articleId);
        });
        $(_pri.node.articleModify).on('click', function () {
            var articleId = $(this).attr('data-id');
            _pri.util.modifyArticle(articleId);
        });
        
        $(_pri.node.articleFavour).on('click', function () {
            if (!ldsn.loginStatus) {
                toast('warning', '登陆后才能点赞哦~');
                return;
            }
            if ($(this).find('.icon').hasClass('disabled')) {
                return;
            }
            $(this).find('.icon').addClass('disabled');
            var articleId = $(this).attr('data-id');
            _pri.util.favourArticle(articleId);
        });

    },
    util: {
        changeImg: function  () {
            var contentDom = _pri.node.dom.find(_pri.node.content);
            var imgDom = contentDom.find('img[__src]');
            for (var i = 0; i < imgDom.length; i ++) {
                var thisDom = imgDom.eq(i);
                var src = ldev.context.IMG_DOMAIN + thisDom.attr('__src');
                thisDom.attr('src', src);
            }
        },
        deleteArticle: function () {
                $.ajax({
                    url: api.removeArticle,
                    type: 'post',
                    dataType: 'json',
                    data: {aid: _pri.conf.aid},
                    success: function (data) {
                        if (data && data.status != 1) {
                            toast('error', errMessage['removeArc'][data.status]);
                            $(_pri.node.articleDelete).find('.icon').removeClass('disabled');
                        } else {
                            $(_pri.node.articleDelete).find('.icon').removeClass('disabled');
                        }
                    },
                    error: function () {
                            $(_pri.node.articleDelete).find('.icon').removeClass('disabled');
                    }
                });

            },
        modifyArticle: function () {
            updateArticle(_pri.conf.aid);
        },
        favourArticle: function () {
            $.ajax({
                url: api.favour,
                type: 'post',
                dataType: 'json',
                data: {aid: _pri.conf.aid},
                success: function (data) {
                    if (data && data.status !=0) {
                        if (data.status == 1) {
                            $(_pri.node.articleFavour).find('b').text('已赞(' + data.data + ')');
                        }
                        if (data.status == 2) {
                            $(_pri.node.articleFavour).find('b').text('赞(' + data.data + ')');
                        }
                        $(_pri.node.articleFavour).find('.icon').removeClass('disabled');
                    } else {
                        toast('error', errMessage['favour'][data.status]);
                    }
                },
                error: function () {
                    toast('error', '点赞失败!');
                    $(_pri.node.articleDelete).find('.icon').removeClass('disabled');
                }
            });
        }
    }
}

var init = function () {
    _pri.bindUI();
    _pri.util.changeImg();
}
$(document).ready(function() {
    init();
});

