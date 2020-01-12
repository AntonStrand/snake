const {
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

/** initalizeState :: (Number, Number) → State */
const initalizeState = (cols, rows) => ({
  directions: [RIGHT],
  snake: [{ x: 0, y: parseInt(rows / 2) }],
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

/** willCrash :: State -> Boolean */
const willCrash = state =>
  !isWithinMatrix(state) || !!state.snake.find(pointEq(nextHead(state)))

/** lastMove :: State -> Point */
const lastMove = pipe(prop('directions'), last)

/** isValidMove :: Point → State → Boolean */
const isValidMove = state => move =>
  !pointEq(move)(lastMove(state)) && !pointOp(move)(lastMove(state))

const nextHead = ({ snake, directions }) => ({
  x: head(snake).x + last(directions).x,
  y: head(snake).y + last(directions).y
})

const nextSnake = state =>
  willCrash(state) ? [] : [nextHead(state), ...init(state.snake)]

const nextDirections = pipe(
  prop('directions'),
  ifElse(pipe(prop('length'), gt(1)))(tail)(identity)
)

const update = applySpec({
  cols: prop('cols'),
  rows: prop('rows'),
  directions: nextDirections,
  snake: nextSnake,
  apple: prop('apple')
})

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
