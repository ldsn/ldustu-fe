{%extends file="ldsn-pc/page/layout/layout1.tpl"%}
{%block name="title"%}
{%$current_column%}-鲁大学生网，人人都是自媒体
{%/block%}
{%block name="head-content"%}
<meta name="keywords" content="鲁东大学,鲁大学生网,{%$current_column%}" />
<meta name="description" content="鲁大学生网是鲁东大学校内最大的社交媒体平台，集社交与媒体为一身，为鲁大学子提供一个交流、学习、发展自身能力的平台！网站秉承着人人都是自媒体的理念，在这里，每个鲁大学子都是自媒体。" />
{%require name="ldsn-pc:static/lib/css/common.css"%}
{%require name="ldsn-pc:static/lib/css/list.css"%}
{%if $level_status > 0%}
<script src="/static/common/plupload/plupload.js"></script>
{%/if%}
{%/block%}
{%block name="nav-module"%}
{%widget name="ldsn-pc:widget/nav/nav.tpl"%}
{%/block%}
{%block name="article-module"%}
<section class="LD_article">
{%widget name="ldsn-pc:widget/top-ad/top-ad.tpl"%}
{%widget name="ldsn-pc:widget/push-image/push-image.tpl"%}
{%widget name="ldsn-pc:widget/list/list.tpl"%}

{%if ($level_status > 0)%}
	{%widget name="ldsn-pc:widget/update-article/update-article.tpl"%}
{%/if%}
</section>
{%/block%}
{%block name="aside-module"%}
{%widget name="ldsn-pc:widget/aside/aside.tpl"%}
{%/block%}