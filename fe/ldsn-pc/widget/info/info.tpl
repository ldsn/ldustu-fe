<section class="module-info">
    {%if $is_me%}
        <h2><span>个人信息设置<span></h2>
        <div class="set-info">
            <div class="set-item">
                <span>用户名：</span>
                <div class="input-box">
                    <input id="username" class="input" type="text" value="{%$user_info['username']%}"/>
                </div>
            </div>
            <div class="set-item">
                <span>密码：</span>
                <div class="input-box">
                    <input id="password" class="input" type="password" placeholder="不修改请不用填写"/>
                </div>
            </div>
            <div class="set-item">
                <span>QQ：</span>
                <div class="input-box">
                    <input id="qq" class="input" type="text" value="{%$user_info['qq']%}"/>
                </div>
            </div>
            <div class="set-item">
                <span>手机：</span>
                <div class="input-box">
                    <input id="telphone" class="input" type="text" value="{%$user_info['telphone']%}"/>
                </div>
            </div>
            <div class="set-item">
                <span>邮箱：</span>
                <div class="input-box">
                    <input id="email" class="input" type="text" value="{%$user_info['email']%}"/>
                </div>
            </div>

            <div class="set-head-pic">
                <span>头像：</span>
                <div class="input-box">
                    <img src="http://ldsnv6.qiniudn.com/{%$user_info['head_pic']%}?imageView2/2/w/200/q/100" class="head-pic" id="headPicImg" />
                    <input  type="hidden" value="{%$user_info['head_pic']%}" id="headPic"/>
                    <a href="javascript:;" class="change-head-pic" id="changeHead">更换头像</a>
                </div>
            </div>
            <a href="javascript:;" class="save" node-type="info-update-save">保存</a>
        </div>
        <a href="javascript:;" class="logout" node-type="logout">退出账号</a>
    {%else if%}
        <h2>
            <span>{%$home_info['username']%} 的信息
            </span>
        </h2>
        <div class="user-info">
            抱歉，目前用户策略还在策划中，敬请期待~小e在这里给大家请罪啦！<br/>
            看看他的<a href="/home/{%$home_info['user_id']%}">动态</a>吧！
        </div>
    {%/if%}
</section>

{%script%}
    {%if isset($is_me)%}
    ldsn.isMe = {%$is_me%};
    {%/if%}
    require('ldsn-pc:widget/info/info.js');
{%/script%}