import observe from './observe'
import Dep from './Dep'

/*
  该函数是用于将数据属性绑定getter和setter

*/
export default function defineReactive (data, key, val) {
  // 场景dep实例
  const dep = new Dep()

  // 如果只传了两个参数，那么值就默认为当前数据属性值
  if (arguments.length === 2) {
    val = data[key]
  }

  observe(val)

  // 设置getter和setter
  Object.defineProperty(data, key, {
    // 响应式数据可以枚举，可以配置，比如delete
    enumerable: true,
    configurable: true,
    get () {
      console.log(`访问了属性${key}的值`)
      // 如果存在就收集依赖
      if (Dep.target) {
        dep.depend()
      }
      return val
    },
    set (newVal) {
      // 如果数据相同，则什么都不做
      if (val === newVal) return
      console.log(`设置属性${key}的值`, newVal)

      val = newVal
      // 对新值也要进行observe
      observe(newVal)
      
      // 通知依赖更新
      dep.notify()
    }
  })
}