/* 
  Watcher 订阅者
  vm:  vue实例
  expOrFn:  字符串或者是函数
  cb: 回调函数

*/
let uid = 0;
export default class Watcher {
  constructor(vm, expOrFn, cb) {
    console.log(`生成Watcher实例`)
    // 实例watcher唯一标识id
    this.id = ++uid;
    this.cb = cb
    
    this.deps = []
    this.depIds = new Set()

    this.newDeps = []
    this.newDepIds = new Set()
  }
}