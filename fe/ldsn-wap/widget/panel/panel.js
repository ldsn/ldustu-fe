/**
 * panel 窗口
 * @author fanmingfei
 * @date 2015-04-17
 */

var _pub = {
    node: {
        panelMod: $('section[node-type="module-panel"]')
    },
    build: function (tmpl, data) {
        var tplData = data || {};
        var html = ldev.tmpl(tmpl, data);
        _pub.node.panelMod.html(html);
        _pub.node.panelMod.addClass('active');
    },
    close: function () {
        _pub.node.panelMod.removeClass('active');
        _pub.node.panelMod.html();
    }
};
module.exports = _pub;