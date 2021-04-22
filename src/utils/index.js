
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


/**
 * 正则是一个特殊的对象
 * 调用其scource方法可以得到其字符串
 */
export const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/

// 检测非点的字符串，正确的需要的是a.b.c.d 这样的
const bailRE = new RegExp(`[^${unicodeRegExp.source}.$_\\d]`)

/* 
  parsePath 高阶函数，例如： exp = obj.m.n 
  {
    obj: {
      m : {
        n: 2
      } 
    }
  }

  一直循环递归获取到n的值
*/
export function parsePath (exp) {
  if (bailRE.test(exp)) {
    return
  }

  const expArr = exp.split('.')
  return function (obj) {
    for (let i = 0; i < expArr.length; i++) {
      if (!obj) return
      obj = obj[expArr[i]]
    }
    return obj
  }
}


/*
  用于查询dom元素
*/
export function query (el) {
  if (typeof el === 'string') {
    const selected = document.querySelector(el)
    if (!selected) {
      return document.createElement('div')
    }
    return selected
  } else {
    // 不是字符串那就是dom元素
    return el
  }
}