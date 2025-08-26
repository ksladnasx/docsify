<!-- _coverpage.md -->

<!-- 内容层 -->
<div style="position:relative;z-index:2;text-align:center;padding:8% 0;color:#fff;font-family:'Poppins', sans-serif;">
  <!-- 头像与标题 -->   
  <img src="media/avatar.jpg" style="width:230px;height:230px;border-radius:50%;border:3px solid rgba(255,255,255,0.3);box-shadow:0 8px 25px rgba(0,0,0,0.2);">
  <h1 style="font-family:'Pacifico', cursive;font-size:3.5rem;margin:15px 0;text-shadow:0 2px 4px rgba(0,0,0,0.2);">曉&凾
</h1>
  <p style="font-size:1.3rem;letter-spacing:1px;opacity:0.9;" class="discription">   一只无所事事的Vue前端开发者 ✨</p>
  
  <!-- 动态标签 -->
  <div class="tag-cloud" style="margin:25px auto;max-width:600px;">
    <span class="tags">娱乐至上</span>
    <span class="tags">闲里偷忙</span>
    <span class="tags">百无聊赖</span>
  </div>
  
  <!-- 按钮组（添加动效） -->
  <div class="btn-group">
    <a href="https://github.com/ksladnasx" target="_blank" class="btn-github">
      <i class="fab fa-github"></i> GitHub主页
    </a>
    <!-- 注意这里href的写法，由于项目路由是hash格式的，所以使用相对路由的时候必须带上#/ -->
    <a href="#/zh-cn/docsify项目创建与部署" class="btn-docs">  
       📚 探索文档
    </a>
  </div>
  
  <!-- 动态箭头 -->
  <div class="scroll-hint">
    <i class="fas fa-chevron-down" ></i>
  </div>
</div>

<!-- 引入字体库 -->
<link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Poppins:wght@300;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

<!-- 自定义动效CSS -->
<style scoped>
  /* 按钮基础样式 */
  .btn-github, .btn-docs {
    display: inline-block;
    padding: 14px 35px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    margin: 0 12px;
    transition: all 0.4s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transform: translateY(0);
  }
  
  /* GitHub按钮（深色霓虹效果） */
  .btn-github {
    background: #24292e;
    /* color: white; */
    border: 2px solid #4a5568;
  }
  .btn-github:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(36,41,46,0.4);
    background: linear-gradient(45deg, #4a4f58ff, #24292e);
  }
  
  /* 文档按钮（流光效果） */
  .btn-docs {
    background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    /* position: relative; */
    overflow: hidden;
  }
  .btn-docs::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: rgba(255,255,255,0.1);
    transform: rotate(30deg);
    transition: all 0.8s;
  }
  .btn-docs:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 8px 25px rgba(0,242,254,0.4);
  }
  .btn-docs:hover::before {
    left: 120%;
  }
  .btn-group{
    display: flex;
      align-items: center;
      justify-content: center;
  }
 .discription{
  color:black;
  }
  body.dark-theme .discription{
  color:white;
  }
  /* 标签浮动动画 */
  .tags {
    color:black;
    display: inline-block;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(5px);
    padding: 8px 20px;
    border-radius: 30px;
    margin: 0 8px;
    animation: float 6s ease-in-out infinite;
    animation-delay: calc(var(--i) * 1s);
  }
  .tags:nth-child(1) { --i: 0; }
  .tags:nth-child(2) { --i: 1; }
  .tags:nth-child(3) { --i: 2; }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  
  body.dark-theme .tags{
    color: rgba(255, 255, 255, 1);
  }
  /* 滚动提示动画 */
  .scroll-hint {
    margin-top: 50px;
    animation: bounce 2s ease infinite;
    opacity: 0.8;
  }
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-15px); }
    60% { transform: translateY(-7px); }
  }
</style>
