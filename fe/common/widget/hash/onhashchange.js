/**
 * 检测hash改变
 * @author fanmingfei
 * @date 2015-02-08
 * @version 1.0.0
 */

var hash = require('common:widget/hash/hash.js');

var _pri = {
    hashStringKey: {},
    keyHistory: {},

    util: {
        doHashEent: function (key, val) {
            _pri.hashStringKey[key].forEach(function (k) {
                k(val);
            });
        },
        pushHashEvent: function (key, func) {
            _pri.hashStringKey[key] = _pri.hashStringKey[key] || [];
            if (typeof func === 'function') {
                _pri.hashStringKey[key].push(func);
            }
        },
        changeEvent: function () {
            var key, val;
            for (key in _pri.hashStringKey) {
                if (_pri.hashStringKey.hasOwnProperty(key)) {
                    val = hash(key)
                    if (val !== _pri.keyHistory[key]) {
                        _pri.keyHistory[key] = val;
                        _pri.util.doHashEent(key, val);
                    }
                }
            }
        },
        changeCheck: function () {
            var fnDelay = 100,
                oldHash = window.location.hash;

            //判断是否支持hashchange事件
            if(typeof window.onhashchange === 'object'  || typeof window.onhashchange === 'undefined'){
                window.setInterval(function(){
                    newhash = window.location.hash;
                    if(newhash !== oldHash){
                        _pri.util.changeEvent();
                        oldHash = newhash;
                    }
                }, fnDelay);
            }else{
                window.onhashchange = _pri.util.changeEvent();
            }
        }
    }
};

    _pri.util.changeCheck();


module.exports = _pri.util.pushHashEvent;
