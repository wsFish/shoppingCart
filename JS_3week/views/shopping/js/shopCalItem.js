import {_, __,parseToNode,parentNodeNeed} from "../../../utils/index.js";

let price = 0;

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

/**
 * @param el                  遍历出的 + / - 按钮
 * @param {boolean}add        判断是否为  +   按钮，默认为是
 */

export function plusOrMinusButton(el,add = true) {
  const numFood = parentNodeNeed(el,5).itemData;
  addOrMinusCalc(numFood,add);
}

function addOrMinusCalc(data,add = true) {
  const priceTotal = _('.all-price');
  const listNumNode = __('.right-list-item-num');
  if(add === true){
    data.foodNum++;
    const{min_price} = data;
    price += min_price;
    priceTotal.textContent = `￥${price}`;
    getListArray(data.foodNum,data);
  }
  else {
    if(data.foodNum === 0) priceTotal.textContent = `￥${price}`;  //如果初始值为0则无法继续往下减
    else {
      data.foodNum--;
      const{min_price} = data;
      price -= min_price;
      priceTotal.textContent = `￥${price}`;
      getListArray(data.foodNum,data,false);
    }
  }
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
    console.log(className);
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
  shopCartItem.forEach(e => {
    if(e.querySelector('.shopping-cart-list-name').textContent === name) e.remove();
  })
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
