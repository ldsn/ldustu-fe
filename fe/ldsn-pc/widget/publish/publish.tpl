<section class="module-publish" node-type="module-publish">
    <header>
        <h3>
            <span class="box">
                发布文章
            </span>
        </h3>
        <div class="info">
            <select name="column_id" id="publishColumn" class="column">
                <option value="">选择栏目</option>
                {%foreach from=$column item=column_item%}
                <option value="{%$column_item['column_id']%}">{%$column_item['column_name']%}</option>
                {%/foreach%}
            </select>
            <div class="title">
                <input type="text" name="title" id="publishTitle" placeholder="文章标题" id="publishTitle"/>
            </div>
        </div>
    </header>
    <section class="articleContent">
        <script id="publishArticle" type="text/plain" style="width:630px;height:280px;margin-left:15px;"></script>
        <button id="upload-img" class="image-upload"></button>
    </section>
    <footer>
        <a class="submit" href="javascript:;" node-type="publish-submit">
            提交
        </a>
    </footer>
</section>
<script src="/static/common/ueditor/ueditor.config.js"></script>
<script src="/static/common/ueditor/ueditor.all.js"></script>
<script src="/static/common/ueditor/lang/zh-cn/zh-cn.js"></script>
<script src="/static/common/ueditor/uploadBtn.js"></script>
{%script%}
    require('ldsn-pc:widget/publish/publish.js');
{%/script%}