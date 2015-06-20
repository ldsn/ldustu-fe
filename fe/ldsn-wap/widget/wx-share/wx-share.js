/**
 * 设置页面title和头图，为了解决微信分享的问题(目前头图问题没有解决，如果想完全解决需要微信认证)
 * author: fanmingfei
 * date: 2015-03-07
 */
var setShare = function (title, img) {
		title = title || '鲁大学生网';
		img = img || '';
		$('title').text(title);
		var newImg = ldev.context.IMG_DOMAIN + img + ldev.context.IMG_400_20;
		$('#wxImg').attr('src', newImg);
}

module.exports = setShare;
