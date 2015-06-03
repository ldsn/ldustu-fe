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
    <a href="javascript:;" class="load-more" node-type="comment-load-more">加载更多</a>
    <section class="edit-comment">
        <textarea class="comment-textarea"></textarea>
        <a href="javascript:;" class="comment-submit" node-type="article-comment-submit" data-id="{%$article['article_id']%}">提交</a>
    </section>
</section>


{%script%}
    require("ldsn-pc:widget/comment/comment.js");
{%/script%}