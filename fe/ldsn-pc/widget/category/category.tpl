<section class="LD_article">
    <a class="ad1" href="#" title="#"><img src="/static/common/images/_temp/qidianxueyuan.jpg" class="ad_img" /></a>
    <section class="top_arc_wrap">
        <a href="#" class="top_arc" style="margin-left:0px;"><img src="/static/common/images/_temp/jd0311.jpg" class="top_arcimg" /><span class="title">鲁大学生网新版上线</span></a>
        <a href="#" class="top_arc"><img src="/static/common/images/_temp/jd0311.jpg" class="top_arcimg" /><span class="title">鲁大学生网新版上线</span></a>
    </section>
    <section class="today_update">
        <h2 class="today_tit"><span class="txt">最新文章</span></h2>
        <ul class="today_list">
            {%foreach from=$articleList item=article_item%}
                <li class="list">
                <a href="/arc/{%$article_item['article_id']%}" target="_blank" class="l_link">
                    <img src="http://ldsnv6.qiniudn.com/{%$article_item['thumbnail']%}?imageView2/2/w/200/q/100" alt="{%$article_item['title']%}" class="l_img" />
                </a>
                <div class="r_wrap">
                    <h3 class="arc_title"><a href="/arc/{%$article_item['article_id']%}" target="_blank" class="arc_link">{%$article_item['title']%}</a></h3>
                    <div class="arc_info">
                        <span class="up_time"><i class="icon_uptime"></i>{%$article_item['create_time_string']%}</span>
                        <span class="up_from"><i class="icon_upfrom"></i><b>{%$article_item['column_name']%}</b></span>
                    </div>
                    <p class="arc_description">{%$article_item['description']%}</p>
                    <div class="arc_read">
                        <span class="read_num"><i class="icon_read"></i><b>围观{%$article_item['view_num']%}次</b></span>
                    </div>
                </div>
            </li>
            {%/foreach%}
        </ul>
    </section>
</section>