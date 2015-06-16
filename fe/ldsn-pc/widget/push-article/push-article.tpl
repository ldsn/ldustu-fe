    <section class="content_box">
        <ul class="head_article">  
            {%foreach from=$head_article item=article_item%}
            <li>
                <a href="/arc/{%$article_item['article_id']%}" target="_blank" title="{%$article_item['title']%}">{%$article_item['title']%}</a>
            </li>
            {%/foreach%}
        </ul>
    </section>
