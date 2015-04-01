/**
 * 分享
 * @author fanmingfei
 * @date 2015-03-29
 * @version 1.0.0
 */

var _pri = {
    node: {
        shareMod: $('section[node-type="module-share"]'),
        frameMod: $('section[node-type="ldsn-main-frame"]'),
        qzone: 'a[node-type="qzone-share"]'
    },
    conf: {
        shareInfo: {}
    },
    bindUI: function () {
        _pri.node.shareMod.find(_pri.node.qzone).on('click', _pri.util.createQzone);
        _pri.node.frameMod.on('click', function () {
            if (_pri.node.shareMod.hasClass('show')) {
                _pri.node.frameMod.removeClass('active');
                _pri.util.closePanel();
            }
        });
    },
    bindListener: function () {
        /**
         * 分享监听
         * @param  {Object} obj  type 以及分享详情
         */

        ldev.message.listen('open_share_panel', _pri.util.openPanel)
    },
    util: {
        openPanel: function (obj) {
            _pri.node.shareMod.addClass('show');
            _pri.node.frameMod.addClass('active');
            _pri.conf.shareInfo = obj;
        },
        closePanel: function () {
            _pri.node.shareMod.removeClass('show');
            _pri.conf.shareInfo = {};
        },
        createQzone: function (e) {
            e.preventDefault();
            var p = _pri.conf.shareInfo;
            var s = [];
            for(var i in p){
                s.push(i + '=' + encodeURIComponent(p[i]||''));
            }
            var url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + s.join('&');
            _pri.node.shareMod.find(_pri.node.qzone).attr('href', url);
            window.open(url);
        }
    }
}

var init = function () {
    _pri.bindListener();
    _pri.bindUI();
}

init();