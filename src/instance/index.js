import observe from '../observer/observe'
import { proxy } from '../utils/index'

export default class ZVue {
  constructor(options) {
    this.init(options)
    // 表示该实例是vue的实例对象
    this.isVue = true 
  }

  // 初始化
  init (options) {
    this.$options = options || {}
    this.initState()
  }

  // 初始化状态
  initState () {
    /* 
      这里会初始化很多属性，包括props, methods 等等
      我们这里先初始化数据data
    */
    this.initData()
  }

  // 初始化data
  initData () { 
    let data = this.$options.data
    // 把获取到的data数据映射到_data 属性上
    data = this._data = data
    // 代理数据, 将_data上面的数据代理到this实例属性上
    const keys = Object.keys(data)
    let i = keys.length
    while (i--) {
      proxy(this, '_data', keys[i])
    }
    
    // 劫持数据
    observe(data)
  }
}

