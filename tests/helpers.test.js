const h = require('../src/helpers')

describe('helpers', () => {
  const testPredicate = (name, f) => (str, result) =>
    test(`${str} is ${result ? '' : 'not '}a ${name}`, () => {
      expect(f(str)).toBe(result)
    })

  const describePredicate = (f, intputResultPairs) =>
    describe(f.name, () => {
      intputResultPairs.forEach(([input, result, skip = false]) => {
        const t = skip ? test.skip : test
        return t(
          `${input} is ${result ? '' : 'not '}a ${f.name
            .replace('is', '')
            .toLowerCase()}`,
          () => {
            expect(f(input)).toBe(result)
          }
        )
      })
    })

  describePredicate(h.isDigit, [
    ['1', true],
    ['0', true],
    ['9', true],
    ['a', false],
    ['12', false],
    ['-', false],
  ])

  describePredicate(h.isAlpha, [
    ['a', true],
    ['z', true],
    ['b', true],
    ['ba', false],
    ['+', false],
    ['a-', false],
  ])

  describePredicate(h.isAlphaNum, [
    ['1', true],
    ['0', true, true],
    ['9', true, true],
    ['12', false],
    ['-', false, true],
    ['a', true, true],
    ['z', true, true],
    ['b', true, true],
    ['ba', false, true],
    ['+', false, true],
    ['a-', false, true],
  ])

  describePredicate(h.isLetter, [
    ['a', true],
    ['b', true],
    ['_', true],
    ['\n', false],
    ['abf', false],
  ])

  describePredicate(h.isSpace, [
    [' ', true],
    ['\t', true],
    ['a', false],
    [' a', false, true],
    ['\ta', false, true],
    ['a ', false, true],
    ['a\t', false, true],
    ['_afe', false, true],
  ])
})
