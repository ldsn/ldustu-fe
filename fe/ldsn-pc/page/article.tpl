{%extends file="ldsn-pc/page/layout/layout1.tpl"%}
{%block name="title"%}
{%$article['title']%}-鲁大学生网，人人都是自媒体
{%/block%}
{%block name="head-content"%}
{%require name="ldsn-pc:static/lib/css/common.css"%}
{%require name="ldsn-pc:static/lib/css/list.css"%}
{%if $level_status > 0%}
<script src="/static/common/plupload/plupload.js"></script>
{%/if%}
<meta name="keywords" content="鲁东大学,鲁大学生网,{%$article['title']%}" />
<meta name="description" content="{%$article['description']%}" />
{%script%}
    window.article = {};
    article.commentNum = {%$article['comment_num']%}
    article.favourNum = {%$article['favour_num']%}
    article.id = {%$article['article_id']%}
{%/script%}
{%/block%}
{%block name="nav-module"%}
{%widget name="ldsn-pc:widget/nav/nav.tpl"%}
{%/block%}
{%block name="article-module"%}
<section class="LD_article">
{%widget name="ldsn-pc:widget/top-ad/top-ad.tpl"%}

{%if $article['status'] == 1%}
    {%widget name="ldsn-pc:widget/article/article.tpl"%}
    {%widget name="ldsn-pc:widget/comment/comment.tpl"%}
{%else if $article['status'] !=1  && $level_status > 0%}
    {%widget name="ldsn-pc:widget/article/article.tpl"%}
    {%widget name="ldsn-pc:widget/comment/comment.tpl"%}
{%else%}
    {%widget name="ldsn-pc:widget/404/404.tpl"%}
{%/if%}

{%if ($level_status > 0)%}
    {%widget name="ldsn-pc:widget/update-article/update-article.tpl"%}
{%/if%}
</section>
{%/block%}
{%block name="aside-module"%}
{%widget name="ldsn-pc:widget/aside/aside.tpl"%}
{%/block%}
