{%extends file="common/page/base.tpl"%}
{%block name="title"%}
{%/block%}
{%block name="head"%}
{%script%}
	window.ldsn = {};
	{%if isset($column_id)%}
		ldsn.column_id = {%$column_id%};
	{%/if%}
{%/script%}
{%block name="head-content"%}
{%/block%}
{%/block%}
{%block name="body"%}
<section class="LD_wrap">
	{%block name="nav-module"%}
	{%/block%}
	<section class="content">
	{%block name="article-module"%}
	{%/block%}
	{%block name="aside-module"%}
	{%/block%}
	</section>
</section>
{%/block%}
