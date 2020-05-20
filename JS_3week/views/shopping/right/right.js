import {_, __, parseToNode} from "../../../utils/index.js";
import {plusOrMinusButton} from "../js/shopCalItem.js";

const tempTitleAndContain = `
  <div class="shopping-right-all">
    <div class="shopping-titleLine">__titleLine__</div>
    <div class="shopping-content">__content__</div>
  </div>
`;

const tempRightContent = `
  <div class="right-list-item hairline-bottom">
    <div class="right-list-item-img">
      <img src="__img__">
    </div>
    <div class="right-list-item-right-container">
      <div class="right-list-item-name">__name__</div>
      <div class="right-list-item-contain">__contain__</div>
      <div class="right-list-item-praise">__praise__</div>
      <div class="right-list-item-right-bottom">
        <div class="right-list-item-unit-price">
          <div class="right-list-item-price">__price__</div>
          <div class="right-list-item-unit">/__unit__</div>
        </div>
        <div class="right-list-item-change-num">
          <div class="right-list-item-minus">
            <img src="../../assets/img/minus.png">
          </div>
          <div class="right-list-item-num">__foodNum__</div>
          <div class="right-list-item-plus">
            <img src="../../assets/img/plus.png">
          </div>    
        </div>
      </div>
    </div>
  </div>
`;


export function rightList(leftList) {
  rightListItemRendering(leftList);
}

function rightListItemRendering(leftList) {
  const {spus,name} = leftList.itemData;
  let html = '';
  spus.forEach(e => {
    const {
      picture,
      description,
      praise_content,
      min_price,
      unit,
      foodNum
    } = e;
    const contentName=e.name;
    const RightContent = tempRightContent
      .replace('__img__',picture)
      .replace('__name__',contentName)
      .replace('__contain__',description)
      .replace('__praise__',praise_content)
      .replace('__price__',min_price)
      .replace('__unit__',unit)
      .replace('__foodNum__',foodNum);
    html += RightContent;
  });
  const titleAndContain = tempTitleAndContain
    .replace('__titleLine__',name)
    .replace('__content__',html);
  const nodeTitleAndContain = parseToNode(titleAndContain)[0];
  _('.right-commodity').appendChild(nodeTitleAndContain);
  const rightItem = _('.shopping-right-all');

  rightItem.addEventListener('click',e => {
    const className = e.target.parentNode.className;
    if(className === 'right-list-item-plus') plusOrMinusButton(e.target);
    else if(className === 'right-list-item-minus') plusOrMinusButton(e.target,false);
  });   //为整个右侧页面添加点击事件，用target得到相应的内容

  const rightContentNode = __('.right-list-item');
  rightContentNode.forEach((e,i) => e.itemData = leftList.itemData.spus[i]);
}
