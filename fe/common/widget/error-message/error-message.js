/**
 * 错误信息提示
 * date: 2015-03-14
 * author: fanmingfei
 */

var errorMessage = {
	'register': { 
		'-1': '验证码错误',
		'-2': '需要验证码',
		'-3': '密码重复错误',
		'-4': '邮箱格式不正确',
		'-5': '邮箱已经被注册',
		'-6': '用户名已经被注册',
		'-7': '需要填写密码',
		'-8': '请输入6-16位密码',
		'-9': '注册失败',
		'1': '注册并登陆成功'
	},
	'getArcList': {
		'0': '获取列表成功',
		'1': '列表为空'
	},
	'publishArc': {
		'-1': '请重新登陆',
		'-2': '请填写标题',
		'-3': '请填写内容',
		'-4': '发布失败，请稍后重试',
		'-5': '请选择栏目'
	},
	'update': {
		'-1': '请重新登陆',
		'-2': '请填写标题',
		'-3': '请填写内容',
		'-4': '更新失败，请稍后重试',
		'-5': '请选择栏目',
		'-6': '需要文章id，请联系管理员'
	},
	'favour': {
        '-1': '请登录后点赞',
        '-2': '文章出现错误',
        '-3': '取消赞失败',
        '-4': '点赞失败'
	},
	'comment': {
        '-1': '请登录后评论',
        '-2': '评论最多200字',
        '-3': '评论失败，请重试'
	},
	'commentList': {
		'-1': '无文章id，请重试',
		'0': '评论为空'
	}
}

module.exports = errorMessage;