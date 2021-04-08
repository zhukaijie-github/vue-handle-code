/* 
  Watcher类是数据的订阅者，数据变化通知watcher,来进行相应的操作
*/

export default class Watcher {
  constructor() {
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
  }


  // 接收参数dep(Dep实例)，让当前watcher订阅dep
  addDep (dep) {
    // 每个dep实例都有一个id值
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        // dep收集watcher实例
        dep.addSub(this)
      }
    }
  }
}