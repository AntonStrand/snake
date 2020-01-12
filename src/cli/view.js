const { dec, pipe, pointEq, prop, range } = require('../utils')
const GRAPHICS = require('../config').graphics

/** isSnake :: State → Point → Boolean */
const isSnake = ({ snake }) => point => snake.some(pointEq(point))

/** isApple :: State → Point → Boolean */
const isApple = ({ apple }) => pointEq(apple)

/** getGraphic :: State → Point → String */
const getGraphic = state => point =>
  isSnake(state)(point)   ? GRAPHICS.snake
  : isApple(state)(point) ? GRAPHICS.apple
  : /* Otherwise */         GRAPHICS.background

/** createBoard :: State → String */
const createBoard = state =>
  range(0)(state.rows)
    .map(y =>
      range(0)(state.cols)
        .map(x => getGraphic(state)({ x, y }))
        .join(GRAPHICS.background)
    )
    .join('\n')

/** score :: State → Number */
const score = pipe(prop('snake'), prop('length'), dec)

const createView = state =>
`${createBoard(state)}
Score: ${score(state)}
Press ctrl+c to quit.`

module.exports = {
  createView
}
