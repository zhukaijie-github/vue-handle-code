import {def} from './utils'

/*
  数组的响应式，通过改写数组的7个方法来实现的

  pop
  push
  shift
  unshift
  splice
  sort
  reverse


  实现方式： 
  1. 通过复制一份Array.prototype对象 赋值到变量arrayMethods
  2. arrayMethods通过 def 辅助函数对7个方法进行重写
*/
const arrayPoto = Array.prototype
export const arrayMethods = Object.create(arrayPoto)

// 7个方法
const methodsToPatch = [
  'pop',
  'push',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

// 遍历，对数据进行defineProperty属性劫持
methodsToPatch.forEach((method) => {
  // 缓存原来的方法
  const original = arrayMethods[method]
  // 劫持重写方法，重写方法也要保持原来方法的执行结果
  def(arrayMethods, method, function (...args) {
    // result 原来的方法执行返回的数据, 用个apply改变original的this指向，
    const result = original.apply(this, args)
    
    // 数组中有三个方法会增加新的数据，增加新的数据就要进行观察，Observer类中的observeArray, 通过__ob__得到Observer实例
    const ob = this.__ob__

    //储存参数
    let inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      
      case 'splice':
        inserted = args.splice(2)
        break;
    }

    // 如果inserted有值，就要进行数据观察
    if (inserted) {
      ob.observeArray(inserted)
    }

    // 通知更新
    ob.dep.notify()
    return result
  })
})
