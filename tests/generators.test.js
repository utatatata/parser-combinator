const g = require('../src/generators')

const toStr = JSON.stringify

describe('generators', () => {
  describe('satisfy', () => {
    const testSatisfy = (f, src, result) =>
      test(`parsing ${src} by satisfy ${f} to be ${toStr(result)}`, () => {
        expect(g.satisfy(f)(src)).toEqual(result)
      })

    testSatisfy(c => c === 'a', 'abc', ['a', ['b', 'c']])
    testSatisfy(c => c !== '', 'ttab', ['t', ['t', 'a', 'b']])
    testSatisfy(c => c === '"', '"xyz', ['"', ['x', 'y', 'z']])
  })

  describe('char', () => {
    const testChar = (chr, src, result) =>
      test(`parsing ${src} by char ${chr} to be ${toStr(result)}`, () => {
        expect(g.char(chr)(src)).toEqual(result)
      })

    testChar('a', 'abc', ['a', ['b', 'c']])
    testChar('_', '_', ['_', []])
    testChar('&', '&aa', ['&', ['a', 'a']])
  })

  describe('string', () => {
    test('parse abc', () => {
      expect(g.string('abc')('abcde')).toEqual(['abc', ['d', 'e']])
    })

    test('parse zabc by string abc thrwo Error', () => {
      expect(() => g.string('abc')('zabc')).toThrowError(Error)
    })
  })
})
