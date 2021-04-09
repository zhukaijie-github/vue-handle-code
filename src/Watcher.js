import {pushTarget, popTarget} from './Dep.js'

/*
  Watcher类是数据的订阅者，数据变化通知watcher,来进行相应的操作
*/
let uid = 0
export default class Watcher {
  /* 
    target 当前监听对象
    expression 当前监听对象属性表达式，比如a.b.c
    callback 回调函数
  */
  constructor(target, expression, callback) {
    this.id = uid++
    this.target = target
    this.getter = parsePath(expression)
    this.value = this.get()
    this.callback = callback
    
  }
  

  // 接收参数dep(Dep实例)，让当前watcher订阅dep
  addDep (dep) {
    dep.addSub(this)
  }

  get () {
    pushTarget(this) 
    let value
    try {
      value = this.getter.call(this, this.target)
    } finally {
      popTarget()
    }
    return value
  }

  // 更新
  update () {
    this.run()
  }

  run () {
    const value = this.get()
    const oldValue = this.value
    this.value = value
    this.callback.call(this, value, oldValue)
  }
}

/* 
  pardePath 解析参数，返回一个函数， 比如参数是a.b.c，
  执行返回函数，返回obj.a.b.c的值
*/
function parsePath (expression) {
  let exp = expression.split('.')
  return (obj) => {
    for (let i = 0; i < exp.length; i++) {
      obj = obj[exp[i]]
    }
    return obj
  }
}