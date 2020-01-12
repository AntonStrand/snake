const { dec, pipe, pointEq, prop, range } = require('../utils')
const GRAPHICS = require('../config').graphics

/** isSnake :: State → Point → Boolean */
const isSnake = ({ snake }) => point => snake.some(pointEq(point))

/** isApple :: State → Point → Boolean */
const isApple = ({ apple }) => pointEq(apple)

/** getGraphic :: (String, State) → Point → String */
const getGraphic = (type, state) => point =>
  isSnake(state)(point)   ? GRAPHICS[type].snake
  : isApple(state)(point) ? GRAPHICS[type].apple
  : /* Otherwise */         GRAPHICS[type].background

/** createBoard :: (String, State) → String */
const createBoard = (graphicType, state) =>
  range(0)(state.rows)
    .map(y =>
      range(0)(state.cols)
        .map(x => getGraphic(graphicType, state)({ x, y }))
        .join(GRAPHICS[graphicType].seperator)
    )
    .join('\n')

/** score :: State → Number */
const score = pipe(prop('snake'), prop('length'), dec)

const createView = useColor => state =>
`${createBoard(useColor ? 'color' : 'bw', state)}
Score: ${score(state)}
Press ctrl+c to quit.`

module.exports = {
  createView
}
