<section class="top_arc_wrap">
    {%foreach from=$head_pic_two item=article_item%}
    <a href="/arc/{%$article_item['article_id']%}" class="top_arc" style="" title="{%$article_item['title']%}"><img src="http://ldsnv6.qiniudn.com/{%$article_item['thumbnail']%}?imageView2/2/w/300/q/100" class="top_arcimg" alt="{%$article_item['title']%}" /><span class="title">{%$article_item['title']%}</span></a>
    {%/foreach%}
</section>
