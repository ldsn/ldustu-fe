<article class="article_main">
	<header>
		<h1 class="title">{%$article['title']%}</h1>
		<section class="info">
			<section class="user_info">
				<a href="#" class="user_name_a">
					<img src="http://ldsnv6.qiniudn.com/{%$article['user_info']['head_pic']%}?imageView2/2/w/80/q/100" />
					<span class="user_name">
						{%$article['user_info']['username']%}
					</span>
				</a>
				<span class="create_time">
					{%$article['create_time_string']%}
				</span>
				<a class="column" href="/category/{%$article['column_id']%}">
					<i class="category icon"></i>
					{%$article['column_name']%}
				</a>
				<a class="thumb_num" href="javascript:;">
					<i class="thumbs up icon"></i><b>赞 ({%$article['favour_num']%})</b>
				</a>
                <a class="comment_num" href="#comment"><i class="edit icon"></i><b>评论 ({%$article['comment_num']%})</b>
                </a>
                <span class="view_num"><i class="unhide icon"></i><b>浏览 ({%$article['view_num']%})</b>
                </span>
			</section>
		</section>
	</header>
	<section class="arc_content">
		{%$article['detail']['content']%}
	</section>
</article>

{%script%}
	require("ldsn-pc:widget/article/article.js");
{%/script%}