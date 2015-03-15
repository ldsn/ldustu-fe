/**
 * 列表
 * @author fanmingfei
 * @date 2015-02-09
 * @version 1.0.0
 */

var apiCenter = require('ldsn-wap:widget/api/api.js');
var listTpl = require('ldsn-wap:widget/list/list.tpl.js');
var toast = require('ldsn-wap:widget/toast/toast.js');


var _pri = {
    node: {
        itemList: $('ul[node-type="module-list-item-list"]')
    },
    conf: {
        order: 'time',
        currentColumn: null,
        pageSize: 20,
        currentPage: 0,
        isEnd: false
    },
    api: {
        getList: apiCenter.getArcList

    },
    tmpl: {
        listTpl: listTpl.join('')
    },
    util: {
        getListErr: function (data) {
            if (data.error != '0') {
                toast('error', ldev.errorMessage[data.error])
                return true
            }
            return false;
        },

        /**
         * 获取文章列表
         * @param  {number} start 开始的id
         * @param  {number} count 取多少文章
         * @param  {nuber} cid   取哪个版块
         * @return {object}       获取到的数据
         */
        getList: function (startid, count, cid, callback) {
            var sendData = {
                startid: startid,
                count: count,
                cid: cid || '',
            };
            $.ajax({
                url: _pri.api.getList,
                dataType: 'json',
                data: sendData,
                ansyc: false,
                success: function (data) {
                    if(_pri.util.getListErr(data)) {
                        return;
                    }
                    _pri.conf.isEnd = data.artEnd;
                    callback(data.data);
                },
                error: function (xhr, errType, err) {
                    var data = {error:-1,data:err};
                    _pri.util.getListErr(data);
                }
            });
        },


        /**
         * 渲染列表
         * @param  {object} data 列表数据
         */
        render: function (data) {
            var tpl = '';
            data.forEach(function (item){
                console
                tpl += ldev.tmpl(_pri.tmpl.listTpl, item);
            });
            _pri.node.itemList.append($(tpl));
        },

        /**
         * 到达板块
         * @param  {number} cid 将要到达的板块id
         */
        toColumn: function (cid) {
            _pri.util.initList();
            _pri.currentColumn = cid;
            _pri.util.getList(0, _pri.conf.pageSize, cid, _pri.util.render);
        },

        initList: function () {
            _pri.node.itemList.empty();
            _pri.conf.currentPage = 0;
        },

        getMore: function () {
            _pri.conf.currentPage ++;
            if (!_pri.conf.isEnd){
                _pri.util.getList(_pri.conf.currentPage * _pri.conf.pageSize, _pri.conf.pageSize, _pri.conf.currentColumn, _pri.util.render);
            }
            toast('tip', '已经到最后一页拉！');
        }

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
            _pri.util.toColumn(_pri.conf.currentColumn);
        },


        getMore: function () {
            _pri.util.getMore();
        }
};

module.exports = _pub;