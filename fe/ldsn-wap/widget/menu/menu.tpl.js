var tmpl = [
    '<header class="user-info" node-type="user-info">',
        '<img src="http://ldsnv6.qiniudn.com/<%=head_pic%>?imageView2/2/w/100/q/50" alt="" class="user-topic">',
        '<section class="user-info-text">',
            '<h4 class="user-name"><%=username%></h4>',
            '<section class="user-handle">',
                '<span>分享 </span>',
                '<span><%=article_num%></span>',
                '<span class="fav-num">人气 </span>',
                '<span><%=favour_num%></span>',
            '</section>',
        '</section>',
    '</header>'
]

module.exports = tmpl;