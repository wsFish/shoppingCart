import {emitter} from "./index.js";

const eventMap = {
  BEFORE_MOUNT:'before-mount',
  GET_DATA:'get-data',
  HANDLE_DATA:'handle-data',
  MOUNTED:'mounted'
};

let uid = 0;

export default class InitFactory{
  constructor() {
    this.data = null;
    this.uid = uid++;

    Object.assign(this,Object.keys(eventMap).reduce((obj,key) => {
      obj[key] = Symbol(`${this.uid}_${eventMap[key]}`);
      return obj;
    },{}));
    this.init();
  }
  async init(){
    this.beforeMount();
    emitter.emit(this.BEFORE_MOUNT);
    this.data = await this.getData();   //等待数据获取后再执行之后的程序
    emitter.emit(this.GET_DATA);
    this.handleData();
    emitter.emit(this.HANDLE_DATA);
    this.mounted();
    emitter.emit(this.MOUNTED);
  }
  beforeMount(){};
  getData(){
    throw Error('必须复写父类getData');
  }
  handleData(){
    throw Error('必须复写父类handleData');
  }
  mounted(){}
}