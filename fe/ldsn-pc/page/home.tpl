{%extends file="ldsn-pc/page/layout/layout1.tpl"%}
{%block name="title"%}
{%$home_info['username']%}的个人主页-鲁大学生网，人人都是自媒体
{%/block%}
{%block name="head-content"%}
<meta name="keywords" content="鲁东大学,鲁大学生网,{%$home_info['username']%}" />
<meta name="description" content="鲁大学生网，{%$home_info['username']%}的个人主页。" />
{%require name="ldsn-pc:static/lib/js/jquery-1.10.1.js"%}
{%require name="ldsn-pc:static/lib/css/common.css"%}
{%require name="ldsn-pc:static/lib/css/list.css"%}

{%/block%}
{%block name="nav-module"%}
{%widget name="ldsn-pc:widget/nav/nav.tpl"%}
{%/block%}
{%block name="article-module"%}
<section class="LD_article">
{%widget name="ldsn-pc:widget/top-ad/top-ad.tpl"%}
{%widget name="ldsn-pc:widget/home/home.tpl"%}
</section>
{%/block%}
{%block name="aside-module"%}
{%widget name="ldsn-pc:widget/aside/aside.tpl"%}
{%/block%}
