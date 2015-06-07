/**
 * 更新文章
 * @author fanmingfei
 * @date 2015-06-07
 * @version 1.0.0
*/

var api = require('common:widget/api/api.js');
var errMessage = require('common:widget/error-message/error-message.js');
var frame = require('ldsn-pc:widget/frame/frame.js');
var toast = require('ldsn-pc:widget/toast/toast.js');
var ue = UE.getEditor('updateArticle');

var _pri = {
    node: {
        updateArticle: 'section[node-type="module-update"]',
        updateClose: 'a[node-type="update-close"]',
        updateBtn: 'a[node-type="modify-article"]',
        updateSub: 'a[node-type="update-submit"]'
    },
    conf: {
        aid: 0
    },
    bindUI: function () {
        $(_pri.node.updateClose).on('click', function () {
            _pri.util.setVisible(false);
        });
        $(_pri.node.updateSub).on('click', function () {
            _pri.util.updateSubmit();
        });
    },
    util: {
        updateSubmit: function () {
            var title = $('#updateTitle').val().trim();
            var content = ue.getContent();
            var columnId = $('#updateColumn').val();
            if (!title) {
                toast('error', '请填写题目哦~');
            }
            if (!content) {
                toast('warning', '请填写内容哦~');
                return;
            }
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
            $.ajax({
                url: api.updateArticle,
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (data) {
                    if (data.status != 1) {
                        toast('error', errMessage['update'][data.status]);
                        return;
                    }
                    toast('success', '更新成功！');
                    _pri.util.setVisible(false);
                }
            })
        },
        openUpdate: function (aid) {
            _pri.conf.aid = aid;
            toast('warning', '等待文章加载...', true);
            $.ajax({
                url: api.getArticle,
                type: 'post',
                dataType: 'json',
                data: {aid: aid},
                success: function (data) {
                    if (data.status != 1) {
                        toast('error', '获取错误，请重试!');
                        return;
                    }
                    toast('close');
                    _pri.util.renderUpdate(data.data);
                },
                error: function () {
                    toast('error', '获取文章错误，修改失败！', true)
                }

            });
        },
        renderUpdate: function (data) {
            frame(true);
            var title = data.title,
                content = data.detail.content,
                columnId = data.column_id;
            $('#updateTitle').val(title);
            $('#updateColumn').find('option[value="' + columnId + '"]').attr('selected','selected')
            ue.setContent(content);
            _pri.util.setVisible(true);
        },
        setVisible: function (flag) {
            if (flag) {
                $(_pri.node.updateArticle).show();
            } else {
                frame(false);
                $(_pri.node.updateArticle).hide();
            }
        }
    }
}

_pri.bindUI();

var _pub = {
    renderUpdate: function  (aid) {
        _pri.util.openUpdate(aid);
    }
}

module.exports = _pub.renderUpdate;