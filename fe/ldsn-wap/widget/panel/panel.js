/**
 * panel 窗口
 * @author fanmingfei
 * @date 2015-04-17
 */

var _pri = {
    node: {
        panelMod: $('section[node-type="module-panel"]')
    },
    bindListener: function () {
        ldev.message.listen('clear_frame', function (){
            _pub.close();
        });
    }
}
var init = function () {
    _pri.bindListener();
}
init();
var _pub = {
    build: function (tmpl, data) {
        var tplData = data || {};
        var html = ldev.tmpl(tmpl, data);
        _pri.node.panelMod.html(html);
        _pri.node.panelMod.addClass('active');
    },
    close: function () {
        _pri.node.panelMod.removeClass('active');
        _pri.node.panelMod.empty();
    },
};
module.exports = _pub;