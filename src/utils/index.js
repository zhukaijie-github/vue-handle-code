
const _toString = Object.prototype.toString

/*
  def函数只要作用是在对象上绑定属性

*/
export function def (target, key, val, enumerable) {
  Object.defineProperty(target, key, {
    value: val,
    enumerable: !!enumerable, // 是否可被枚举，用!!将数据转换成boolean类型
    writable: true, // 可以写入
    configurable: true, // 可以被配置
  })
}

/* 
  isPlainObject 函数用来检测数据是否是对象
*/
export function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

/* 
  proxy 代理函数，将target上的sourcekey属性响应式绑定到target自身上去
*/

export function proxy (target, sourceKey, key) {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      return target[sourceKey][key]
    },
    set: function (newValue) {
      target[sourceKey][key] = newValue
    }
  })
}

/* 
  remove 用于移除数组中某个项
*/
export function remove (arr, item) {
  if (arr.length) {
    for (let i = 0; i < arr.length; i++) {
      const index = arr.indexOf(item)
      if ( index>= 0) {
        return arr.splice(index, 1)
      }
    }
  }
}


