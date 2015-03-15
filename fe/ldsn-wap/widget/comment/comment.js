/**
 * 评论
 * @author fanmingfei
 * @date 2015-02-11
 * @version 1.0.0
 */

var api = require('ldsn-wap:widget/api/api.js'),
	commentTmpl = require('ldsn-wap:widget/comment/comment.tpl.js');

var _pri = {
	node: {
		moduleArticle: $('section[node-type="module-article"]')
	},
	api: {
		getComment: api.getComment
	},
	tmpl: {
		commentTmpl: commentTmpl
	},
    util: {
        getErr: function (data) {
            if (data.error != '0') {
                var con = confirm('出现问题，是否刷新？');
                if (con) {
                    location.reload()
                } else {
                    return;
                }
            }
        },
		getComment: function (aid, start, count, order, callback) {
			var data = {
				aid: aid,
				start: start,
				count: count,
				order: order || 'desc'
			};
			$.ajax({
				url:_pri.api.getComment,
				dataType: 'json',
				data: data,
                success: function (data) {
                    _pri.util.getErr(data);
                    callback(data.data);
                },
                error: function (xhr, errType, err) {
                    var data = {error:-1,data:err};
                    _pri.util.getErr(data);
                }
			});
		},
		renderArticle: function (data) {
			data.forEach(function (item) {
				var html = ldev.tmpl(_pri.tmpl.commentTmpl, item);
				_pri.node.moduleArticle.find('.article-comment').append(html);
			});
		}
	}
};

var _pub = {
	util: {
		renderArticle: function (aid, start, count, order) {
			_pri.util.getComment(aid, start, count, order, _pri.util.renderArticle);
		}
	}
};




function Comment(id) {
	this.id = id;
	this.dom = '';
	this.data = [];
	this.tmpl = [];

	this.data = [{"id": "11","aid": "3","uid": "3","content": "fjaoidwjo","time": "1425182059"},{"id": "10","aid": "3","uid": "3","content": "fjaoidwjo","time": "1425181759"},{"id": "9","aid": "3","uid": "3","content": "fjaoidwjo","time": "1425181717"},{"id": "7","aid": "3","uid": "4","content": "dadad","time": "1424068953"},{"id": "6","aid": "3","uid": "4","content": "dwqdqd","time": "1424068874"},{"id": "3","aid": "3","uid": "3","content": "","time": "1423114120"}];
}



Comment.prototype = {
	getTmpl: function () {
		var _this = this;
		_this.data.forEach(function (item) {
			var html = ldev.tmpl(_pri.tmpl.commentTmpl, item);
			_this.tmpl.push(html);
		});
	},
	renderComment: function (dom, data) {
		this.dom = dom;
		this.data = data;
		var _this = this;
		_this.getTmpl();
		_this.dom.find('ul[node-type="article-comment"]').append(_this.tmpl);
	},
	submitComment: function (aid, content) {
		var _this = this;
		var data = {
			aid: aid,
			content: content
		};
		$.ajax({
			url: _pri.api.getComment,
			dataType: 'json',
			data: data,
			type: 'post',
			seccess: function (data) {
				_this.addComment(data);
			}
		});
	},
	addComment: function (data) {
		var _this = this;
		var html = ldev.tmpl(_pri.tmpl.commentTmpl, data.data);
		
	}

}

