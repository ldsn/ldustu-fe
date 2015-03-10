<section node-type="module-edit-article" class="module-edit-article">
	<section class="edit-article">
		<section class="input">
			<input type="text" name="textTitle" class="textTitle" placeholder="添加标题" />
		</section>
		<section class="upload">
			<i class="photo icon" id="upload-img"></i>
		</section>
		<div id="editor" class="editor" name="textContent" contenteditable="true">
		</div>
		<click node-type="edit-reset">取消</click>
		<click node-type="edit-submit">保存</click>
	</section>
</section>
{%script%}
	require("ldsn-wap:widget/edit-article/edit-article.js");
{%/script%}