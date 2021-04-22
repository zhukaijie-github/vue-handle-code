
import { createCompilerCreator } from './createCompilerCreator'
import { parse } from './parse'
import { optimize } from './optimize'
import { generate } from './generate'


//createCompiler是createCompilerCreator的返回值方法，
export const createCompiler = createCompilerCreator(
  function baseCompile (template, options) {
    
    // 使用 parse 函数将模板解析为 AST
    const ast = parse(template.trim(), options)
  
    if (options.optimize !== false) {
      optimize(ast, options)
    }
    const code = generate(ast, options)
    return {
      ast, //AST语法，一个对象
      render: code.render,//这里得到的是render的字符串: "with(this){....}"
      staticRenderFns: code.staticRenderFns
    }
  }
)