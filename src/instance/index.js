import observe from "../observer/observe";
import { proxy } from "../utils/index";
import { query } from "../utils/index";
import { mountComponent } from "./lifecycle";
import {compileToFunctions} from '../compiler/index'

export default class ZVue {
  constructor(options) {
    this.init(options);
    // 表示该实例是vue的实例对象
    this.isVue = true;
  }

  // 初始化
  init(options) {
    this.$options = options || {};
    this.initState();

    // 执行挂载
    if (this.$options.el) {
      this.$mount(this.$options.el);
    }
  }

  // 初始化状态
  initState() {
    /* 
      这里会初始化很多属性，包括props, methods 等等
      我们这里先初始化数据data
    */
    this.initData();
  }

  // 初始化data
  initData() {
    let data = this.$options.data;
    // 把获取到的data数据映射到_data 属性上
    data = this._data = data;
    // 代理数据, 将_data上面的数据代理到this实例属性上
    const keys = Object.keys(data);
    let i = keys.length;
    while (i--) {
      proxy(this, "_data", keys[i]);
    }

    // 劫持数据
    observe(data);
  }

  // 这里简单的初始化 $mount 方法
  $mount(el) {
    el = el ? query(el) : undefined;
    if (el === document.body || el === document.documentElement) {
      // el 不能是body和整个文档html
      return this;
    }

    const options = this.$options;

    if (!options.render) {
      // 获取模版
      let template = options.template

     
      if (template) {
        // 一般只有组件有template
        // 组件这边也判断了好多
      } else {
        //根组件，获取el的outerHtml 获取其el对象的模板html属性
        template = getOuterHTML(el);
      }
      

      /* 
        compileToFunctions
        生成render 和  函数
      */

      const { render, staticRenderFns } = compileToFunctions(
        template,
        {
          shouldDecodeNewlines: false,
          shouldDecodeNewlinesForHref: false,
          delimiters: options.delimiters,
          comments: options.comments,
        },
        this
      );
      options.render = render;
      options.staticRenderFns = staticRenderFns;
    }

    // return mountComponent(this, el)
  }

  // 它被调用的时机有 2 个，一个是首次渲染，一个是数据更新的时候, 作用是将VNode 转换成真实的DOM
  _update(vnode) {
    console.log(vnode);
  }

  // 生成vnode
  _render() {
    const vm = this;
    // 获取生成的render函数
    const { render } = vm.$options;
    console.log(render);
    // let vnode = render.call(vm._renderProxy, vm.$createElement)
  }
}

function getOuterHTML(el) {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    var container = document.createElement("div");
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
}
