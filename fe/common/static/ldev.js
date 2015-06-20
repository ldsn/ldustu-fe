/**
 * ldev库，装饰各种方法
 * @author fanmingfei
 * @date 2015-02-08
 * @version 1.0.0
 */

(function () {
    //TMPL修改须谨慎，使用baidu.template，有所修改
    var tmpl =  require('common:widget/tmpl/baidu.template.js');
    var hash = require('common:widget/hash/hash.js');
    var message = require('common:widget/message/message.js');
    var errorMessage = require('common:widget/error-message/error-message.js');
    var onhashchange = require('common:widget/hash/onhashchange.js');
    var timeFormat = function (param) {
        if (!param) {
            return;
        }
        var cur = new Date(),
            curYear = cur.getFullYear(),
            curMonth = cur.getMonth(),
            curDay = cur.getDate(),
            curHours = cur.getHours(),
            curMinutes = cur.getMinutes(),
            curSeconds = cur.getSeconds();

        if(param.toString().length == 10) {
            var time = new Date(param * 1000);
        } else if (param.toString().length == 13) {
            var time = new Date(param);
        } else {
            return;
        }
        var timeYear = time.getFullYear(),
            timeMonth = time.getMonth() + 1,
            timeDay = time.getDate(),
            timeHours = time.getHours() > 9 ? time.getHours() : '0' + time.getHours(),
            timeMinutes = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes();
        var date;
        if(curYear != timeYear) {
            date = timeYear + '年'
                 + timeMonth + '月' 
                 + timeDay + '日 ' 
                 + timeHours + ':'
                 + timeMinutes + ':'
        } else if (curMonth != timeMonth || curDay != timeDay) {
            date = timeMonth + '月' 
                 + timeDay + '日 ' 
                 + timeHours + ':'
                 + timeMinutes;
        } else {
            date = timeHours + ':'
                 + timeMinutes
        }
        return date;
    };

    var context = {
        IMG_DOMAIN: 'http://ldsnv6.qiniudn.com/',
        IMG_400_20: '?imageView2/2/w/400/q/20',
        IMG_400_50: '?imageView2/2/w/400/q/20',
        IMG__50: '?imageView2/2/q/50',
        IMG_100_50: '?imageView2/2/w/100/q/50',
        IMG_200_100: '?imageView2/2/w/200/q/100'
    }

    var ldev = {
        tmpl: tmpl,
        hash: hash,
        message: message,
        timeFormat: timeFormat,
        context: context,
        bindHash: onhashchange
    };

    window.ldev = ldev;
})();