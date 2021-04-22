import { parsePath } from "../utils";
import { popTarget, pushTarget } from "./dep";

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
    this.vm = vm
    // _watchers存放订阅者实例
    // vm._watchers.push(this)
    // 实例watcher唯一标识id
    this.id = ++uid;

    this.cb = cb
    // 记录上一次的dep组
    this.deps = []
    // 记录上一次的dep的id组
    this.depIds = new Set()
    // 记录最新的dep组
    this.newDeps = []
    // 记录最新的dep的id组
    this.newDepIds = new Set()

    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      // parsePath 是一个高阶函数返回一个函数，主要目的是根据expOrFn 字符串层层查找获取到最终的值
      this.getter = parsePath(expOrFn)
    }

    this.value = this.get()
  }

  // 求值函数
  get () {
    // dep 里面管理当前watcher实例， 并且将全局变量Dep.target设置成当前实例
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      // 执行getter函数，获取当前表达式的值，这样就会触发响应式get方法，收集当前依赖dep.depend()
      value = this.getter.call(vm, vm)
    } catch (error) {
      console.log(error)
    } finally {
      // dep 中的函数，弹出当前watcher实例，恢复上一个watcher实例
      popTarget()
      
      // 情况依赖收集器
      this.cleanupDeps()
    }

    return value
  }

  // 响应式数据set中是调用dep.depend 方法， depend方法执行 Dep.target.addDep(this)， 就是调用watcher的addDep
  addDep (dep) {
    // 下面的判断都是避免重复添加

    // 获取dep的id属性
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      // 没有就添加新的
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        // 上一次depid组中没有就添加新的watcher
        dep.addSub(this)
      }
    }
  }

  /* 
    这个方法的作用是清除旧的订阅，将newDeps 和 newDepIds 分别传给 deps 和 depIds , 并且情况本身

    为什么要清除旧订阅，清空新的，因为vue考虑到一个情况，v-if 渲染 a 和 b两个模版，每次渲染都会从新收集依赖，比如现在渲染的是 a 模版，那么收集的都是a 的依赖，当修改 a 模版里面的数据的时候，理所当然是要通知所有依赖更新，那么如果这时候渲染 b 模版，收集b模版的依赖，如果在这时候去修改 a 模版里面的数据，通知所有依赖更新很显然是浪费的，所以我们移除旧订阅，新增新订阅
  */
  cleanupDeps () {
    // 获取当前dep中收集的数据长度
    const i = this.deps.length
    // 循环遍历移除旧订阅
    while (i--) {
      const dep = this.deps[i]
      const id = dep.id
      if (!this.newDepIds.has(id)) {
        // 新的里面没有dep id， 就将dep中的subs里面移除当前订阅
        dep.removeSub(this)
      }
    }

    // 用一个中间量来缓存数据，将newDeps 和 newDepIds 分别传给 deps 和 depIds , 并且情况本身
    let temp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = temp
    this.newDepIds.clear()

    temp = this.deps
    this.deps = this.newDeps
    this.newDeps = temp
    this.newDeps.length = []
  }


  /* 
    数据变化，订阅更新
  */
  update () {
    // .....

    // 这里我们就先用队列的方式来执行
    
    queueWatcher(this)
  }
}

// 列队的形式缓存要执行的订阅，然后在nextTick回调执行
function queueWatcher (watcher) {
  console.log('更新视图', watcher)
}
