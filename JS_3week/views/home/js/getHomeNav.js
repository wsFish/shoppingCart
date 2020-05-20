import {_, parseToNode} from "../../../utils";
import {getHomeNavData} from "../../../API/home.js";

const temp = `
  <div class = 'swiper-slide'>__slide__</div>
`;

const itemTemp = `
  <div class = 'home-nav-item'>
    <span class="home-nav-item-img-box square-box">
      <img src="__imgPath__" class="home-nav-item-img">
    </span>
    <p class="home-nav-item-name">__name__</p>
  </div>
`;

getHomeNavData()
  .then(data => {
    handleData(data);
    // new Swiper('.swiper-container');
  });

function handleData(data){
  const swiperWrapper = _('.swiper-wrapper');
  let iteration =Math.ceil(data.length/8);
  while(iteration--){
    let html = '';
    for(let i = 0 ,item; i < 8 && (item = data.shift()); i++){      //shift让空的部分直接不进入循环
      const {url,name} = item;
      html += itemTemp
        .replace('__imgPath__',url)
        .replace('__name__',name);
    }
    swiperWrapper.appendChild(parseToNode(temp.replace('__slide__',html))[0]);
  }
  var mySwiper = new Swiper ('.swiper-container');
  //初始化需要在内容添加后再执行，不然会计算出错，或者使用updata（）来更新
}