
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

  // 如果只传了前两个参数那么val的值就是当前obj[key]
  if (arguments.length === 2) {
    val = obj[key]
  }


  // 如果obj还是对象的话就要在进行观测
  let childOb = observe(val)

  Object.defineProperty(obj, key, {
    enumerable: true, // 可枚举
    configurable: true, // 可配置
    get: function reactiveGetter () {
      console.log(`访问属性${key}`)
      // 收集依赖
      if (Dep.target) {
        dep.depend()

        // 
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(val)) {
            dependArray(val)
          }
        }
      }
      return val
    },
    set: function reactiveSetter (newValue) {
      if (val === newValue) return
      console.log(`设置属性${key}`, newValue)
      val = newValue
      // 对新值进行观测
      childOb =  observe(newVal)
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