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
    var timeFormat = function (param) {
        if (!param) {
            return;
        }
        var cur = new Date(),
            curYear = cur.getFullYear(),
            curMonth = cur.getMonth(),
            curDay = cur.getDay(),
            curHours = cur.getHours(),
            curMinutes = cur.getMinutes(),
            curSeconds = cur.getSeconds();

        var time = new Date(param * 1000),
            timeYear = time.getFullYear(),
            timeMonth = time.getMonth(),
            timeDay = time.getDay(),
            timeHours = time.getHours(),
            timeMinutes = time.getMinutes(),
            timeSeconds = time.getSeconds();
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
                 + timeMinutes + ':'
                 + timeSeconds;
        }
        return date;
    };

    var ldev = {
        tmpl: tmpl,
        hash: hash,
        message: message,
        errorMessage: errorMessage,
        timeFormat: timeFormat
    };

    window.ldev = ldev;
})();