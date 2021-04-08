import Observer from './Observer.js'

/*
  函数用于检测对象数据上是否含有Observer实例
*/

export default function observe (value) {
  //如果数据不是对象，则什么都不做
  if (typeof value !== 'object') return;
  let ob;

  // 判断数据对象上是否含义Observer实例
  if (value.__ob__) {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }

  return ob;
}