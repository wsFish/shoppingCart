import {shop_item_list} from "../../../API/shopping.js";
import {_, __, parseToNode} from "../../../utils";
import {rightList} from '../right/right.js';

const tempLeftSortItem = `
  <div class="left-menu-item hairline-bottom">
    <div class="left-menu-item-img">
    __img__
    </div>
    <div class="left-menu-item-name">__name__</div>
  </div>
`;

export function leftList(){
  return shop_item_list().then(data => {
    data.forEach( e => {
      handleData(e);
      e.spus.forEach(t => t.foodNum = 0)          //为所有项赋初值
    });
    _('.left-menu-item').classList.add('click');
    clickLeftItem();
    return data;
  });
}

function handleData(item) {
  const {name,icon} = item;
  const leftSortItem = tempLeftSortItem
    .replace('__img__',icon?`<img src='${icon}'/>`:'')
    .replace('__name__',name);
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
