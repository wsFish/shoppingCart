import '../../../common/js/rem.js';
import {_, getBack, parseToNode} from "../../../utils/index.js";
import {leftList} from "../left/left.js";
import {deliverFee} from '../../../API/shopping.js';
import {rightList} from "../right/right.js";

const tempFooterContent = `
  <div class="shopping-cost-contain">
    <div class="all-price">￥0</div>
    <div class="delivery-fee">__delivery__</div>
  </div>
`;

rendering();

function rendering() {
  getBackRendering();       //左侧回退按钮的渲染
  footerShowRendering();    //底部黑色显示条的渲染
  getTitleName();           //顶部标题渲染
  leftList().then(data => {
    const leftFirstPage = _('.click');
    rightList(leftFirstPage);
    return data;               //渲染第一个列表，如果放在外边则会因为promise为异步，所以执行最后执行，会找不到click
  });                          //左侧列表渲染
  footerClick();             //底部点击事件渲染
}


function footerShowRendering() {
  const shoppingCost = _('.shopping-cost-container');
  deliverFee().then(data =>{
    const footerContent = tempFooterContent.replace('__delivery__',data);
    shoppingCost.appendChild(parseToNode(footerContent)[0]);
    });
}

function getTitleName() {
  const headLine = _('.shop-show-shopName') ;
  const url = decodeURI(location.href);
  headLine.innerHTML = url.split('?')[1];
  /**
   * const searchObj = new URLSearchParams(location.search)   //通过search可以直接找到‘？’后面的数值
   * (xxx?shop-name=xxx);
   * searchObj.get('shop-name')   //通过get方法可以自动获得键值shop-name后面的数据
   */
}

function getBackRendering() {
  const back = _('.back-img');
  getBack(back);
}


function footerClick() {
  const footer = _('.shop-show-footer');
  const shoppingList = _('.shop-show-all-content');
  const cartList = _('.shopping-cart-list');
  footer.addEventListener('click',() => {
    shoppingList.classList.add('blackboard');
    cartList.classList.add('list-show');
    shoppingList.addEventListener('click',() => {
      shoppingList.classList.remove('blackboard');
      cartList.classList.remove('list-show');
    })
  })
}

