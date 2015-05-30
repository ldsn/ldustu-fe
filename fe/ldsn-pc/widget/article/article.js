/**
 * 菜单
 * @author fanmingfei
 * @date 2015-05-28
 * @version 1.0.0
*/

var _pri = {
	node: {
		dom: $('.article_main'),
		content: '.arc_content'
	},
	util: {
		changeImg: function  () {
			var contentDom = _pri.node.dom.find(_pri.node.content);
			var imgDom = contentDom.find('img[_src]');
			for (var i = 0; i < imgDom.length; i ++) {
				var thisDom = imgDom.eq(i);
				var src = ldev.context.IMG_DOMAIN + thisDom.attr('_src');
				thisDom.attr('src', src);
			}
		}
	}
}

var init = function () {
	_pri.util.changeImg();
}

$(function () {
	init();
})