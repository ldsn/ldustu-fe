<section class="LD_aside">
{%if $user_info %}
<div class="user_info">
    <a href="/home/{%$user_info['user_id']%}"><img src="http://ldsnv6.qiniudn.com/{%$user_info['head_pic']%}?imageView2/2/w/80/q/100" class="head-pic"></a>
    <a class="user-center" href="/publish">发表文章</a>
    <a class="username" href="/home/{%$user_info['user_id']%}">{%$user_info['username']%}</a>
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
        {%$ad_item['ad_content']|escape:none%}
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

<section class="module-share">
<div class="bdsharebuttonbox">
    <a href="#" class="bds_more" data-cmd="more"></a><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a><a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
</div>
</section>
<script>window._bd_share_config={"common":{"bdSnsKey":{"tqq":"101199587"},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"32"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>
</section>

{%script%}
    require("ldsn-pc:widget/aside/aside.js");
    require('ldsn-pc:widget/login/login.js');
{%/script%}