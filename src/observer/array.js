import {def} from '../utils/index'

// 将数组原型对象缓存
const arrayProto = Array.prototype
// 创建新对象
export const arrayMethods = Object.create(arrayProto)

// 定义要重写的7个方法, 简单点说就是将下面数组中的项在变成响应式， 调用这些方法的时候可以通知watcher更新
const methodsToPath = [
  'push',
  'pop',
  'shift',
  'unshift',
  'sort',
  'splice',
  'reverse'
]

methodsToPath.forEach(method => {
  // 缓存源对象上的方法
  const origin = arrayMethods[method]
  def(arrayMethods, method, function (...args) {
    // 执行原先方法返回数据, this指向数组
    const result = origin.apply(this, args)
    // push unshift splice 都会添加新数据，新数据也需要进行观测

    // 观察者实例
    let ob = this.__ob__
    // 用于存储push unshift splice 传入的数据
    let inserted;
    
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        inserted = args.slice(2) // splice(index, num, item) 我们需要item， 所有切割第三个
        break;
    }

    // 说明有新的数据，执行 observer类中的observeArray
    if (inserted) ob.observeArray(inserted)
    
    // 派发更新
    ob.dep.notify()

    return result
  })
})