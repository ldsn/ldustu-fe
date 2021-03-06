    <section class="today_update">
        <h2 class="today_tit"><span class="txt section_bg">最新文章</span></h2>
        <ul class="article_list" node-type="article-list">
            {%foreach from=$articleList item=article_item%}
                <li class="list" node-type="article-model" data-id="{%$article_item['article_id']%}">
                <a href="/arc/{%$article_item['article_id']%}" target="_blank" class="l_link">
                    {%if ($article_item['thumbnail'])%}
                        <img src="http://ldsnv6.qiniudn.com/{%$article_item['thumbnail']%}?imageView2/1/w/200/q/100" alt="{%$article_item['title']%}" class="l_img" />
                    {%/if%}
                </a>
                <div class="r_wrap">
                    <h3 class="arc_title"><a href="/arc/{%$article_item['article_id']%}" target="_blank" class="arc_link">{%$article_item['title']%}</a></h3>
                    <div class="arc_info">
                        <div class="user_info">
                            <a href="/home/{%$article_item['user_info']['user_id']%}">
                                <img src="http://ldsnv6.qiniudn.com/{%$article_item['user_info']['head_pic']%}?imageView2/2/w/80/q/100" />
                                <span class="user_name">
                                    {%$article_item['user_info']['username']%}
                                </span>
                            </a>
                        </div>
                        <span class="up_time"><i class="refresh icon"></i>{%$article_item['create_time_string']|escape:none%}</span>
                        <a class="up_from" href="/category/{%$article_item['column_id']%}"><i class="category icon"></i><b>{%$article_item['column_name']%}</b></a>
                    </div>
                    <p class="arc_description">{%$article_item['description']%}</p>
                    <div class="arc_read">
                        <span class="read_num"><i class="unhide icon"></i><b>围观{%$article_item['view_num']%}次</b></span>
                        <span class="thumb_num" node-type="favour-article" data-id="{%$article_item['article_id']%}"><i class="thumbs up icon"></i><b>
                            {%if ($article_item['favour_info'])%}
                            已赞 ({%$article_item['favour_num']%})
                            {%else if%}
                            赞 ({%$article_item['favour_num']%})
                            {%/if%}
                        </b></span>
                        <a class="comment_num" href="/arc/{%$article_item['article_id']%}#comment" target="_blank"><i class="edit icon"></i><b>评论 ({%$article_item['comment_num']%})</b></a>
                    </div>
                </div>
                {%if ($level_status > 0)%}
                <div class="arc_manager">
                    <a href="javascript:;" class="modify" node-type="modify-article" data-id="{%$article_item['article_id']%}"><i class="edit icon"></i></a>
                    <a href="javascript:;" class="delete" node-type="delete-article" data-id="{%$article_item['article_id']%}"><i class="remove icon"></i></a>
                </div>
                {%/if%}
            </li>
            {%/foreach%}
        </ul>
        
        <a href="javascript:;" class="load-more" node-type="list-load-more" style="display: block;">获取更多文章</a>

    </section>
{%script%}
require('ldsn-pc:widget/list/list.js');
{%/script%}