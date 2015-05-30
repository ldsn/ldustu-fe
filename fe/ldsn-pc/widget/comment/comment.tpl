<section class="article-comment" id="comment">
<ul class="comment-ul">
{%foreach from=$article['comment_list'] item=comment_item%}
<li>
    <section class="user_info">
        <a href="#" class="user_name_a">
            <img src="http://ldsnv6.qiniudn.com/{%$comment_item['user_info']['head_pic']%}?imageView2/2/w/80/q/100">
            <span class="user_name">
                {%$comment_item['user_info']['username']%}
            </span>
        </a>
        <span class="create_time">
                {%$comment_item['create_time_string']%}
        </span>
    </section>
    <section class="comment_content">
         {%$comment_item['content']%}
    </section>
</li>
{%/foreach%}
</ul>
<section class="edit-comment">
    <textarea class="comment-textarea"></textarea>
    <a href="javascript:;" class="comment-submit">提交</a>
</section>
</section>


{%var_dump($article['comment_list'][0])%}