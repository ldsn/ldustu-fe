{%foreach from=$ad_header item=ad_item%}
	{%$ad_item['ad_content']|escape:none%}
{%/foreach%}