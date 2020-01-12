const { identity } = require('./utils')
const config = require('./config')
const { createView } = require('./cli/view')
const readline = require('readline')
readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

const COLS = 20
const ROWS = 20

const game = require('./model')
let state = game.initalizeState(COLS, ROWS)

/** switchDirection :: { key :: (State → State) } */
const switchDirection = Object.entries(config.keys).reduce(
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

/** getStateChange :: Key → (State → State) */
const getStateChange = ({ name }) => switchDirection[name] || identity

/** isQuiting :: Key → Boolean */
const isQuiting = key => key.ctrl && key.name === 'c'

/** Handle key press */
process.stdin.on('keypress', (_, key) => {
  state = isQuiting(key) ? process.exit() : getStateChange(key)(state)
})

const tick = () => {
  state = game.update(state)
  console.clear()
  console.log(createView(state))
}

setInterval(tick, config.updateRate)
