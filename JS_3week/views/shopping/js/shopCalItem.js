import {_, __,parseToNode,parentNodeNeed,emitter} from "../../../utils/index.js";
import {EMITTER_REMOVE_LIST} from "../../../API/vender/constants.js";
import InitFactory from "../../../utils/initFactory.js";

let price = 0;
let food = 0;

const tempShoppingCartList = `
  <div class="shopping-cart-item hairline-bottom" data-item-name=__name__>
    <div class="shopping-cart-list-name">__name__</div>
    <div class="shopping-cart-list-price">__price__</div>
    <div class="shopping-cart-list-change-num">
      <div class="shopping-cart-list-minus">
        <img src="../../assets/img/minus.png">
      </div>
      <div class="shopping-cart-list-num">__num__</div>
      <div class="shopping-cart-list-plus">
        <img src="../../assets/img/plus.png">
      </div>    
    </div>
  </div>
`;


class ShopCalItem extends InitFactory {
  beforeMount() {
    emitter.on(EMITTER_REMOVE_LIST, () => {
      const shopList = __('.shopping-cart-item');
      shopList.forEach(e => {
        addOrMinusCalc(e.itemData, false, true);
      })
    });
  }

  getData() {}

  handleData() {}


}

new ShopCalItem();

export function plusOrMinusButton(el, add = true) {
  const numFood = parentNodeNeed(el, 5).itemData;
  addOrMinusCalc(numFood, add);
}


function addOrMinusCalc(data,add = true,empty = false) {
  const priceTotal = _('.all-price');
  const listNumNode = __('.right-list-item-num');
  if(empty === true){
    data.foodNum = 0;
    price = 0;
    getListArray(data.foodNum,data,add);
    food = 0;
  }
  else{
    if(add === true){
      data.foodNum++;
      const{min_price} = data;
      price += min_price;
      getListArray(data.foodNum,data);
      food++;
    }
    else {
      if(data.foodNum === 0) {}  //如果初始值为0则无法继续往下减
      else {
        data.foodNum--;
        const{min_price} = data;
        price -= min_price;
        getListArray(data.foodNum,data,add);
        food--;
      }
    }
  }
  priceTotal.textContent = `￥${price}`;
  redNum(food);
  listNumNode.forEach(e => e.textContent = parentNodeNeed(e,4).itemData.foodNum);
  //遍历所有值，查看是否有foodNum的值发生变化
}

function getListArray(num,obj,add = true) {
  if (add) {
    if (num !== 1) changeListNum(obj, num);//仅需修改值
    else appendCartListDiv(obj, num);
  }
  else {
    if (num === 0) removeCartListDiv(obj);
    else changeListNum(obj,num);
  }
}

function appendCartListDiv(obj,num) {
  const shopCartListShow = _('.shopping-cart-list-show');
  const {name,min_price} = obj;
  let price = min_price*num;
  const shoppingCartList = tempShoppingCartList
    .replace(/__name__/g,name)
    .replace('__price__',`￥${price}`)
    .replace('__num__',num);
    const shopCartNode = parseToNode(shoppingCartList)[0];
  shopCartNode.itemData = obj;

  shopCartNode.addEventListener('click',e => {    //为每一项里的img添加点击事件，否则会重复添加
    const className = e.target.parentNode.className;
    if(className === 'shopping-cart-list-plus') addOrMinusCalc(parentNodeNeed(e.target,3).itemData);
    else if(className === 'shopping-cart-list-minus') addOrMinusCalc(parentNodeNeed(e.target,3).itemData,false);
  });
  shopCartListShow.append(shopCartNode);
  // const minus = shopCartNode.querySelector('.shopping-cart-list-minus img');
  // const plus = shopCartNode.querySelector('.shopping-cart-list-plus img');
  // minus.addEventListener('click',e => addOrMinusCalc(minus.parentNode.parentNode.parentNode.itemData,false));
  // plus.addEventListener('click',e => addOrMinusCalc(plus.parentNode.parentNode.parentNode.itemData));
  // shopCartListShow.append(shopCartNode);
  //上面注释掉的代码也可执行，先将点击事件添加进去在将内容append到容器中，否则直接遍历会重复添加点击事件
  //二选一即可
}

function removeCartListDiv(obj) {
  const {name} = obj;
  const shopCartItem = __('.shopping-cart-item');
  const shoppingList = _('.shop-show-all-content');
  const cartList = _('.shopping-cart-list');
  shopCartItem.forEach(e => {
    if(e.querySelector('.shopping-cart-list-name').textContent === name) {
      e.remove();
      e = null;
    }
  });
  const shopLaveItem = __('.shopping-cart-item');
  if(shopLaveItem.length === 0) {
    shoppingList.classList.remove('blackboard');
    cartList.classList.remove('list-show');
  }
}

function changeListNum(obj,num) {
  const {name,min_price} = obj;
  let allPrice = min_price * num;
  const shopCartItem = __('.shopping-cart-item');
  shopCartItem.forEach(e => {
    if(e.querySelector('.shopping-cart-list-name').textContent === name) {
      e.querySelector('.shopping-cart-list-price').textContent = `￥${allPrice}`;
      e
        .querySelector('.shopping-cart-list-change-num')
        .querySelector('.shopping-cart-list-num').textContent = num;
    }
  });
}

function redNum(foodTotal) {
  let redSign = _('.red-sign');
  if(redSign) {
    if(foodTotal === 0){
      redSign.remove();
      redSign = null;
    }
    else redSign.textContent = foodTotal;
  }
  else{
    const cartImg = _('.shopping-cart-img');
    const tempRedSign = `<div class="red-sign"></div>`;
    cartImg.appendChild(parseToNode(tempRedSign)[0]);
    redSign = _('.red-sign');
    redSign.textContent = foodTotal;
  }
}