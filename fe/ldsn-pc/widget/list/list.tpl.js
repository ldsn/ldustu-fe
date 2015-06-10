var tmpl = [
        '<li class="list" node-type="article-model" data-id="<%=article_id%>">',
            '<a href="/arc/<%=article_id%>" target="_blank" class="l_link">',
                '<%if (thumbnail) {%>',
                    '<img src="http://ldsnv6.qiniudn.com/<%=thumbnail%>?imageView2/2/w/200/q/100" alt="<%=title%>" class="l_img" />',
                    '<%}%>',
                // '<%}else{%>',
                //     '<img src="/static/common/images/no_pic.jpg" alt="<%=title%>" class="l_img" />',
                // '<%}%>',
            '</a>',
            '<div class="r_wrap">',
                '<h3 class="arc_title"><a href="/arc/<%=article_id%>" target="_blank" class="arc_link"><%=title%></a></h3>',
                '<div class="arc_info">',
                    '<div class="user_info">',
                        '<a href="/home/<%=user_info.user_id%>">',
                            '<img src="http://ldsnv6.qiniudn.com/<%=user_info.head_pic%>?imageView2/2/w/80/q/100" />',
                            '<span class="user_name">',
                                '<%=user_info.username%>',
                            '</span>',
                        '</a>',
                    '</div>',
                    '<span class="up_time"><i class="refresh icon"></i><%=ldev.timeFormat(create_time)%></span>',
                    '<a class="up_from" href="/category/<%=column_id%>"><i class="category icon"></i><b><%=column_name%></b></a>',
                '</div>',
                '<p class="arc_description"><%=description%></p>',
                '<div class="arc_read">',
                    '<span class="read_num"><i class="unhide icon"></i><b>围观<%=view_num%>次</b></span>',
                    '<span class="thumb_num" node-type="favour-article" data-id="<%=article_id%>"><i class="thumbs up icon"></i><b>',
                        '<%if (favour_info) {%>',
                        '已赞 (<%=favour_num%>)',
                        '<%}else{%>',
                        '赞 (<%=favour_num%>)',
                        '<%}%>',
                    '</b></span>',
                    '<a class="comment_num" href="/arc/<%=article_id%>" target="_blank"><i class="edit icon"></i><b>评论 (<%=comment_num%>)</b></a>',
                '</div>',
            '</div>',
            '<%if (' + ldsn.user.level_status + ' > 0) {%>',
            '<div class="arc_manager">',
                '<a href="javascript:;" class="modify" node-type="modify-article" data-id="<%=article_id%>"><i class="edit icon"></i></a>',
                '<a href="javascript:;" class="delete" node-type="delete-article" data-id="<%=article_id%>"><i class="remove icon"></i></a>',
            '</div>',
            '<%}%>',
        '</li>'
];
module.exports = tmpl;