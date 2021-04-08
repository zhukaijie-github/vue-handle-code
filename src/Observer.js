import {def} from './utils'
import defineReactive from './defineReactive'
import observe from './observe'
import { arrayMethods } from './array'
import Dep from './Dep'
/*
  Observer类的目的就是把一个正常的object对象转换成每个层级属性都是响应式的数据（可以被观察的数据）


  1. 该类是数据观察器，对每个对象添加观察实例
  2. 这个观察器还需要一个辅助函数来判断数据是否已经含有实例
*/


export default class Observer {
  constructor(value) {
    this.value = value
    this.dep = new Dep()
    /* 
      给数据对象添加__ob__属性，属性不可枚举
      this指针是实例对象
    */
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      // value 是数组[]
      // 改变数组对象的原型指向
      Object.setPrototypeOf(value, arrayMethods)
      this.observeArray(value)
    } else {
      // value是对象{}
      this.walk(value)
    }
    
  }

  // 用于遍历对象，对象属性数据劫持（响应式）
  walk (obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  // 遍历数组，因为不知道数组的每个项是什么样的数据类型，所以用observe来对数据进行观察
  observeArray (arr) {
    for (let i = 0; i < arr.length; i++) {
      observe(arr[i])
    }
  }
}