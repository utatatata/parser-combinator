const h = require('../src/helpers')

describe('combinator', () => {
  describe('helpers', () => {
    const testPredicate = (name, f) => (str, result) =>
      test(`${str} is ${result ? '' : 'not '}a ${name}`, () => {
        expect(f(str)).toBe(result)
      })

    const describePredicate = (f, intputResultPairs) =>
      describe(f.name, () => {
        intputResultPairs.forEach(([input, result]) =>
          test(`${input} is ${result ? '' : 'not '}a ${f.name
            .replace('is', '')
            .toLowerCase()}`, () => {
            expect(f(input)).toBe(result)
          })
        )
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
      ['0', true],
      ['9', true],
      ['12', false],
      ['-', false],
      ['a', true],
      ['z', true],
      ['b', true],
      ['ba', false],
      ['+', false],
      ['a-', false],
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
      [' a', false],
      ['\ta', false],
      ['a ', false],
      ['a\t', false],
      ['_afe', false],
    ])
  })
})
