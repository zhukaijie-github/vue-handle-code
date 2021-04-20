import Observer from './index'
import {isPlainObject} from '../utils/index'

/*
  observe 这个观察者函数主要作用是，给value数据添加__ob__属性
  __ob__属性的值就是观察者类的实例对象

  observe 接受两个参数，第一个是要观测的对象，第二个是布尔值，代表要观察的数据是不是根级数据
*/
export let shouldObserve = true
export default function observe (value, asRootData) {
  // 如果data不是对象就直接返回，什么都不做
  if (typeof value !== 'object') return
  
  // 用于保存__ob__属性
  let ob;
  if (value.hasOwnProperty('__ob__') && value.__ob__ instanceof Observer) {
    // 有__ob__属性就把当前的属性值赋值给ob， 避免重复观察一个对象
    ob = value.__ob__
  } else if (
    shouldObserve &&
    !value.isVue &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value)
  ) {
    
    /* 
      没有__ob__属性， 还要通过以下4个判断来决定是否添加属性

      shouldObserve 默认true 一个开关含义
      isVue 只有vue实例才会有的属性， 避免观测一个vue实例对象
      isPlainObject 和 Array.isArray 传入的对象一定要是数组或者纯对象
      Object.isExtensible 其值可枚举的情况下
    
    */
    ob = new Observer(value)
  }

  // 返回ob 是为了后面的循环递归引用
  return ob
}