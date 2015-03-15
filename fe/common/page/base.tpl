<!DOCTYPE html>
{%html framework="common:static/lib/mod.js"%}
{%head%}
    <meta charset="utf-8"/>
    <title>{%block name="title"%}{%/block%}</title>

    {%* global css *%}
    {%require name="common:static/css/reset.css"%}
    {%require name="common:static/semantic/css/semantic.css"%}

    {%* global js *%}
    {%require name="common:static/mod.js"%}
    {%require name="common:static/ldev.js"%}
    {%block name="head"%}{%/block%}
{%/head%}
{%body%}
    {%block name="body"%}{%/block%}
{%/body%}
{%block name="else"%}{%/block%}

{%/html%}