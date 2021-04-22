import {query} from '../utils/index'

export const mount = function (el) {
  el = el ? query(el) : undefined
  return mountComponent(this, el)
}