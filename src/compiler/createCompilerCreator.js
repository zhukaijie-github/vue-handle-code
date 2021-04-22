import {createCompileToFunctionFn} from './createCompileToFunctionFn'

/*

  createCompilerCreator：需要一个参数baseCompile,其类型为function

*/
export function createCompilerCreator(baseCompile) {
  return function createCompiler(baseOptions) {
    /**
     * 次方法的作用就是解析HTML模板前的参数增强配置
     * 调用后将返回解析和的AST语法树对象和render表达式字符串
     * @param {string}   template
     * @param {object} options 就是entry-runtime-with-compiler.js传递进来的
     * @return {object} compiled
     * */
    function compile (template, options) {
      const finalOptions = {}
      // 执行编译函数，生成ast,render,staticRenderFns
      const compiled = baseCompile(template.trim(), finalOptions)
    }


    return {
      compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  };
}
