const b = require('../src/basics')
const c = require('../src/combinators')
const g = require('../src/generators')

describe('combinators', () => {
  describe('combinators', () => {
    describe('sequence', () => {
      test(`parse between parens`, () => {
        expect(
          c.sequence(g.char('('), g.char('a'), g.char(')'))('(a)bc')
        ).toEqual([['(', 'a', ')'], ['b', 'c']])
      })

      test(`parse xyz`, () => {
        expect(
          c.sequence(g.char('l'), g.char('m'), g.char('n'))('lmnop')
        ).toEqual([['l', 'm', 'n'], ['o', 'p']])
      })
    })

    describe('replicate', () => {
      test(`parse a three times`, () => {
        expect(c.replicate(3)(g.char('a'))('aaab')).toEqual([
          ['a', 'a', 'a'],
          ['b'],
        ])
      })

      describe('many', () => {
        test(`parse many z`, () => {
          expect(c.many(g.char('a'))('aaaz')).toEqual([['a', 'a', 'a'], ['z']])
        })

        test(`parse a zero times`, () => {
          expect(c.many(g.char('a'))('z')).toEqual([[], ['z']])
        })
      })

      describe('many1', () => {
        test(`parse many1 z`, () => {
          expect(c.many1(g.char('a'))('aaaz')).toEqual([['a', 'a', 'a'], ['z']])
        })

        test(`parse a zero times with many1 throw Error`, () => {
          expect(() => c.many1(g.char('a'))('z')).toThrowError(Error)
        })
      })

      describe('or', () => {
        test('parse abc by or a b to be success', () => {
          expect(c.or(g.char('a'), g.char('b'))('abc')).toEqual([
            'a',
            ['b', 'c'],
          ])
        })

        test('parse bc by or a b to be success', () => {
          expect(c.or(g.char('a'), g.char('b'))('bc')).toEqual(['b', ['c']])
        })

        test('parse cde by or a b c to be success', () => {
          expect(c.or(g.char('a'), g.char('b'), g.char('c'))('cde')).toEqual([
            'c',
            ['d', 'e'],
          ])
        })
      })

      describe('option', () => {
        test('positive or negative digit', () => {
          expect(c.option(g.char('-'))(b.digit)('-3abc')).toEqual([
            ['-', '3'],
            ['a', 'b', 'c'],
          ])
        })

        test('positive or negative digit', () => {
          expect(c.option(g.char('-'))(b.digit)('3abc')).toEqual([
            ['3'],
            ['a', 'b', 'c'],
          ])
        })
      })

      describe('ignoreFormer', () => {
        test('ignore former', () => {
          expect(c.ignoreFormer(g.char('a'))(g.char('b'))('abc')).toEqual([
            'b',
            ['c'],
          ])
        })
      })

      describe('ignoreLatter', () => {
        test('ignore latter', () => {
          expect(c.ignoreLatter(g.char('a'))(g.char('b'))('abc')).toEqual([
            'a',
            ['c'],
          ])
        })
      })
    })
  })
})
