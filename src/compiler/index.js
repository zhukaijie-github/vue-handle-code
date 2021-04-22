
import { baseOptions } from './options'
import { createCompiler } from './createCompiler'

const { compile, compileToFunctions } = createCompiler(baseOptions)

export { compile, compileToFunctions }