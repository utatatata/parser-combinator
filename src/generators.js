const c = require('./combinators')
const p = require('./processors')

const satisfy = f => ([x, ...xs]) => {
  if (f(x)) {
    return [x, xs]
  } else {
    throw new Error(`the character ${x} is not satisfy ${f}`)
  }
}

const char = chr => satisfy(c => c === chr)

const string = ([...str]) =>
  p.apply(list => list.join(''))(c.sequence(...str.map(char)))

module.exports = {
  satisfy,
  char,
  string,
}
