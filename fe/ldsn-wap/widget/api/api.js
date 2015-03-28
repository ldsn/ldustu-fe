/**
 * 存放api
 * @author fanmingfei
 * @date 2015-02-08
 * @version 1.0.0
 */

var api = {
    getArcList: '/article/getlist',
    getComment: '/comment/getComment',
    checkOpenId: '/login/auth',
    login: '/login/auth',
    register: '/register/save',
    logout: '/login/logout',
    publishArc: '/article/publish',
    favour: '/public/favour',
    addComment: '/comment/add',
    getArticle: '/article/show'
};

module.exports = api;