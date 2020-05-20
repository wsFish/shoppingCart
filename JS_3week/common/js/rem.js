;(function () {
  function resize() {
    const html = document.documentElement;
    let width = html.clientWidth;
    if(width > 670) width = 670;
    html.style.fontSize = `${width / 7.5}px`;
  }

  window.addEventListener('resize',resize);

  resize();
})();