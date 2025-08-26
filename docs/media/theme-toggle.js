(function() {
  var container = document.getElementById('theme-toggle-btn');
  if (!container) return;

  // 创建开关
  var switchWrap = document.createElement('div');
  switchWrap.className = 'theme-switch-wrap';

  var label = document.createElement('label');
  label.className = 'theme-switch';

  var input = document.createElement('input');
  input.type = 'checkbox';

  var slider = document.createElement('span');
  slider.className = 'slider';

  var sun = document.createElement('span');
  sun.className = 'icon-sun';
  sun.textContent = '☀️';

  var moon = document.createElement('span');
  moon.className = 'icon-moon';
  moon.textContent = '🌙';

  label.appendChild(input);
  label.appendChild(slider);
  label.appendChild(sun);
  label.appendChild(moon);
  switchWrap.appendChild(label);
  container.appendChild(switchWrap);

  // Highlight.js 主题切换
  function setHighlightTheme(isDark) {
    var light = document.getElementById('hljs-light');
    var dark = document.getElementById('hljs-dark');
    if (light && dark) {
      light.disabled = !!isDark;
      dark.disabled = !isDark;
    }
  }

  // 状态初始化
  var saved = localStorage.getItem('docsify-theme');
  var isDarkInit = saved === 'dark';
  if(isDarkInit) {
    document.body.classList.add('dark-theme');
    input.checked = true;
  }
  setHighlightTheme(isDarkInit);

  // 切换事件
  input.onchange = function() {
    var isDark = input.checked;
    document.body.classList.toggle('dark-theme', isDark);
    localStorage.setItem('docsify-theme', isDark ? 'dark' : 'light');
    setHighlightTheme(isDark);
  };
})();