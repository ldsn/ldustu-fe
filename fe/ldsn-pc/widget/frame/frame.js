/**
 * 背景遮罩
 * @author fanmingfei
 * @date 2015-06-07
 * @version 1.0.0
*/

var _pri = {
	node: {
		frame: 'div[node-type="LD-frame"]'
	},
	util: {
		render: function () {
			if ($(_pri.node.frame).length == 0) {
				var html = '<div node-type="LD-frame" style="position:fixed;left:0;right:0;top:0;bottom:0;background:#000;opacity:.3;z-index: 120"></div>'
				$('body').append($(html))
			}
		},
		setVisible: function  (flag) {
			if (flag) {
				_pri.util.render();
				$(_pri.node.frame).show();
				$('body').css('overflow', 'hidden');
			} else {
				$(_pri.node.frame).hide();
				$('body').css('overflow', '');
			}
		}
	}
}

module.exports = _pri.util.setVisible;