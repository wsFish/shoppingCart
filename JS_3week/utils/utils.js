
export  const _ = selector => document.querySelector(selector);
export  const __ = selector => Array.from(document.querySelectorAll(selector));


/**
 * 防抖函数
 * @param { Function } fn
 * @param { Number } delay
 * */
export const debounce = (fn, delay = 300) => {
  return function debounce(...args) {
    fn.tId && clearTimeout(fn.tId);
    fn.tId = setTimeout(() => {
      fn.call(this,...args);
    },delay)
  }
};


/**
 * 将字符串转化为dom
 * @param { String } str
 * */
export const parseToNode = str =>{
  let div = document.createElement('div');
  div.innerHTML = str;
  const children = div.children;
  div = null;                                //让div回收
  return children;
};


/**
 * 洗牌函数，数组乱序
 * @param {Array} arr
 */
export const shuffle = arr => {
  const _arr = arr.slice();   //将原数组进行复制
  let randomNum = 0;

  for(let i = 0,len = _arr.length; i < len; i++){
    randomNum = Math.floor(Math.random() * len);
    [_arr[i],_arr[randomNum]] = [_arr[randomNum],_arr[i]];
  }

  return _arr;
};


/**
 * 节流函数
 * @param {fn} fn
 * @param {number} delay
 * @returns {function(...[*]=)}
 */
export const throttle = (fn,delay = 1000) => {
  let tId = null;
  return function (...args) {
    if(!tId){
      tId = setTimeout(() => {
        fn.call(this,...args);
        tId = null;
      },delay);
    }
  }
};

/**
 * 偏函数
 * @param {fn}fn
 * @param {Array}args
 * @returns {function(...[*]=)}
 */
export const partial = function (fn,...args) {
  return function (..._args) {
    for(let i = 0 ; i < args.length;i++){
      args[i] = args[i] === null ? _args.shift() : args[i];
    }
    args = args.concat(_args);
    fn(...args);
  }
};

/**
 *
 * @param {function(Array, boolean=, boolean=): *}fn
 * @returns {function(...[*]): *}
 */
export const getSingle = function (fn) {
  let instance;
  return function (...args) {
    return instance || (instance = fn.call(this, ...args));
  }
};

//输入转义，改为字符实体。
export const escape = str => str.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/&/,'&amp;');

export const parentNodeNeed =  function (childrenNode,num) {
  let node = childrenNode;
  for(let i = 0;i < num; i++){
    node = node.parentNode;
  }
  return node;
};