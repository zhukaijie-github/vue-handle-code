
import observe from "./observe"
import Dep from './dep'

/*
  defineReactive函数是响应式数据的关键点，通过Object.defineProperty 

  通过设置getter和setter来到达响应式数据

*/


export default function defineReactive (obj, key, val) {
  const dep = new Dep()

  // 检测对象是否可以修改和配置，如果不可，那么就不能实现响应式数据
  // Object.getOwnPropertyDescriptors() 方法用来获取一个对象的所有自身属性的描述符。
  const property = Object.getOwnPropertyDescriptors(obj)

  if (property && property.configurable === false) {
    return
  }

  // 如果对象之前已经预设了getter 或者 setter，则将其取出来
  const getter = property && property.get
  const setter = property && property.set

  // 如果只传了前两个参数那么val的值就是当前obj[key]
  if (arguments.length === 2) {
    val = obj[key]
  }


  // 如果对象的子对象也要进行观测
  let childOb = observe(val)

  Object.defineProperty(obj, key, {
    enumerable: true, // 可枚举
    configurable: true, // 可配置
    get: function reactiveGetter () {
      console.log(`访问属性${key}`)
      // 如果原本对象拥有getter方法则执行
      const value = getter ? getter.call(obj) : val

      // Dep.target 全局属性，指向当前正在计算的watcher
      if (Dep.target) {
        // 收集依赖
        dep.depend()

        if (childOb) {
          /*
            子对象进行依赖收集，其实就是将同一个watcher观察者实例放进了两个depend中，一个是正在本身闭包中的depend，另一个是子元素的depend
          */
          childOb.dep.depend()
          if (Array.isArray(value)) {
            // 是数组则需要对每一个成员都进行依赖收集，如果数组的成员还是数组，则递归。
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newValue) {
      // 通过getter方法获取当前值，与新值进行比较，一致则不需要执行下面的操作
      const value = getter ? getter.call(obj) : val

      if (newValue === value || (newValue !== newValue && value !== value)) {
        // 如果新值与旧值一样就返回，什么都不做。如果存在NaN 也返回，什么都不做
        return
      }

      console.log(`设置属性${key}`, newValue)
      if (setter) {

        // 如果原本对象拥有setter方法则执行setter

        setter.call(obj, newValue)
      } else {
        val = newValue
      }
      // 对新值进行观测
      childOb = observe(newValue)
      
      // 通知所有的订阅者watcher
      dep.notify()
    }
  })

}


/* 

  dependArray 用于数组的依赖项收集
*/
export function dependArray (value) {
  for (let e, i = 0, l = value.length; i < l; i++) {
    e = value[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}