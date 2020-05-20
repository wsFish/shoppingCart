class EventEmitter{
  constructor() {
    this.listeners = {};
  }
  on(type,cb){
    const fns = this.listeners[type] || (this.listeners[type] = []);
    fns.push(cb);
    return this;
  }
  off(type,cb){
    const fns = this.listeners[type];
    if(!fns || fns.listeners === 0) return;
    this.listeners[type] = fns.filter(fn => fn !== cb);
    return this;
  }
  emit(type,...args){
    const fns = this.listeners[type];
    if(!fns || fns.listeners === 0) return;
    fns.forEach(fn => fn.call(this,...args));
  }
}

export default (() => {
  let instance;
  return {
    init(){
        return instance || (instance = new EventEmitter())
    }
  }
})()