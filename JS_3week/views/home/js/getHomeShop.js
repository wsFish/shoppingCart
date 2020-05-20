import {getHomeShopData} from "../../../API/home.js";
import {_,parseToNode,emitter,rollToBottom,ROLL_TO_BOTTOM} from '../../../utils/index.js';

const temp = `
  <div class="shop-items" data-shop-name="__shopName__">__html__</div>
`;

const tempItem = `
    <div class="img-father">
      <div class="img">
            <img src="__imgPath__" alt="">
      <span class="brand __brand-type__">__brand__</span>
    </div>
    </div>
    <div class="content">
      <div class="shop-name">__shopName__</div>
      <div class="shop-situation">
        <div class="shop-stars">__star__</div>
        <div class="sales">月售__sale__</div>
        <div class="distance-time">
          <div class="delivery-time hairline-right">__delivery-time__</div>
          <div class="distance">__distance__</div>
        </div>
      </div>
      <div class="delivery-fee">__minPrice__</div>
      <div class="others">__information__</div>
  </div>
`;

const discountIfm = `
  <div class="discount">
    <img src="__icon__" class="icon-photo">
    <span class="information">__ifm__</span>
  </div>
`;

let ifRoll = false;

emitter.on(ROLL_TO_BOTTOM,() =>{
    getData().then(data => data);
  });


getData().then(addList());


function getData() {
  return getHomeShopData().then(data => handleData(data));
}

function handleData(data) {
  const frag = document.createDocumentFragment();
  const shopList = _('.shoplist');
  data.forEach(e => {
    const {
      pic_url,
      name,
      month_sale_num,
      mt_delivery_time,
      distance,
      min_price_tip,
      wm_poi_score,
      discounts2,
      brand_type
    } = e;
    let html = '';
    const item = tempItem
      .replace('__imgPath__',pic_url)
      .replace('__shopName__',name)
      .replace('__sale__',month_sale_num > 999 ? '999+' : month_sale_num)
      .replace('__delivery-time__',mt_delivery_time)
      .replace('__distance__',distance)
      .replace('__minPrice__',min_price_tip)
      .replace('__star__',getStar(wm_poi_score))
      .replace('__information__',getDiscount(discounts2))
      .replace('__brand__',brand_type ? '品牌' : '新店' )
      .replace('__brand-type__',brand_type ? 'old-brand' : 'new-brand');
    html += item;
    getStar(wm_poi_score);
    let shopTemp = temp
      .replace('__html__',html)
      .replace('__shopName__',name);
    const el = frag.appendChild(parseToNode(shopTemp)[0]);
    jumpTo(el);
  });
  shopList.append(frag);
}

function getStar(data){
  const fullStar = `<img src="../../assets/img/fullstar.png" class="stars" alt="">`;
  const halfStar = `<img src="../../assets/img/halfstar.png" class="stars" alt="">`;
  const emptyStar = `<img src="../../assets/img/gray-star.png" class="stars" alt="">`;

  const [z,x] = String(data).split('.');
  let star = '';

  for(let i = 0;i < z;i++){
    star += fullStar;
  }   //获得整数颗星星,img路径为相对于HTML的路径,非js文件的路径

  if(z === '5') return star;               //如果已经为五星则直接返回
  else x >= 5 ? star += halfStar : star += emptyStar;   //判定下一颗星是半星还是空星

  for(let i = z + 1;i <= 5;i++){
    star += emptyStar;
  }              //将剩下的星都用空星
  return star;
}       //按照分数获得星星

function getDiscount(arr){

  let inner = '';
  arr.forEach(e => {
    const {icon_url,info} = e;
    const ifm = discountIfm
      .replace('__icon__',icon_url)
      .replace('__ifm__',info);
    inner += ifm;
  });
  return inner;
}          //获取剩下的discount的信息

function addList() {
  const gC = _('.g-view-container');
  if(ifRoll) return;
  ifRoll = true;
  rollToBottom(gC);
  ifRoll = false;
}        //重新添加loading以及list

function jumpTo(el) {
  el.addEventListener('click',e => {
    const i = getPath(e);
    const {path} = e;
    const name = path[i].dataset.shopName;
    const url = '../shopping/index.html'+'?'+name;
    window.location.assign(encodeURI(url));
  })
}

function getPath(e) {
  let i = 0;
  const {path} = e;
  for(; i < path.length;i++){
    if(path[i].className === 'shop-items') break;
      }
  return i;
}

