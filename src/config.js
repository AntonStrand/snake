module.exports = {
  /** List of keys connected to a direction */
  direction_keys: {
    RIGHT: ['right', 'd', 'l'],
    DOWN: ['down', 's', 'j'],
    LEFT: ['left', 'a', 'h'],
    UP: ['up', 'w', 'k']
  },
  graphics: {
    apple: '\x1b[91m' + '',
    snake: '\x1b[97m' + '•',
    background: ' ',
    colors: {
      background: '\x1b[42m%s\x1b[0m'
    }
  }
}
