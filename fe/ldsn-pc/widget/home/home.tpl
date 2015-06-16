<section class="module-home">
	{%if $is_me%}
		<a href="/info/{%$home_info['user_id']%}" class="go-info">查看我的资料</a>
	{%else if%}
		<a href="/info/{%$home_info['user_id']%}" class="go-info">查看Ta的资料</a>
	{%/if%}
	{%if $is_me%}
	<h2 class="section_bg section_bg">我发表的</h2>
	{%else%}
	<h2 class="section_bg section_bg">Ta发表的</h2>
	{%/if%}
	<ul class="mypost">
		{%foreach from=$articleList item=article%}
			<li><a href="/arc/{%$article['article_id']%}" target="_blank">{%$article['title']%}<span class="post-time">{%$article['create_time_string']|escape:none%}</span></a></li>
		{%/foreach%}
	</ul>
	{%if $is_me%}
	<h2 class="h2-comment section_bg">我的回复</h2>
	{%else%}
	<h2 class="h2-comment section_bg">Ta的回复</h2>
	{%/if%}
	<ul class="mycomment">
		{%foreach from=$comment item=comment_item%}
			<li><a href="/arc/{%$comment_item['article_id']%}" target="_blank">
				<h4>{%$comment_item['article_title']%}</h4>
				<span class="post-time">{%$comment_item['create_time_string']|escape:none%}</span>
				<p class="comment-content">{%$comment_item['content']%}</p>
			</a></li>
		{%/foreach%}
	</ul>

</section>