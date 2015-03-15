 /**
 * 列表
* @author yuxuan
* @date 2015-03-14
* @version 1.0.0
*/
'use strict';
var share = require('ldsn-wap:widget/share/share.js');//引入分享组件
//私有方法
var _pri = {
	node: {
		listMod: $('section[node-type="module-list"]'),
},
//绑定元素事件
	bindUI: function () {    
		_pri.node.listMod.delegate('.share-click',"click",function () {//分享点击事件
			console.log(11122);
			var aid = $(this).find("em").attr("aid");//获取分享文章aid
			var shareAid = $('li[aid="'+aid+'"]');
			var bdText = shareAid.find(".article-title").text()//获取分享文章标题
			var bdDesc = shareAid.find(".article-description").text()//获取分享文章描述
			var bdUrl = _pri.init.getUrl();//获取分享文章url
			if(shareAid.find(".article-image")){//判断文章是否有图片
				var bdPic = shareAid.find(".article-image").attr("src");//获取分享文章图片url
			}
			share.share(bdText,bdDesc,bdUrl,bdPic)//传递参数到分享组件
		});

	},
	init: {
		getUrl: function () {//获取分享url函数
			console.log("hello world!")
		}
	}
}

 /**
  * 如果页面需要加载后运行某些函数
  * 需要定义init()代表初始化 并执行
  */

var init = function () {
	_pri.bindUI();
}

init();
