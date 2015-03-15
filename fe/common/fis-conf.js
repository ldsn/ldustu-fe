var receiver = "http://test.wap.ldustu.com/fis/";

fis.config.merge({
	namespace : 'common',
    pack : {
    	'pkg/common-async.js': [
    		'widget/upload/qiniu.js',
    		'widget/upload/upload.js'
    	],
        'pkg/widget.css' : /^\/widget\/.*\/(.*\.css)$/i,
        'pkg/static.css' : /^\/static\/.*\/(.*\.css)$/i,
        'pkg/common-static.js': [
        	'widget/error-message/error-message.js',
        	'widget/hash/hash.js',
        	'widget/message/message.js',
        	'widget/temp/baidu.template.js',
        	'static/ldev.js',
        ]
    },
	deploy: {
	        //使用fis release --dest static来使用这个配置
	        remote: [
	            {
	                //如果配置了receiver，fis会把文件逐个post到接收端上
	                receiver: receiver,
	                //从产出的结果的static目录下找文件
	                from: '/static',
	                //上传目录从static下一级开始不包括static目录
	                subOnly: true,
	                //保存到远端机器的/home/fis/www/static目录下
	                //这个参数会跟随post请求一起发送
	                to: '/home/wwwroot/ldustu/server/static/',
	                exclude: /.*\.(?:svn|cvs|tar|rar|psd).*/
	            },{
	                //如果配置了receiver，fis会把文件逐个post到接收端上
	                receiver: receiver,
	                //从产出的结果的static目录下找文件
	                from: '/config',
	                //上传目录从static下一级开始不包括static目录
	                subOnly: true,
	                //保存到远端机器的/home/fis/www/static目录下
	                //这个参数会跟随post请求一起发送
	                to: '/home/wwwroot/ldustu/server/Application/Wap/View/Config',
	                exclude: /.*\.(?:svn|cvs|tar|rar|psd).*/
	            },{
	                //如果配置了receiver，fis会把文件逐个post到接收端上
	                receiver: receiver,
	                //从产出的结果的static目录下找文件
	                from: '/plugin',
	                //上传目录从static下一级开始不包括static目录
	                subOnly: true,
	                //保存到远端机器的/home/fis/www/static目录下
	                //这个参数会跟随post请求一起发送
	                to: '/home/wwwroot/ldustu/server/Application/Wap/View/Plugins/',
	                exclude: /.*\.(?:svn|cvs|tar|rar|psd).*/
	            },{
	                //如果配置了receiver，fis会把文件逐个post到接收端上
	                receiver: receiver,
	                //从产出的结果的static目录下找文件
	                from: '/template',
	                //上传目录从static下一级开始不包括static目录
	                subOnly: true,
	                //保存到远端机器的/home/fis/www/static目录下
	                //这个参数会跟随post请求一起发送
	                to: '/home/wwwroot/ldustu/server/Application/Wap/View/',
	                exclude: /.*\.(?:svn|cvs|tar|rar|psd).*/
	            }
	        ]
        },
});
