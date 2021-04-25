
import { createCompilerCreator } from './createCompilerCreator'
import { parse } from './parse'
import { optimize } from './optimize'
import { generate } from './generate'


//createCompiler是createCompilerCreator的返回值方法，
export const createCompiler = createCompilerCreator(
  function baseCompile (template, options) {
    
   // 调用 parse 函数将字符串模板解析成抽象语法树(AST)
    const ast = parse(template.trim(), options)
  
    if (options.optimize !== false) {
      // 调用 optimize 函数优化 ast
      optimize(ast, options)
    }
    // 调用 generate 函数将 ast 编译成渲染函数
    const code = generate(ast, options)
    
    return {
      ast, //AST语法，一个对象
      render: code.render,//这里得到的是render的字符串: "with(this){....}"
      staticRenderFns: code.staticRenderFns
    }
  }
)