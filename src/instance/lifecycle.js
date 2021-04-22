import Watcher from '../observer/watcher'

/* 
  将响应式和识图链接起来的方法,
  这里先省略一些源码中的判断，直接将响应式和识图链接起来
*/

export function mountComponent (vm, el) {
  vm.$el = el
  const updateComponent = function () {
    vm._update(vm._render());
  };
  
  new Watcher(vm, updateComponent, function () { })
}

