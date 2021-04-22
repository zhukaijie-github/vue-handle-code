/* 
  compile 是一个函数
  返回值为一个compileToFunctions方法
*/

export function createCompileToFunctionFn (compile) {
  // 利用闭包，缓存数据
  const cache = Object.create(null)


  return function compileToFunctions (template, options, vm) {
    // compile方法其实就是对编译好的AST对象和render字符串表达式进行增强了一下
    const compiled = compile(template, options)
    
    const res = {}
    return res
  }
}