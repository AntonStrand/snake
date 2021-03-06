/** always :: a → b → a */
const always = x => _ => x

/** applySpec :: { k: (a → b) } → a → { k: b } */
const applySpec = spec => x =>
  Object.keys(spec)
    .map(k => ({ [k]: spec[k](x) }))
    .reduce((obj, o) => ({ ...obj, ...o }), {})

/** dec :: Number → Number */
const dec = x => x - 1

/** head :: [a] → a */
const head = xs => xs[0]

/** identity :: a → a */
const identity = x => x

/** init :: [a] → [a] */
const init = xs => xs.slice(0, -1)

/** last :: [a] → a */
const last = xs => xs[xs.length - 1]

/** pipe :: (((a, b, …, n) → o), (o → p), …, (y → z)) → ((a, b, …, n) → z) */
const pipe = (...fns) => (...args) =>
  fns.reduce((f, g) => (f ? g(f) : g(...args)), undefined)

/** prop :: Number k, String k => k → ({k: a} | [a]) → a | Undefined */
const prop = key => obj => obj[key]

/** tail :: [a] → [a] */
const tail = ([_, ...xs]) => xs

/** range :: Number → Number → [Number] */
const range = from => to =>
  Array(to - from)
    .fill()
    .map((_, i) => from + i)

/**
 * PREDICATES
 */

/** gt :: Number → Number → Boolean */
const gt = x => y => y > x

/** gte :: Number → Number → Boolean */
const gte = x => y => y >= x

/** pointEq :: Point → Point → Boolean */
const pointEq = p1 => p2 => p1.x == p2.x && p1.y == p2.y

/** pointEq :: Point → Point → Boolean */
const pointOp = p1 => p2 => p1.x == -p2.x && p1.y == -p2.y

/**
 * LOGIC
 */

/** ifElse :: (a → Boolean) → (a → b) → (a → c) → a → b | c */
const ifElse = pred => onTrue => onFalse => x =>
  pred(x) ? onTrue(x) : onFalse(x)

/** and :: ((a → Boolean), (a → Boolean)) → a → Boolean */
const and = (f, g) => x => f(x) && g(x)

module.exports = {
  always,
  applySpec,
  dec,
  head,
  identity,
  init,
  last,
  pipe,
  prop,
  tail,
  range,
  gt,
  gte,
  pointEq,
  pointOp,
  ifElse,
  and,
  ...require('./random')
}
