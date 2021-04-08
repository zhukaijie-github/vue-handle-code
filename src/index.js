import observe from './observe'

var obj = {
  a: {
    m: 11
  },
  b: 10,
  g: [22,33,44]
}



observe(obj)


console.log(obj.g.push(66))
console.log(obj.g.push({a:1}))
console.log(obj.g)