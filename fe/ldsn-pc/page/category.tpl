{%extends file="ldsn-pc/page/layout/layout1.tpl"%}
{%block name="title"%}
{%$current_column%}-鲁大学生网，人人都是自媒体
{%/block%}
{%block name="head-content"%}
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