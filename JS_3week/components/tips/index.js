import {parseToNode,getSingle} from "../../utils/index.js";

import {default as informationJudge} from '../../API/vender/tipsType.js';

const tempItem =
  `<div class="tips">
        <p class="content">__tips__</p>
     </div>`;    //不需要组合，不用html来加

let ifShow = false;

export default function tip (tips) {

  const {message} = tips;

  const temp = tempItem.replace('__tips__',informationJudge(message));

  if(ifShow) return;

  ifShow = true;

  const el = append(temp);

  show(el) && hide(el);

}

function show(el) {
  document.body.appendChild(el);      //将div置入页面中不用通过单例，否则删除后就不再添加了，单例仅仅判断是否重复产生即可。
  el.classList.add("show");
  return true
}

function hide(el) {
  setTimeout(() => {
    el.classList.remove('show');
    el.remove();
    ifShow = false;
  }, 2500)

}

function append(html) {
  return parseToNode(html)[0];
}

append = getSingle(append);