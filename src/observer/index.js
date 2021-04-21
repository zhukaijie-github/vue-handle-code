import { def } from '../utils/index'
import defineReactive from './defineReactive'
import { arrayMethods } from './array'
import observe from './observe'
import Dep from './dep'

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

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
      /*
          如果是数组，将修改后可以截获响应的数组方法替换掉该数组的原型中的原生方法，达到监听数组数据变化响应的效果。
      */
      
      // 判断当前环境下对象是否含有__proto__属性
      if ('__proto__' in {}) {
        // 有, 直接将value的原型替换成arrayMethods
        protoAugment(value, arrayMethods)
      } else {
        // 没有就直接在上面定义（覆盖）相关方法来到达监听数组的效果
        copyAugment(value, arrayMethods, arrayKeys)
      }
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



function protoAugment (target, src) {
  target.__proto__ = src
}

function copyAugment (target, src, keys) {
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}