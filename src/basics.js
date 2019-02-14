const g = require('./generators')
const c = require('./combinators')
const h = require('./helpers')

const anyChar = g.satisfy(_ => true)
const digit = g.satisfy(h.isDigit)
const alpha = g.satisfy(h.isAlpha)
const alphaNum = g.satisfy(h.isAlphaNum)
const letter = g.satisfy(h.isLetter)
const space = g.satisfy(h.isSpace)
const spaces = c.many(space)

module.exports = {
  anyChar,
  digit,
  alpha,
  alphaNum,
  letter,
  space,
  spaces,
}
