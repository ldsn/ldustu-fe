<section class="module-update" node-type="module-update">
    <header>
        <h3>
            <span class="box">
                修改文章
            </span>
            <a class="close" node-type="update-close"><i class="remove icon"></i></a>
        </h3>
        <div class="info">
            <select name="column_id" id="updateColumn" class="column">
                {%foreach from=$column item=column_item%}
                <option value="{%$column_item['column_id']%}">{%$column_item['column_name']%}</option>
                {%/foreach%}
            </select>
            <div class="title">
                <input type="text" name="title" id="updateTitle" placeholder="文章标题" id="updateTitle"/>
            </div>
        </div>
    </header>
    <section class="articleContent">
        <script id="updateArticle" type="text/plain" style="width:970px;height:280px;margin-left:15px;"></script>
    </section>
    <footer>
        <a class="submit" href="javascript:;" node-type="update-submit">
            提交
        </a>
    </footer>
</section>
<script src="/static/common/ueditor/ueditor.config.js"></script>
<script src="/static/common/ueditor/ueditor.all.js"></script>
<script src="/static/common/ueditor/lang/zh-cn/zh-cn.js"></script>
{%script%}
    require('ldsn-pc:widget/update-article/update-article.js');
{%/script%}