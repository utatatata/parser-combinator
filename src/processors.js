const apply = f => p => ([...src]) => {
  const [result, rest] = p(src)
  return [f(result), rest]
}

module.exports = {
  apply,
}
