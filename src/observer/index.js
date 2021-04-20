import { def } from '../utils/index'
import defineReactive from './defineReactive'
import { arrayMethods } from './array'
import observe from './observe'
import Dep from './dep'

/*
  Observer 观察者类， 该类的作用是，将对象数据绑定__ob__属性, 属性指向Observer实例对象
  监听观察每个数据变化
*/

export default class Observer {
  constructor(value) {
    this.value = value
    // 自身属性添加Dep 实例
    this.dep = new Dep()
    // 添加__ob__属性
    def(value, '__ob__', this)
    // value 对象数据类型有两种，一是对象，二是数组
    if (Array.isArray(value)) {
      // 是数组，对于数组用个重写7个原型方法来实现响应式数据，将value数组的原型对象指针指向新生成的数组对象
      value.__proto__ = arrayMethods
      this.observeArray(value)
    } else {
      // 对象
      this.walk(value)
    }
  }

  /* 
    walk 是走，步的意思，就是将数据遍历依次成为响应式数据
  */
  walk (obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  /* 
    observeArray 将数组中项继续观测，可能项也是对象
  */
  observeArray (arr) {
    for (let i = 0; i < arr.length; i++) {
      observe(arr[i])
    }
  }
}

