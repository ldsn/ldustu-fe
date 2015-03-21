/**
* 评论js
* @author yuxuan
* @date 2015-02-08
* @version 1.0.0
*/
'use strict';
var api = require('ldsn-wap:widget/api/api.js');//引入分享组件
//私有方法
var _pri = {
    //UI元素集合
    node: {
        mod: $('section[node-type="module-header"]'),
        listMod: $('section[node-type="module-list"]')
    },
    bindUI: function () {
        _pri.node.listMod.delegate('.submit',"click",function () {//评论点击事件
              console.log(22222);
              if(!ldsn.user.id){
                  console.log("登录")
              }else{
                  var aid = $(this).attr("aid");
                  var comContent = $('input[aid="'+aid+'"]').val();
                  var setComment = {
                            aid : aid,
                            content : comContent
                  };
                  $.ajax({
                        url: api.setComment,
                        data: setComment,
                        type: "POST",
                        dataType: "json",
                        cache: false,
                        success: function(data){
                            console.log(data);
                        }
                  });
                  $('input[aid="'+aid+'"]').val(" ");
                  $(".article-comment").append('<li class="comment-item" comment-id="' + ldsn.user.id + '">'+
                                                                            '<img src="/static/ldsn-wap/lib/img/topic.png" alt="3" class="comment-topic">'+
                                                                            '<section class="comment-detail">'+
                                                                                '<section class="coment-info">'+
                                                                                      '<time class="comment-time">' + ldev.timeFormat(new Date().getTime()) + '</time>'+
                                                                                      '<section class="coment-user-info">3</section>'+
                                                                                '</section><section class="comment-content">' + comContent + '</section>'+
                                                                          '</section>'+
                                                                        '</li>')
              }
        });
    },
    util: {
    }        
}
var init = function () {
    _pri.bindUI();
}

init();
