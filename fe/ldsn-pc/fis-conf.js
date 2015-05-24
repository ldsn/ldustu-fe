var receiver = "http://test.wap.ldustu.com/fis/";
fis.config.merge({
	namespace : 'ldsn-pc',
    pack : {
        'static/pkg/aio.css' : 'widget/**.css',
        'static/pkg/aio.js' : 'widget/nav/**.js'
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
                    to: '/home/wwwroot/ldustu/server/Application/Pc/Config',
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
                    to: '/home/wwwroot/ldustu/server/Application/Pc/Plugins/',
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
                    to: '/home/wwwroot/ldustu/server/Application/Pc/View/Pc/',
                    exclude: /.*\.(?:svn|cvs|tar|rar|psd).*/
                }
            ]
        },
});
