/* 
  Dep类是一个简单的观察者模式，只要用于依赖收集
*/

// Dep 标识id
let uid = 0

export default class Dep {
  constructor() {
    // 唯一id
    this.id = uid++
    // 存放收集到的watcher
    this.subs = []
  }

  // 收集watcher实例,收集依赖
  addSubs (sub) {
    this.subs.push(sub)
  }

  // 将Dep实例添加watcher依赖中
  depend () {
    // Dep.target 是个全局变量，就是当前正在计算的Watcher实例
    // 设置某个watcher实例
    // new Watcher 会执行this.get 方法，这个时候会把 Watcher实例赋值给Dep.target
    if (Dep.target) {
      // watcher 添加Dep实例
      Dep.target.addDep(this)
    }
  }

  // 通知所有收集的watcher实例更新
  notify () {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

Dep.target = null