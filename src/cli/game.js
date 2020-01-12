const { identity } = require('../utils')
const { createView } = require('./view')
const config = require('../config')
const readline = require('readline')
readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)
const game = require('../model')

const start = (cols, rows) => {
  let state = game.initalizeState(cols, rows)

  /** actionBy :: { key :: (State → State) } */
  const actionBy = Object.entries(config.keys).reduce(
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
  const getStateChange = ({ name: key }) => actionBy[key] || identity

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

  return setInterval(tick, config.updateRate)
}

module.exports = { start }
