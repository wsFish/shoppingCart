import {parseToNode,_,emitter} from "../../utils/index.js";


const tempTipsShowContainer = `
  <div class="tip-show-container">
    <div class="click-tips-information">__inner__</div>  
    <div class="click-tips-buttons">
      <div class="click-tips-buttons-yes hairline-top hairline-right">确定</div>
      <div class="click-tips-buttons-no hairline-top">取消</div>
    </div>
  </div>
`;

/**
 *
 * @param el   点击的按钮
 * @param {string}ifm    提示框显示的文本内容
 * @param fn_name     emitter的名字
 * @param elOverRemove     不用输入，用于防止多次添加点击事件
 * @param cel     不用输入，用于防止多次添加点击事件
 * @returns {{cel: boolean, elOverRemove: null}}       返回值用于防止多次添加点击事件
 */

export function clickTips(el,ifm,fn_name,elOverRemove = null,cel = false) {
  const tipsShowContainer = tempTipsShowContainer.replace('__inner__',ifm);
  const tipsNode = parseToNode(tipsShowContainer)[0];
  let ct,cf = false;    //ct  cf  cel 均用于阻止第一次removeEventListener执行
  let clickTrue,clickFalse;      //clickTrue、clickFalse、elOverRemove用于removeEventListener,删除确定的监听器
  if(cel) el.removeEventListener('click',elOverRemove);
  el.addEventListener('click',elOverRemove = () => {
    document.body.appendChild(tipsNode);
    const certain = _('.click-tips-buttons-yes');
    const cancel = _('.click-tips-buttons-no');
    if(ct)  certain.removeEventListener('click',clickTrue);
    certain.addEventListener('click',clickTrue = () => {
      let tipShowContain = _('.tip-show-container');
      emitter.emit(fn_name);
      tipShowContain.remove();
      tipShowContain = null;
    });
    ct = true;
    if(cf)  cancel.removeEventListener('click',clickFalse);
    cancel.addEventListener('click',clickFalse = () =>{
      let tipShowContain = _('.tip-show-container');
      tipShowContain.remove();
      tipShowContain = null;
    });
    cf = true;
  });
  cel = true;
  return {elOverRemove,cel}
}
