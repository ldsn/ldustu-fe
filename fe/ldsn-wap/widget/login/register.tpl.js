/**
 * 注册页模板
 * author: fanmingfei
 * date: 2015-03-17
 * version: v1.0.0
 */

var tmpl = [
	'<section node-type="register">',
		'<input name="username" placeholder="昵称 用于登陆" type="text"/>',
		'<input name="password" placeholder="密码 用于登陆" type="password"/>',
		'<input name="email" placeholder="邮箱 用于找回密码" type="text"/>',
		'<input name="qq" placeholder="QQ号码" type="text"/>',
		'<click node-type="register-submit">注&nbsp&nbsp册</click>',
	'</section>'
];

module.exports = tmpl;