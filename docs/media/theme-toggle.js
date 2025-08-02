// 主题切换逻辑
(function() {
  var btn = document.createElement('button');
  btn.innerText = '🌙 暗黑模式';
  btn.onclick = function() {
    var isDark = document.body.classList.toggle('dark-theme');
    btn.innerText = isDark ? '☀️ 浅色模式' : '🌙 暗黑模式';
    localStorage.setItem('docsify-theme', isDark ? 'dark' : 'light');
  };
  document.getElementById('theme-toggle-btn').appendChild(btn);

  // 页面加载时自动应用本地主题
  var saved = localStorage.getItem('docsify-theme');
  if(saved === 'dark') {
    document.body.classList.add('dark-theme');
    btn.innerText = '☀️ 浅色模式';
  }
})();
