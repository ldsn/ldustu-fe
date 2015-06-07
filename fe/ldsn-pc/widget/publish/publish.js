/**
 * 更新文章
 * @author fanmingfei
 * @date 2015-06-07
 * @version 1.0.0
*/

var api = require('common:widget/api/api.js');
var errMessage = require('common:widget/error-message/error-message.js');
var toast = require('ldsn-pc:widget/toast/toast.js');
var ue = window.ue = UE.getEditor('publishArticle');
require('ldsn-pc:widget/upload-image/upload-image.js');

var _pri = {
    node: {
        publishSub: 'a[node-type="publish-submit"]'
    },
    conf: {

    },
    bindUI: function () {
        $(_pri.node.publishSub).on('click', function () {
            _pri.util.articleSubmit();
        });
    },
    util: {
        articleSubmit: function () {
            var title = $('#publishTitle').val().trim();
            var columnId = $('#publishColumn').val();
            var content = ue.getContent();

            if (!title) {
                toast('warning', '要写一个题目哦~');
                return;
            }
            if (!content) {
                toast('warning', '请填写内容哦~');
                return;
            }

            if ($(_pri.node.publishSub).hasClass('disabled')) {
                return;
            }
            $(_pri.node.publishSub).addClass('disabled');

            var thumbnail;
            var _img = $(ue.document.body).find('img[__src]').eq(0);
            var __img = $(ue.document.body).find('img').eq(0);
            if (_img.length > 0) {
                thumbnail = _img.attr('__src');
            } else if (__img.length > 0){
                thumbnail = __img.attr('src');
            }

            var data = {
                column_id: columnId,
                content: content,
                title: title,
                thumbnail: thumbnail
            }
            _pri.util.postArticle(data);

            
        },
        postArticle: function (data) {
            $.ajax({
                url: api.publishArc,
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (data) {
                    $(_pri.node.publishSub).removeClass('disabled');
                    if (data.status != 1) {
                        toast('error', errMessage['publishArc'][data.status]);
                        return;
                    }
                    location.href='/arc/' + data.data;
                },
                error: function () {
                    $(_pri.node.publishSub).removeClass('disabled');
                    toast('error', '发布失败，请重试！')
                }
            })
        }
    }
};
var init = function () {
    _pri.bindUI()
}
init();