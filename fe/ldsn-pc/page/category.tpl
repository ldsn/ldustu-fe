{%extends file="ldsn-pc/page/layout/layout1.tpl"%}
{%block name="head-content"%}
{%require name="ldsn-pc:static/lib/js/jquery-1.10.1.js"%}
{%require name="ldsn-pc:static/lib/css/common.css"%}
{%require name="ldsn-pc:static/lib/css/list.css"%}
{%/block%}
{%block name="nav-module"%}
{%widget name="ldsn-pc:widget/nav/nav.tpl"%}
{%/block%}
{%block name="article-module"%}
{%widget name="ldsn-pc:widget/category/category.tpl"%}
{%/block%}
{%block name="aside-module"%}
{%widget name="ldsn-pc:widget/aside/aside.tpl"%}
{%/block%}
