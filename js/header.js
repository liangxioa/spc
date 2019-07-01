var html = `<a class="logo" href="index.html"><img src="./img/logo.png" alt="" /></a>
<ul>
  <li><a href="index.html">工作台</a></li>
  <!-- <li><a href="">广场</a></li> -->
  <li><a href="help.html">使用介绍</a></li>
  <li id="usercenter"></li>
</ul>`;

document.getElementById("header").innerHTML = html;

if(isLogin()){
  document.getElementById("usercenter").innerHTML = '<a href="usercenter.html">我的</a>';
}else{
  document.getElementById("usercenter").innerHTML = '<a href="login.html">登录</a>';
}