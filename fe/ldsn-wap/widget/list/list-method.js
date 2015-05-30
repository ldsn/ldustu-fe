/**
 * 列表
 * @author fanmingfei
 * @date 2015-02-09
 * @version 1.0.0
 */

var api = require('common:widget/api/api.js');
var listTpl = require('ldsn-wap:widget/list/list.tpl.js');
var toast = require('ldsn-wap:widget/toast/toast.js');


var _pri = {
    node: {
        listMod: $('section[node-type="module-list"]'),
        itemList: $('ul[node-type="item-list"]'),
        getMoreList: 'click[node-type="get-more-list"]'
    },
    conf: {
        order: 'time',
        currentColumn: null,
        currentPage: 1,
        isEnd: false
    },
    tmpl: {
        listTpl: listTpl.listTpl.join('')
    },
    util: {
        /**
         * 获取文章列表
         * @param  number start 开始的id
         * @param  number count 取多少文章
         * @param  nuber cid   取哪个版块
         * @return object       获取到的数据
         */
        getList: function (callback) {
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
                    if (typeof callback == 'function') {
                        callback();
                    }
                    if (data.status == 0) {
                        _pri.node.listMod.find(_pri.node.getMoreList).remove();
                        toast('error', '没有获取到数据！');
                        return;
                    }
                    if (data.status != 1) {
                        _pri.node.listMod.find(_pri.node.getMoreList).text('获取更多文章');
                        toast('error', '获取错误请重试！');
                        return;
                    }

                    if (data.data.page.total_page == _pri.conf.currentPage) {
                        _pri.conf.isEnd = true;
                    } 
                        _pri.util.render(data);
                },
                error: function (xhr, errType, err) {
                    toast('error', '服务器错误，请稍后');
                }
            });
        },


        /**
         * 渲染列表
         * @param  {object} data 列表数据
         */
        render: function (data) {
            _pri.node.listMod.find(_pri.node.getMoreList).remove();
            var tpl = '';
            data = data.data.list;
            data.forEach(function (item){
                item.create_time = ldev.timeFormat(item.create_time);
                var curTpl = ldev.tmpl(_pri.tmpl.listTpl, item);
                tpl += curTpl;
            });
            _pri.node.itemList.append($(tpl));
            if (!_pri.conf.isEnd) {
                var getMoreList = $('<click class="get-more-list" node-type="get-more-list">获取更多文章</click>');
                _pri.node.listMod.append(getMoreList);
            }
        },

        /**
         * 到达板块
         * @param  {number} cid 将要到达的板块id
         */
        toColumn: function (cid) {
            _pri.util.initList();
            _pri.conf.currentColumn = cid;
            _pri.util.getList();
        },

        initList: function () {
            _pri.node.itemList.empty();
            _pri.conf.currentPage = 1;
            _pri.conf.isEnd = false;
        },

        getMore: function (callback) {
            if (_pri.conf.isEnd) {
                toast('error', '已经加载到最后一页');
                callback(true);
                return;
            }
            _pri.node.listMod.find(_pri.node.getMoreList).text('正在加载...');
            _pri.conf.currentPage ++;
            _pri.util.getList(callback);
        },

    }
};


var _pub = {

        /**
         * 到达板块
         * @param  {number} cid 将要到达的板块id
         */
        toColumn: function (cid) {
            _pri.util.toColumn(cid);
            if (cid) {
                ldev.hash('column', cid);
            }
        },

        /**
         * 刷新当前板块
         */
        refresh: function() {
            _pri.util.toColumn(_pri.conf.currentColumn, 1);
        },


        getMore: function (callback) {
            _pri.util.getMore(callback);
        }
};

module.exports = _pub;