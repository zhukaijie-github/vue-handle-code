/* 
  函数主要作用就是给值对象绑定属性
*/
export  function def (data, key, val, enumerable, configurable) {
  // enumerable 默认不可枚举，configurable默认为true, 可以配置
  Object.defineProperty(data, key, {
    value: val,
    enumerable: enumerable || false,
    configurable: configurable || true,
    writable: true
  })
}