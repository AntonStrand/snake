module.exports = {
  /** List of keys for each direction */
  keys: {
    RIGHT: ['right', 'd', 'l'],
    DOWN: ['down', 's', 'j'],
    LEFT: ['left', 'a', 'h'],
    UP: ['up', 'w', 'k']
  },
  graphics: {
    apple: '\x1b[42m\x1b[91m\x1b[0m',
    snake: '\x1b[42m\x1b[97m•\x1b[0m',
    background: '\x1b[42m \x1b[0m'
  },
  updateRate: 80
}
