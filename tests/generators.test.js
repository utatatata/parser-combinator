const g = require('../src/generators')

const toStr = JSON.stringify

describe('generators', () => {
  describe('satisfy', () => {
    const testSatisfy = ({ satisfy, src, expected, skip = false }) => {
      const t = skip ? test.skip : test
      return t(
        `parsing ${src} by satisfy ${satisfy} to be ${toStr(expected)}`,
        () => {
          expect(g.satisfy(satisfy)(src)).toEqual(expected)
        }
      )
    }

    testSatisfy({
      skip: true,
      satisfy: c => c === 'a',
      src: 'abc',
      expected: ['a', ['b', 'c']],
    })
    testSatisfy({
      skip: true,
      satisfy: c => c !== '',
      src: 'ttab',
      expected: ['t', ['t', 'a', 'b']],
    })
    testSatisfy({
      skip: true,
      satisfy: c => c === '"',
      src: '"xyz',
      expected: ['"', ['x', 'y', 'z']],
    })
  })

  describe('char', () => {
    const testChar = ({ chr, src, expected, skip = false }) => {
      const t = skip ? test.skip : test
      t(`parsing ${src} by char ${chr} to be ${toStr(expected)}`, () => {
        expect(g.char(chr)(src)).toEqual(expected)
      })
    }

    testChar({ skip: true, chr: 'a', src: 'abc', expected: ['a', ['b', 'c']] })
    testChar({ skip: true, chr: '_', src: '_', expected: ['_', []] })
    testChar({ skip: true, chr: '&', src: '&aa', expected: ['&', ['a', 'a']] })
  })

  describe('string', () => {
    test('parse abc', () => {
      expect(g.string('abc')('abcde')).toEqual(['abc', ['d', 'e']])
    })

    test.skip('parse zabc by string abc thrwo Error', () => {
      expect(() => g.string('abc')('zabc')).toThrowError(Error)
    })
  })
})
