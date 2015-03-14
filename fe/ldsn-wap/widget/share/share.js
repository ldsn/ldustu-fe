/**
     * 菜单js
     * @author yuxuan
     * @date 2015-02-08
     * @version 1.0.0
     */
 

    //私有方法
    var _pri = {
        //UI元素集合
        node: {
        	mod: $('menu[node-type="ldsn-share"]'),
        	
        },
    }

var _pub = {
        share: function  (bdText,bdDesc,bdUrl,bdPic) {//分享函数
                  //分享弹出层html
                  var shtml = "<div id='share_bg'></div><div class='bdsharebuttonbox' data-tag='share_1' id='share'><div class='bdshare'>\
                        <div class='share_mid'><a class='bds_qzone share_img' data-cmd='qzone'></a>\
                        <a class='bds_tsina share_img' data-cmd='tsina'></a>\
                        <a class='bds_sqq share_img' data-cmd='sqq'></a>\
                        <a class='bds_renren share_img' data-cmd='renren'></a>\
                        <a class='bds_weixin share_img' data-cmd='weixin'></a>\
                        <a class='bds_copy share_img' data-cmd='copy'></a></div></div>\
                        </div><button id='share_delete'>取消</button>";
                    //加载
                     $("body").append('<div id="share_box">'+shtml+'</div>')//插入分享弹层
                           if($('#share_script')){//删除多余变量
                                        $('#share_script').remove();
                                        delete _bd_share_config;
                                        delete _bd_share_is_recently_loaded;
                                        delete _bd_share_main;
                            }
                            window._bd_share_config = {//分享参数设置
                                        common : {//通用参数
                                                      bdText :bdText, //文章标题
                                                      bdDesc : bdDesc,  //文章描述
                                                      bdUrl :bdUrl, //文章url
                                                      bdPic : bdPic//文章图片
                                                       },
                                          share : [{
                                                    "bdSize" : 32//分享按钮尺寸
                                           }]
                                      }
                            //插入分享js
                            var script = document.createElement('script');
                                    script.src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5);
                                    script.id='share_script';
                                    document.body.appendChild(script);
                                    $("#share_bg").on("click",function () {//点击分享遮罩删除分享弹层
                                            $("#share_box").remove();
                                    })
                                    $("#share_delete").on("click",function () {//点击取消按钮删除分享弹层
                                            $("#share_box").remove();
                                    })
                                    // $(".share_img").on("click",function () {//点击分享后删除分享弹层
                                    //         $("#share_box").remove();
                                    // })
                            var int = setInterval(delete_css,1);//删除多余css文件
                            function delete_css () {
                                    console.log(1)
                                    for(var i=0; i<$('link').length; i++){
                                        var cssUrl = $($('link')[i]).attr("href").substr(7,21);
                                        if(cssUrl=="bdimg.share.baidu.com"){
                                            $($('link')[i]).remove();
                                            clearInterval(int)
                                        }
                                    }
                             }
              }
    }
    module.exports = _pub;

