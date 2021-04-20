import {remove} from '../utils/index'

/* 
  Dep类 用于依赖收集
*/

let depid = 0;

export default class Dep {
  

  constructor() {
    // 依赖收集Dep实例唯一标识
    this.id = depid++
    // subs 储存
    this.subs = []
  }

  // 收集依赖，这里判断全局Dep.target是否与值来收集，Dep.target 是watcher实例对象
  // 因为在同一时间只能有一个全局的 Watcher 被计算
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  // 将依赖储存到subs数组里面
  addSub (watcher) {
    this.subs.push(watcher)
  }

  // 移除依赖
  removeSub (sub) {
    remove(this.subs, sub)
  }
  

  // 通知订阅者更新
  notify () {
    const subs = this.subs.slice()
    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }

}

// 静态属性，用于存储当前计算中的watcher实例，通过判断全局环境下的Dep.target是否有值来进行依赖收集， 是一个很妙的地方
Dep.target = null

/* 
  用一个数组来管理全局Dep.target, 
  因为现在组件嵌套，一个render函数对应一个watcher, 父组件有一个render，子组件们都有各自的render函数, 比如

  renderA {
    ...
    renderB {}
    ...
  }

  执行renderA 这个时候Dep.target 是renderA的watcher实例，当代码执行到renderB时，Dep.target 是renderB的watcher实例，
  如果我们直接把Dep.target 设置成null, 那么当我们执行完renderB 的时候继续往下执行就获取不到renderA的Watcher实例，这样下面的就无法收集到依赖了，
  所以用一个数组targetStack来管理，当有新的watcher就push压榨，当执行完当前子组件的时候就弹栈pop,并且将Dep.target 指向父组件watcher

*/
const targetStack = []

// 设置新的Dep.target，并将它压栈
export function pushTarget (target) {
  Dep.target = target
  targetStack.push(target)
}

// 将Dep.target恢复到上一个watcher
export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}