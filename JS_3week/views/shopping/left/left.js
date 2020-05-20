import {shop_item_list} from "../../../API/shopping.js";
import {_, __, parseToNode} from "../../../utils";
import {rightList} from '../right/right.js';


const tempLeftSortItem = `
  <div class="left-menu-item hairline-bottom">
    <span class="left-menu-item-img">
    <img src="__img__" data-img-being="__tOf__">
    </span>
    <span class="left-menu-item-name">__name__</span>
  </div>
`;


export function leftList() {
  return shop_item_list().then(data => {
    data.forEach( e => {
      handleData(e);
      e.spus.forEach(t => {
        t.foodNum = 0;          //为所有项赋初值
      })
    });
    __('.left-menu-item img').forEach(e => {
      if(e.dataset.imgBeing === 'false'){
        e.parentNode.remove();
      }
      _('.left-menu-item').classList.add('click');
    });
    clickLeftItem();
    return data;
  });
}

function handleData(item) {

  const {name,icon} = item;
  const leftSortItem = tempLeftSortItem
    .replace('__img__',icon)
    .replace('__name__',name)
    .replace('__tOf__',icon?'true':'false');

  const el = parseToNode(leftSortItem)[0];
  el.itemData = item;
  _('.left-menu').appendChild(el);
}

function clickLeftItem() {
  const leftList = __('.left-menu-item');
  leftList.forEach((e,i) => {
    e.addEventListener('click',() => {
      const allRight = _('.shopping-right-all');
      allRight.remove();
      leftList.forEach(t => t.classList.remove('click'));
      leftList[i].classList.add('click');
      rightList(leftList[i]);
    })
  })
}

