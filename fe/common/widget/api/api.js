/**
 * 存放api
 * @author fanmingfei
 * @date 2015-02-08
 * @version 1.0.0
 */
var path = '/api';
var api = {
    getArcList: path + '/article/getlist',
    checkOpenId: path + '/login/auth',
    login: path + '/login/auth',
    register: path + '/register/save',
    logout: path + '/login/logout',
    publishArc: path + '/article/publish',
    favour: path + '/public/favour',
    addComment: path + '/comment/add',
    getArticle: path + '/article/showArticle',
    getMoreComment: path + '/comment/getComments',
    removeArticle: path + '/article/remove',
    updateArticle: path + '/article/update_article',
    updateInfo: path + '/user/up_info',
    removeComment: path + '/comment/del',
    logout: path + '/login/logout'
}

module.exports = api;