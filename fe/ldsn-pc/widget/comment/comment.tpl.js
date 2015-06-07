var tmpl = [
	'<li>',
        '<section class="user_info">',
            '<a href="#" class="user_name_a">',
                '<img src="' + ldev.context.IMG_DOMAIN + '<%=head_pic%>' + ldev.context.IMG_100_50 + '">',
                '<span class="user_name">',
                    '<%=username%>',
                '</span>',
            '</a>',
            '<span class="create_time">',
                    '<%=time%>',
            '</span>',
        '</section>',
        '<section class="comment_content">',
             '<%=content%>',
        '</section>',
    '</li>'
];

module.exports = tmpl;