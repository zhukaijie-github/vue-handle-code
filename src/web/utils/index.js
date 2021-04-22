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