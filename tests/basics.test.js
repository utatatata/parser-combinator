const b = require('../src/basics')

describe('basics', () => {
  describe('anyChar', () => {
    test('accept a character', () => {
      expect(b.anyChar('a')).toEqual(['a', []])
    })

    test.skip('accept a character from string', () => {
      expect(b.anyChar('abc')).toEqual(['a', ['b', 'c']])
    })
  })
})
