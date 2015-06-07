/**
 * 提醒框
 * @author fanmingfei
 * @date 2015-06-3
 * @version 1.0.0
 */

var _pri = {
	node: {
		toastMod: '.module-toast',
		value: 'span[node-type="toast-value"]',
		remove: 'a[node-type="toast-remove"]'
	},
	conf: {
		clearTime: null,
	},
	bindUI: function () {
		$(_pri.node.remove).on('click', function () {
			_pri.util.setToastVisible(false);
		})
	},
	util: {
		clearToastValue: function () {
			$(_pri.node.value).html('');
		},
		setToastValue: function (value) {
			$(_pri.node.value).html(value);
		},
		setToastVisible: function (flag) {
			if (flag) {
				$(_pri.node.toastMod).show();

			} else {
				$(_pri.node.toastMod).hide();
			}
		},
		setToastType: function (type) {
			$(_pri.node.toastMod).removeClass('success')
								 .removeClass('warning')
								 .removeClass('error')
								 .addClass(type);
		},
		renderToast: function (type, value, hasClose) {
			if (type === 'close') {
				_pri.util.setToastVisible(false);
				return;
			}
			_pri.util.setToastType(type);
			if (hasClose) {
				$(_pri.node.remove).show();
			} else {
				$(_pri.node.remove).hide();
				clearTimeout(_pri.conf.clearTime);
				_pri.conf.clearTime = setTimeout(function () {
					_pri.util.setToastVisible(false);
				}, 3000);
			}
			_pri.util.setToastValue(value)
			_pri.util.setToastVisible(true);
		}
	}
};
var init = function () {
	_pri.bindUI();
}
init();

module.exports = _pri.util.renderToast;