const isDigit = chr => /^\d$/.test(chr)
const isAlpha = chr => /^[a-zA-Z]$/.test(chr)
const isAlphaNum = chr => isAlpha(chr) || isDigit(chr)
const isLetter = chr => /^.$/.test(chr)
const isSpace = chr => chr === '\t' || chr === ' '

module.exports = {
  isDigit,
  isAlpha,
  isAlphaNum,
  isLetter,
  isSpace,
}
