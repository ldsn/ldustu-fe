<section class="LD_aside">
{%if $user_info %}
<div class="user_info">
    <img src="http://ldsnv6.qiniudn.com/{%$user_info['head_pic']%}?imageView2/2/w/80/q/100" class="head-pic">
    <a class="user-center" href="/publish">发表文章</a>
    <a class="username" href="javascript:;">{%$user_info['username']%}</a>
</div>
{%else if%}
<div class="login-register">
    <!-- <a class="register" href="javascript:;" node-type="">注册</a> -->
    <a class="login" href="javascript:;" node-type="login">QQ登录</a>
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
    require('ldsn-pc:widget/login/login.js');
{%/script%}