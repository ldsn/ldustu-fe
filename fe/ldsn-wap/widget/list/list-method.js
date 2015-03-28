/**
 * 列表
 * @author fanmingfei
 * @date 2015-02-09
 * @version 1.0.0
 */

var api = require('ldsn-wap:widget/api/api.js');
var listTpl = require('ldsn-wap:widget/list/list.tpl.js');
var toast = require('ldsn-wap:widget/toast/toast.js');


var _pri = {
    node: {
        itemList: $('ul[node-type="module-list-item-list"]')
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
        getList: function () {
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
                    if (data.data.page.total_page == _pri.conf.currentPage) {
                        _pri.conf.isEnd = true;
                    }
                    if (data.status == 0) {
                        toast('error', '没有获取到数据！');
                        return;
                    } else if (data.status == 1) {
                        _pri.util.render(data);
                    }
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
            var tpl = '';
            data = data.data.list;
            data.forEach(function (item){
                item.create_time = ldev.timeFormat(item.create_time);
                var curTpl = ldev.tmpl(_pri.tmpl.listTpl, item);
                tpl += curTpl;

            });
            _pri.node.itemList.append($(tpl));
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
        },

        getMore: function () {
            if (_pri.conf.isEnd) {
                toast('error', '已经加载到最后一页');
                return;
            }
            _pri.conf.currentPage ++;
            if (!_pri.conf.isEnd){
                _pri.util.getList(_pri.conf.currentColumn, _pri.conf.currentPage);
            }
            toast('tip', '已经到最后一页拉！');
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
        },

        /**
         * 刷新当前板块
         */
        refresh: function() {
            _pri.util.toColumn(_pri.conf.currentColumn, 1);
        },


        getMore: function () {
            _pri.util.getMore();
        }
};

module.exports = _pub;