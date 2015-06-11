/**
 * 列表
 * @author fanmingfei
 * @date 2015-05-28
 * @version 1.0.0
*/
var api = require('common:widget/api/api.js');
if (window.ldsn && window.ldsn.user && window.ldsn.user.level_status) {
    var updateArticle = require('ldsn-pc:widget/update-article/update-article.js');
}
var errMessage = require('common:widget/error-message/error-message.js');
var toast = require('ldsn-pc:widget/toast/toast.js');
var listTpl = require('ldsn-pc:widget/list/list.tpl.js');

var _pri = {
    node: {
        articleMod: '[node-type="article-model"]',
        articleDelete: '[node-type="delete-article"]',
        articleModify: '[node-type="modify-article"]',
        articleFavour: '[node-type="favour-article"]',
        getMoreList: 'a[node-type="list-load-more"]',
        articleList: 'ul[node-type="article-list"]'
    },
    conf: {
        isEnd: false,
        currentPage: 1,
        currentColumn: ldsn.column_id,
        isTip: false
    },
    tmpl: {
        listTpl: listTpl.join('')
    },
    bindUI: function () {
        $(_pri.node.articleList).delegate(_pri.node.articleDelete, 'click', function () {
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
        $(_pri.node.articleList).delegate(_pri.node.articleModify, 'click', function () {
            var articleId = $(this).attr('data-id');
            _pri.util.modifyArticle(articleId);
        });
        
        $(_pri.node.articleList).delegate(_pri.node.articleFavour, 'click', function () {
            if (!ldsn.loginStatus) {
                // login.alertLogin();
                toast('warning', '请登录后点赞！');
                return;
            }
            if ($(this).find('.icon').hasClass('disabled')) {
                return;
            }
            $(this).find('.icon').addClass('disabled');
            var articleId = $(this).attr('data-id');
            _pri.util.favourArticle(articleId);
        });
        $(_pri.node.getMoreList).on('click', function () {
            _pri.util.getMore();
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
        },
        getMore: function () {      
            if ($(_pri.node.getMoreList).hasClass('disabled')) {
                return;
            }

            if (_pri.conf.isEnd) {
                if (_pri.conf.isTip) return;
                toast('warning', '已经加载到最后一页');
                _pri.conf.isTip = true;
                return;
            }

            $(_pri.node.getMoreList)
                                    .text('正在加载...')
                                    .addClass('disabled');
            _pri.conf.currentPage ++;
            
            var sendData = {
                column_id: _pri.conf.currentColumn,
                p: _pri.conf.currentPage
            };

            $.ajax({
                url: api.getArcList,
                dataType: 'json',
                data: sendData,
                type: 'post',
                success: function (data) {
                    $(_pri.node.getMoreList).removeClass('disabled');
                    if (data.status == 0) {
                        $(_pri.node.getMoreList).hide();
                        toast('warning', '已加载完成！');
                        _pri.conf.isEnd = true;
                        return;
                    }
                    if (data.status != 1) {
                        $(_pri.node.getMoreList).text('获取更多文章')
                                    
                        toast('error', '获取错误请重试！');
                        return;
                    }

                    if (data.data.page.total_page <= _pri.conf.currentPage) {
                        _pri.conf.isEnd = true;
                    }
                    _pri.util.renderList(data.data.list);
                },
                error: function () {
                    $(_pri.node.getMore).removeClass('disabled');
                    toast('error', '获取错误请重试！');
                }
            });
        },
        renderList: function (data) {
            if (_pri.conf.isEnd) {
                $(_pri.node.getMoreList).hide();
            } else {
                $(_pri.node.getMoreList).text('获取更多文章');
            }
            var html = '';
            data.forEach(function (d) {
                html += ldev.tmpl(_pri.tmpl.listTpl, d);
            });
            $(html).appendTo(_pri.node.articleList);

        },
        autoGet: function () {
            var bottom = $(document).height() - $(window).height() - $(window).scrollTop();
            if (bottom < 700) {
                $(_pri.node.getMoreList).trigger('click');
            }
        }
    }
};

var init = function () {
    _pri.bindUI();


}
$(window).on('scroll', _pri.util.autoGet);
$(document).ready(function() {
    init();
});

