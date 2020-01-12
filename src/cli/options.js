const { controls, minSize } = require('../config')

/** keysToString :: [String] → String */
const keysToString = keys => keys.reduce((str, key, i) =>
str + (i === keys.length-1 ? ' or ' : i > 0  ? ', ' : '') + key.toUpperCase(), '')

/** parseControls :: { k: [String]} → String */
const parseControls = controls =>
  Object.entries(controls).reduce(
    (str, [direction, keys]) =>
      `${str}move ${direction} using the keys ${keysToString(keys)}\n`,
    ''
  )

const instructions = `INSTRUCTIONS:
Try to eat as many apples as possible without dying.
You die by either colliding with the walls or yourself.

CONTROLS:
${parseControls(controls)}
`

const help = `ARGUMENTS:
  1. Number of columns (min: ${minSize})[Integer]
  2. Number of rows (min: ${minSize}) [Integer]
  OR
  1. Size (min: ${minSize}) [Integer]

OPTIONS:
  -b: Play a black and white version of the game
  -h: Help
  -i: Game instruction
`

const options = {
  '--help': help,
  '-h': help,
  '-b': 'Play the game in black and white',
  '-i': instructions
}

/** isOption :: [String] → Boolean */
const isOption = arg => Object.keys(options).includes(arg)

module.exports = {
  help,
  isOption,
  options
}