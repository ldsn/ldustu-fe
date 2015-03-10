/**
     * 文章发布js
     * @author yuxuan
     * @date 2015-02-08
     * @version 1.0.0
     */
 
'use strict';
//私有方法
var _pri = {
    //UI元素集合
    node: {
        mod: $('section[node-type="ldsn-edit-article"]'),
        editModule: $('section[node-type="module-edit-article"]'),
        editReset:$('div[node-type="edit-reset"]'),
        editSubmit:$('div[node-type="edit-submit"]'),
        editClick: $('click[node-type="right-click"]')
    },
    //绑定元素事件
    bindUI: function () {
        _pri.node.editReset.on("click",function(){
            _pri.node.editModule.css("display","none")
        });
        _pri.node.editSubmit.on("click",function(){
            _pri.util.articleRelease();
        });
        _pri.node.editClick.on("click",_pri.util.editClick);
    },
    util: {
        articleRelease:function(){
            var articleTitle = $(".textTitle").val();
            var articleContent = $("#editor").html();
            if(articleTitle==""){
                alert("请填写文章标题!");
            }else if(articleContent==""){
                alert("请填写文章内容!")
            }else{
                if(articleContent.indexOf("<img") >= 0){
                    var imgSrc = $("#editor").find("img")[0].src;
                    console.log([articleTitle,articleContent,imgSrc])
                }else{
                    console.log([articleTitle,articleContent])
                }
            }
            $.ajax({
                dataType:'json',
                data:'id=10',
                jsonp:'callback',
                url:'http://www.ldustu.com/',
                success:function(){
                
                },
            });
        },
        show: function () {
            _pri.node.editModule.addClass('show');
        },
        hide: function () {
            _pri.node.editModule.removeClass('show');
        },
        editClick:function(){
            _pri.util.show();
            window.checkPlupload = false;
            var script = document.createElement("script");
            script.src="/static/common/plupload/plupload.min.js";
            script.type="text/javascript";
            document.body.appendChild(script);
            window.setInterval(function () {
                if(window.checkPlupload) {
                    require("ldsn-wap:widget/upload-image/upload-image.js");
                }
            },40);
            //ldev.hash('page','editor');
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