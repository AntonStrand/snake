const {
  always,
  applySpec,
  head,
  identity,
  init,
  last,
  pipe,
  prop,
  tail,
  gt,
  pointEq,
  pointOp,
  ifElse,
  randomPoint
} = require('./utils')

/** DIRECTIONS */
const RIGHT = { x: 1, y: 0 }
const DOWN = { x: 0, y: 1 }
const LEFT = { x: -1, y: 0 }
const UP = { x: 0, y: -1 }

const getStartSnake = rows => [{ x: 0, y: parseInt(rows / 2) }]

/** initalizeState :: (Number, Number) → State */
const initalizeState = (cols, rows) => ({
  directions: [RIGHT],
  snake: getStartSnake(rows),
  apple: randomPoint(cols)(rows),
  cols,
  rows
})

/** isWithinMatrix :: State → Boolean */
const isWithinMatrix = state => {
  const next = nextHead(state)
  return (
    next.x >= 0 && next.x < state.cols && next.y >= 0 && next.y < state.rows
  )
}

/** willEat :: State → Boolean  */
const willEat = state => pointEq(nextHead(state))(state.apple)

/** willCrash :: State → Boolean */
const willCrash = state =>
  !isWithinMatrix(state) || !!state.snake.find(pointEq(nextHead(state)))

/** lastMove :: State → Point */
const lastMove = pipe(prop('directions'), last)

/** isValidMove :: Point → State → Boolean */
const isValidMove = state => move =>
  !pointEq(move)(lastMove(state)) && !pointOp(move)(lastMove(state))

/** nextHead :: State → Point */
const nextHead = ({ snake, directions }) => ({
  x: head(snake).x + last(directions).x,
  y: head(snake).y + last(directions).y
})

/** nextSnake :: State → [Point] */
const nextSnake = state =>
  willCrash(state)
    ? getStartSnake(state.rows)
    : willEat(state)
    ? [nextHead(state), ...state.snake]
    : [nextHead(state), ...init(state.snake)]

/** isSnake :: State → Point → Boolean */
const isSnake = ({ snake }) => point => snake.some(pointEq(point))

/** positionApple :: State → Point */
const positionApple = state => {
  const position = randomPoint(state.cols)(state.rows)
  return isSnake(state)(position) ? positionApple(state) : position
}

/** nextApple :: State → Point */
const nextApple = ifElse(willEat)(positionApple)(prop('apple'))

/** nextDirections :: State → [Point] */
const nextDirections = ifElse(willCrash)(always([RIGHT]))(
  pipe(prop('directions'), ifElse(pipe(prop('length'), gt(1)))(tail)(identity))
)

/** update :: State → State */
const update = applySpec({
  cols: prop('cols'),
  rows: prop('rows'),
  directions: nextDirections,
  snake: nextSnake,
  apple: nextApple
})

/** addDirection :: Point → State → State */
const addDirection = move => state =>
  isValidMove(state)(move)
    ? { ...state, directions: [...state.directions, move] }
    : state

module.exports = {
  initalizeState,
  update,
  addDirection,
  RIGHT,
  DOWN,
  LEFT,
  UP
}
