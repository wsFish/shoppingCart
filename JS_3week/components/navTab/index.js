const temp = `
  <div class='nav-tab'>__item__</div>;
`;

const itemTemp = `
  <a class="nav-tab-item" href="__to__">
    <span class="nav-tab-box square-box">
      <img src="__iconPath__" alt="__altText__" class="nav-tab-img"/>
    </span>
    <p class="nav-tab-name">__navName__</p>
  </a>
`;


export default class NavTab{
  constructor(el,data){
    this.el = el;
    this.data = data;
    this.path = location.pathname;

    this.init();
  }
  init(){
    this.handleData();
    this.bindEvent();
  }
  handleData(){
    const data = this.data;
    let html = '';
    data.forEach(item => {
      html += itemTemp
        .replace('__to__',item.to)
        .replace('__iconPath__',getPath(this.path) === item.path ? item.activeIcon : item.icon)
        .replace('__altText__',item.alt)
        .replace('__navName__',item.text)
    });

    this.el.innerHTML = temp.replace('__item__',html);

    }
  bindEvent() {
    const el = this.el;
    Array.from(el.querySelectorAll('.nav-tab-item')).forEach(a => a.addEventListener('click',this.handleClick.bind(this)));
    //不加bind this指向a，不指向class
  }
  handleClick(e){
    if(getPath(this.path) === getPath(e.currentTarget.href))   //如果要跳转的地址与本地址相同，则阻止跳转
      e.preventDefault();  //阻止默认跳转
  }
}

function getPath(path) {
  if(path.includes('home')) return 'home';
  if(path.includes('my')) return 'my';
  if(path.includes('order')) return 'order';
}