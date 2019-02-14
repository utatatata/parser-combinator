const h = require('./processors')

const sequence = (...ps) => ([...src]) =>
  ps.reduce(
    ([resultList, src], p) => {
      const [result, rest] = p(src)
      return [[...resultList, result], rest]
    },
    [[], src]
  )

const replicate = n => p => ([...src]) =>
  [...Array(n)].reduce(
    ([resultList, src], _) => {
      const [result, rest] = p(src)
      return [[...resultList, result], rest]
    },
    [[], src]
  )

const many = p => ([...src]) => {
  const resultList = []

  try {
    while (true) {
      const [result, rest] = p(src)
      resultList.push(result)
      src = rest
    }
  } catch (_) {}
  return [resultList, src]
}

const many1 = p => ([...src]) => {
  const [result1, rest1] = p(src)
  const [result2, rest2] = many(p)(rest1)

  return [[result1, ...result2], rest2]
}

const or = (...ps) => ([...src]) => {
  const result = ps.reduce((result, p) => {
    if (result !== null) {
      return result
    }
    try {
      return p(src)
    } catch (_) {
      return null
    }
  }, null)
  if (result === null) {
    throw new Error('or: all parsers failed')
  }
  return result
}

const option = p1 => p2 => ([...src]) => {
  try {
    return sequence(p1, p2)(src)
  } catch (_) {
    return h.apply(x => [x])(p2)(src)
  }
}

const ignoreFormer = p1 => p2 => ([...src]) => {
  const [_, rest] = p1(src)
  return p2(rest)
}

const ignoreLatter = p1 => p2 => ([...src]) => {
  const [result, rest1] = p1(src)
  const [_, rest2] = p2(rest1)
  return [result, rest2]
}

module.exports = {
  sequence,
  replicate,
  many,
  many1,
  or,
  option,
  ignoreFormer,
  ignoreLatter,
}
