import '../../../common/js/rem.js';
import {_,__,getBack, parseToNode} from "../../../utils/index.js";
import {leftList} from "../left/left.js";
import {deliverFee} from '../../../API/shopping.js';
import {rightList} from "../right/right.js";
import {clickTips} from "../../../components/clickTip/clickTips.js";
import {REMOVE_LIST_INFORMATION,EMITTER_REMOVE_LIST} from "../../../API/vender/constants.js";
import InitFactory from "../../../utils/initFactory.js";

const tempFooterContent = `
  <div class="shopping-cost-contain">
    <div class="all-price">￥0</div>
    <div class="delivery-fee">__delivery__</div>
  </div>
`;

let returnNum = '';

class Rendering extends InitFactory{
  getData() {}

  handleData() {
    this.getBackRendering();       //左侧回退按钮的渲染
    this.footerShowRendering();    //底部黑色显示条的渲染
    this.getTitleName();           //顶部标题渲染
    leftList().then(data => {
      const leftFirstPage = _('.click');
      rightList(leftFirstPage);
      return data;               //渲染第一个列表，如果放在外边则会因为promise为异步，所以执行最后执行，会找不到click
    });                          //左侧列表渲染
    this.footerClick();             //底部点击事件渲染
  }

  footerShowRendering() {
    const shoppingCost = _('.shopping-cost-container');
    deliverFee().then(data =>{
      const footerContent = tempFooterContent.replace('__delivery__',data);
      shoppingCost.appendChild(parseToNode(footerContent)[0]);
    });
  }

  getTitleName() {
    const headLine = _('.shop-show-shopName') ;
    const url = decodeURI(location.href);
    headLine.innerHTML = url.split('?')[1];
    /**
     * const searchObj = new URLSearchParams(location.search)   //通过search可以直接找到‘？’后面的数值
     * (xxx?shop-name=xxx);
     * searchObj.get('shop-name')   //通过get方法可以自动获得键值shop-name后面的数据
     */
  }

  getBackRendering() {
    const back = _('.back-img');
    getBack(back);
  }

  footerClick() {
    const footer = _('.shopping-cost-container');
    const shoppingList = _('.shop-show-all-content');
    const cartList = _('.shopping-cart-list');
    const clearCartList = _('.clear-cart-list-contain');
    let clickReady = null;

    footer.addEventListener('click',() => {
      shoppingList.classList.add('blackboard');
      cartList.classList.add('list-show');
      const shopCartItem= __('.shopping-cart-item');
      const emptyTip = _('.empty-tip');
      if(shopCartItem.length === 0 && !emptyTip) this.emptyCartTip();

      if(returnNum === '') returnNum = clickTips(clearCartList,REMOVE_LIST_INFORMATION,EMITTER_REMOVE_LIST);
      else {
        returnNum = clickTips(clearCartList,REMOVE_LIST_INFORMATION,EMITTER_REMOVE_LIST,returnNum);
      }    //获得clickTip返回值，防止添加多个监听器

      if(clickReady) shoppingList.removeEventListener('click',clickReady);
      shoppingList.addEventListener('click',clickReady = () => {
        let emptyTip = _('.empty-tip');
        console.log(1);
        let tipsRemove =  _('.tip-show-container');
        if(Array.from(cartList.classList).some(e => e === 'list-show')) {
          cartList.classList.add('list-disappear');
          setTimeout(()=> {
            const cartListDisappear = _('.list-disappear');
            cartListDisappear.classList.remove('list-disappear');
          },300);
        }

        shoppingList.classList.remove('blackboard');
        cartList.classList.remove('list-show');
        if(tipsRemove){
          tipsRemove.remove();
          tipsRemove = null;
        }              //移除提示框
        if(emptyTip) {
          emptyTip.remove();
          emptyTip = null;
        }             //移除购物车空信息的提示
      })
    })
  }

  emptyCartTip(){
    const shopCartListShow = _('.shopping-cart-list-show');
    const tempEmptyTip = `
    <div class="empty-tip">购物车空空如也</div>
    `;
    shopCartListShow.appendChild(parseToNode(tempEmptyTip)[0]);
  }     //如果购物车为空，则添加显示信息
}

new Rendering();



