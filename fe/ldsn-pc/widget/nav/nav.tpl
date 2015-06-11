<section class="LD_nav">
    <div class="nav_wrap">
        <a class="logo" href="/"><img class="logo_img" src="/static/common/images/common/logo.png" alt="鲁大学生网" /></a>
        <ul class="nav_list">
            <li class="list {%if $column_id == 0%}cursor{%/if%}" node-type="nav_list" data-id="0">
                <a class="category" href="/">首页</a>
            </li>
            {%foreach from=$column item=column_item%}
                <li class="list {%if $column_id == $column_item['column_id']%}cursor{%/if%}" node-type="nav_list" data-id="{%$column_item['column_id']%}">
                    <a class="category" href="/category/{%$column_item['column_id']%}">{%$column_item['column_name']%}</a>
                </li>
            {%/foreach%}
        </ul>
    </div>
</section>