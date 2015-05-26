<section class="LD_aside">
	<div class="search_wrap">
		<input type="text" placeholder="请输入关键词" />
		<a href="#" class="search_btn"></a>
	</div>
	<div class="aside_ad">
		<a href="#" class="ad1_link"><img src="/static/common/images/_temp/zhaopins.jpg" alt="#" class="ad_img"></a>
	</div>
	<div class="aside_ad">
		<a href="#" class="ad1_link"><img src="/static/common/images/_temp/zhaopins.jpg" alt="#" class="ad_img"></a>
	</div>
	<div class="hot_arc">
		<h4 class="title">热门文章</h4>
		<ul class="arc_list">
			{%foreach from=$hotList item=hotList_item%}
			<li class="list">
				<a href="/arc/{%$hotList_item['article_id']%}" title="{%$hotList_item['title']%}" target="_blank" class="arc_link">{%$hotList_item['title']%}</a>
			</li>
			{%/foreach%}

		</ul>
	</div>
</section>
{%script%}
	require("ldsn-pc:widget/aside/aside.js");
{%/script%}