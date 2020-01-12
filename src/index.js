const { identity, pointEq } = require('./utils')
const readline = require('readline')
readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

const game = require('./model')
let state = game.initalizeState(8, 8)

/** List of keys connected to a direction */
const DIRECTION_KEYS = {
  RIGHT: ['right', 'd', 'l'],
  DOWN: ['down', 's', 'j'],
  LEFT: ['left', 'a', 'h'],
  UP: ['up', 'w', 'k']
}

/** Each key in DIRECTION_KEY is associated with a direction changing function */
const switchDirection = Object.entries(DIRECTION_KEYS).reduce(
  (savedDirections, [direction, keys]) => ({
    ...savedDirections,
    ...keys.reduce(
      (o, key) =>
        Object.assign({}, o, { [key]: game.addDirection(game[direction]) }),
      {}
    )
  }),
  {}
)

const range = from => to =>
  Array(to - from)
    .fill()
    .map((_, i) => from + i)

const createBoard = state =>
  range(0)(8).map((_, y) =>
    range(0)(8).map((_, x) => (state.snake.some(pointEq({ x, y })) ? '#' : '.'))
  )

const printBoard = board =>
  console.log(board.map(row => row.join(' ')).join('\n'))

/** getStateChange :: Key -> (State -> State) */
const getStateChange = ({ name }) => switchDirection[name] || identity

/** isQuiting :: Key -> */
const isQuiting = key => key.ctrl && key.name === 'c'

/** Handle key press */
process.stdin.on('keypress', (_, key) => {
  state = isQuiting(key) ? process.exit() : getStateChange(key)(state)
})

setInterval(() => {
  state = game.update(state)
  printBoard(createBoard(state))
  console.log(state)
}, 1000)

console.log('Press any key...')
