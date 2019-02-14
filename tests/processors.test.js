const b = require('../src/basics')
const p = require('../src/processors')

describe('combinators', () => {
  describe('processors', () => {
    test('apply parseInt to digit', () => {
      expect(p.apply(d => parseInt(d, 10))(b.digit)('4ab')).toEqual([
        4,
        ['a', 'b'],
      ])
    })
  })
})
