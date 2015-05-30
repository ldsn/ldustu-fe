<section class="LD_aside">
{%if $user_info %}
<div class="user_info">
    <img src="http://ldsnv6.qiniudn.com/userUpload/1426954345687.jpg?imageView2/2/w/80/q/100" class="head-pic">
    <a class="user-center" href="#">个人中心</a>
    <a class="username" href="#">{%$user_info['username']%}</a>
</div>
{%else if%}
<div class="login-register">
    <a class="register" href="javascript:;">注册</a>
    <a class="login" href="javascript:;">登录</a>
</div>
{%/if%}
    <!-- <div class="search_wrap">
        <input type="text" placeholder="请输入关键词" />
        <a href="#" class="search_btn"></a>
    </div> -->

    {%foreach from=$ad_aside item=ad_item%}
    <div class="aside_ad">
        {%$ad_item['ad_content']%}
    </div>
    {%/foreach%}
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