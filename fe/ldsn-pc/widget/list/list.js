/**
 * 菜单
 * @author fanmingfei
 * @date 2015-05-28
 * @version 1.0.0
*/
var api = require('common:widget/api/api.js');
if (window.ldsn && window.ldsn.user && window.ldsn.user.level_status) {
    var updateArticle = require('ldsn-pc:widget/update-article/update-article.js');
}

$(document).ready(function(){
    var _pri = {
        node: {
            articleMod: '[node-type="article-model"]',
            articleDelete: '[node-type="delete-article"]',
            articleModify: '[node-type="modify-article"]',
            articleFavour: '[node-type="favour-article"]'
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
                    login.alertLogin();
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
            deleteArticle: function (id) {
                $.ajax({
                    url: api.removeArticle,
                    type: 'post',
                    dataType: 'json',
                    data: {aid: id},
                    success: function (data) {
                        if (data && data.status !=0) {
                            var dom = $(_pri.node.articleMod + '[data-id="' + id + '"');
                            var isList = dom.hasClass('list');
                            if (isList) {
                                dom.css('height','0');
                                setTimeout(function() {
                                    dom.remove();
                                },1000);
                                return;
                            }
                            dom.remove();
                        } else {
                            alert('删除失败！');
                            $(_pri.node.articleDelete + '[data-id="' + id + '"').find('.icon').removeClass('disabled');
                        }
                    },
                    error: function () {
                            $(_pri.node.articleDelete + '[data-id="' + id + '"').find('.icon').removeClass('disabled');
                    }
                });

            },
            modifyArticle: function (id) {
                updateArticle(id);
            },
            favourArticle: function (id) {
                $.ajax({
                    url: api.favour,
                    type: 'post',
                    dataType: 'json',
                    data: {aid: id},
                    success: function (data) {
                        if (data && data.status !=0) {
                            if (data.status == 1) {
                                $(_pri.node.articleFavour + '[data-id="' + id + '"').find('b').text('已赞(' + data.data + ')');
                            }
                            if (data.status == 2) {
                                $(_pri.node.articleFavour + '[data-id="' + id + '"').find('b').text('赞(' + data.data + ')');
                            }
                            $(_pri.node.articleFavour + '[data-id="' + id + '"').find('.icon').removeClass('disabled');
                        } else {
                        }
                    },
                    error: function () {
                            $(_pri.node.articleDelete + '[data-id="' + id + '"').find('.icon').removeClass('disabled');
                    }
                });
            }
        }
    };

    var init = function () {
        _pri.bindUI();
    }
    $(document).ready(function() {
        init();
    });
});

