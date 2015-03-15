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
              
        });
    },
    util: {
    }        
}

var init = function () {
    _pri.bindUI();
}

init();
