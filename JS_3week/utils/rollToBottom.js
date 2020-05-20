import {emitter,throttle,partial} from "./index.js";
import {ABSOLUTE_HEIGHT} from "../API/vender/constants.js";

const judgeToBottom = ABSOLUTE_HEIGHT;

export const ROLL_TO_BOTTOM = Symbol('roll-to-bottom');

export default  (gView,judgeToBottom) => {
  rollToBottom = partial(rollToBottom,null,judgeToBottom);    //偏函数拼接
  gView.addEventListener('scroll',throttle(rollToBottom));
}

function rollToBottom(gView) {
    const {scrollHeight, clientHeight,scrollTop } = gView.path[0];
    if(scrollHeight - clientHeight - scrollTop < judgeToBottom) {
      emitter.emit(ROLL_TO_BOTTOM);
    }
}