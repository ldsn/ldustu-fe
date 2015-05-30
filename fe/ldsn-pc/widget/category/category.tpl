    <section class="top_arc_wrap">
        {%foreach from=$head_pic_two item=article_item%}
        <a href="/arc/{%$article_item['article_id']%}" class="top_arc" style="" title="{%$article_item['title']%}"><img src="http://ldsnv6.qiniudn.com/{%$article_item['thumbnail']%}?imageView2/2/w/300/q/100" class="top_arcimg" alt="{%$article_item['title']%}" /><span class="title">{%$article_item['title']%}</span></a>
        {%/foreach%}
    </section>
    <section class="today_update">
        <h2 class="today_tit"><span class="txt">最新文章</span></h2>
        <ul class="article_list" node-type="article-list">
            {%foreach from=$articleList item=article_item%}
                <li class="list">
                <a href="/arc/{%$article_item['article_id']%}" target="_blank" class="l_link">
                    <img src="http://ldsnv6.qiniudn.com/{%$article_item['thumbnail']%}?imageView2/2/w/200/q/100" alt="{%$article_item['title']%}" class="l_img" />
                </a>
                <div class="r_wrap">
                    <h3 class="arc_title"><a href="/arc/{%$article_item['article_id']%}" target="_blank" class="arc_link">{%$article_item['title']%}</a></h3>
                    <div class="arc_info">
                        <div class="user_info">
                            <a href="#">
                                <img src="http://ldsnv6.qiniudn.com/{%$article_item['user_info']['head_pic']%}?imageView2/2/w/80/q/100" />
                                <span class="user_name">
                                    {%$article_item['user_info']['username']%}
                                </span>
                            </a>
                        </div>
                        <span class="up_time"><i class="refresh icon"></i>{%$article_item['create_time_string']%}</span>
                        <span class="up_from"><i class="category icon"></i><b>{%$article_item['column_name']%}</b></span>
                    </div>
                    <p class="arc_description">{%$article_item['description']%}</p>
                    <div class="arc_read">
                        <span class="read_num"><i class="unhide icon"></i><b>围观{%$article_item['view_num']%}次</b></span>
                        <span class="thumb_num"><i class="thumbs up icon"></i><b>赞 ({%$article_item['favour_num']%})</b></span>
                        <a class="comment_num" href="/arc/{%$article_item['article_id']%}"><i class="edit icon"></i><b>评论 ({%$article_item['comment_num']%})</b></a>
                    </div>
                </div>
            </li>
            {%/foreach%}
        </ul>
    </section>
