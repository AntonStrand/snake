const game = require('./cli/game')
const { minSize } = require('./config')
const { and, pipe, gt } = require('./utils')
const { help, options, isOption } = require('./cli/options') 

const exit = (status = 0, message = help) => {
  console.log(message)
  process.exit(status)
}

/** isValidInput :: a → Boolean */
const isValidInput = pipe(Number, and(Number.isInteger, gt(minSize-1)))

/** onOne :: [String] → () */
const onOne = ([arg]) =>
  isOption(arg)
    ? exit(0, options[arg])
    : isValidInput(arg)
    ? game.start(arg, arg)
    : exit(1)

/** onTwo :: [String] → () */
const onTwo = ([a, b]) =>
  isValidInput(a) && isValidInput(b)
    ? game.start(a, b)
    : isValidInput(a) && b === '-b'
    ? game.start(a, a, false)
    : isValidInput(b) && a === '-b'
    ? game.start(b, b, false)
    : exit(1)

/** onThree :: [String] → () */
const onThree = args => {
  const dimentions = args.filter(isValidInput)
  dimentions.length === 2 && args.includes('-b')
    ? game.start(...dimentions, false)
    : exit(1)
}

/** parseArguments :: [String] → () */
const parseArguments = args => {
  switch (args.length) {
    case 1: onOne(args); break;
    case 2: onTwo(args); break;
    case 3: onThree(args); break;
    default: exit(1)
  }
}

parseArguments(process.argv.slice(2))
