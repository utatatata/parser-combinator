# parser-combinator

Light-weight parser combinator

## Requirements

- Node v8 or later
- Yarn

## Usage

```
const pc = require('parser-combinator')

const string = pc.apply(cs => cs.join())(
  pc.ignoreFormer(pc.char('"'))(
    pc.ignoreLatter(pc.many(pc.satisfy(chr => chr !== '"')))(pc.char('"'))
  )
)

string('"abc"def') // => [ 'abc', [ 'd', 'e', 'f' ] ]
```
