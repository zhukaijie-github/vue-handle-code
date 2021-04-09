import observe from './observe'
import Watcher from './Watcher'

var obj = {
  a: {
    m: 11
  },
  b: 10,
  g: [22,33,44]
}



observe(obj)
new Watcher(obj, 'a.m', (n,o) => {
  console.log('☆',n,o)
})
obj.a.m = 88
