{%extends file="common/page/base.tpl"%}
{%block name="title"%}
{%/block%}
{%block name="head"%}
{%require name="ldsn-pc:static/lib/js/jquery-1.10.1.js"%}
{%script%}
	(function () {
		var hash = location.hash;
		debugger
		if (hash.indexOf('article') > -1) {
			var start = hash.indexOf('article') + 8;
			var num = hash.substring(start);
			location.href = "/arc/" + num;
			return;
		}
		if (hash.indexOf('column') > -1) {
			var start = hash.indexOf('column') + 7;
			var num = hash.substring(start);
			location.href = "/category/" + num;
			return;
		}
	})();

	window.ldsn = {};
	{%if isset($column_id)%}
		ldsn.column_id = {%$column_id%};
	{%/if%}

    {%if $json_column%}
		ldsn.column = $.parseJSON('{%$json_column%}');
	{%else%}
		ldsn.column = '';
	{%/if%}
    {%if $json_user_info%}
		ldsn.user = $.parseJSON('{%$json_user_info%}');
		ldsn.loginStatus = true;
	{%else%}
		ldsn.user = '';
		ldsn.loginStatus = false;
	{%/if%}

{%/script%}
{%block name="head-content"%}
{%/block%}
{%/block%}
{%block name="body"%}
<section class="LD_wrap LD_container">
	{%block name="nav-module"%}
	{%/block%}
	<section class="content">
	{%block name="article-module"%}
	{%/block%}
	{%block name="aside-module"%}
	{%/block%}
	</section>
</section>
	{%widget name="ldsn-pc:widget/footer/footer.tpl"%}
	{%require name="ldsn-pc:static/lib/js/list.js"%}
{%/block%}
