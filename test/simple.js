const test = require('tape')
const fingerprint = require('..')

const code = `
const xxbla = function(xxx, yyy) {
  vvv()
  var i;
  for(i=0; i<=100+200; i++) {
       xxx(i)
       yyy(i+100000)
  } // a comment bla 
  console.log("reachable")
  return {a: xxx(0) + yyy(1), xxx: xxx, z: z};
    
    console.log("  xxx unreachable");
}
module.exports = xxbla(Math.sin, Math.cos)
`

const fp = fingerprint(code)

test("fingerprint doesn't change when unreachable code is removed", t=>{
  t.equal(fingerprint(`
const xxbla = function(xxx, yyy) {
  vvv()
  var i;
  for(i=0; i<=100+200; i++) {
       xxx(i)
       yyy(i+100000)
  } // a comment bla 
  console.log("reachable")
  return {a: xxx(0) + yyy(1), xxx: xxx, z: z};
}
module.exports = xxbla(Math.sin, Math.cos)
  `), fp)
  t.end()
})

test("fingerprint doesn't change when code is reformatted", t=>{
  t.equal(fingerprint(`
const xxbla = function(xxx, yyy) {
  vvv(); var i;
  for(i=0; i<=100+200; i++) {
   xxx(i)
   yyy(i+100000)
  } // a comment bla 
  console.log("reachable")
  return {
    a: xxx(0) + yyy(1),
    xxx: xxx,
    z: z
  };
}
module.exports = xxbla(Math.sin, Math.cos)
  `), fp)
  t.end()
})

test("fingerprint doesn't change when comments are added or removed", t=>{
  t.equal(fingerprint(`
const xxbla = function(xxx, yyy) {
  // my nice code
  vvv(); var i;
  for(i=0; i<=100+200; i++) {
   xxx(i)
   yyy(i+100000)
  }
  console.log("reachable")
  return {
    a: xxx(0) + yyy(1),
    xxx: xxx,
    z: z
  };
}
module.exports = xxbla(Math.sin, Math.cos)
  `), fp)
  t.end()
})

test("fingerprint doesn't change when things are renamed", t=>{
  t.equal(fingerprint(`
const myFunc = function(_xxx, _yyy) {
  vvv(); var i;
  for(i=0; i<=100+200; i++) {
   _xxx(i)
   _yyy(i+100000)
  }
  console.log("reachable")
  return {
    a: _xxx(0) + _yyy(1),
    xxx: _xxx,
    z: z
  };
}
module.exports = myFunc(Math.sin, Math.cos)
  `), fp)
  t.end()
})

test("fingerprint does change when the code's effect changes", t=>{
  t.notEqual(fingerprint(`
const myFunc = function(_xxx, _yyy) {
  vvv(); var i;
  for(i=0; i<=100+200; i++) {
   _xxx(i)
   _yyy(i+100000)
  }
  console.log("reachable")
  return {
    a: _xxx(0) + _yyy(1),
    _xxx,
    z: z
  };
}
module.exports = myFunc(Math.sin, Math.cos)
  `), fp)
  t.end()
})
