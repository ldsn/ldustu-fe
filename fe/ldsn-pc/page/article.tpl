{%extends file="ldsn-pc/page/layout/layout1.tpl"%}
{%block name="title"%}
{%$article['title']%}-鲁大学生网，人人都是自媒体
{%/block%}
{%block name="head-content"%}
{%require name="ldsn-pc:static/lib/css/common.css"%}
{%require name="ldsn-pc:static/lib/css/list.css"%}
<meta name="description" content="{%$article['description']%}" />
{%/block%}
{%block name="nav-module"%}
{%widget name="ldsn-pc:widget/nav/nav.tpl"%}
{%/block%}
{%block name="article-module"%}
<section class="LD_article">
{%widget name="ldsn-pc:widget/top-ad/top-ad.tpl"%}
{%widget name="ldsn-pc:widget/article/article.tpl"%}
{%widget name="ldsn-pc:widget/comment/comment.tpl"%}
</section>
{%/block%}
{%block name="aside-module"%}
{%widget name="ldsn-pc:widget/aside/aside.tpl"%}
{%/block%}