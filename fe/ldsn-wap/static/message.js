/**
 * 事件绑定，在这个文件里进行事件创建
 * @author fanmingfei
 * @date 2015-02-08
 * @version 1.0.0
 */

//以一下方式创建事件

ldev.message.create('check_login');
ldev.message.create('logout');
ldev.message.create('login_end');
ldev.message.create('logout_end');
ldev.message.create('clear_frame');
ldev.message.create('refresh_list');
ldev.message.create('to_article');

//下面是公用message

ldev.message.listen('login_end', function () {
    ldsn.loginStatus = true;
});
ldev.message.listen('logout_end', function () {
    ldsn.loginStatus = false;
});