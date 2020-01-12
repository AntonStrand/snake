module.exports = {
  /** List of keys for each direction */
  controls: {
    RIGHT: ['right', 'd', 'l'],
    DOWN: ['down', 's', 'j'],
    LEFT: ['left', 'a', 'h'],
    UP: ['up', 'w', 'k']
  },
  graphics: {
    color: {
      apple: '\x1b[42m\x1b[91m\x1b[0m',
      snake: '\x1b[42m\x1b[97m•\x1b[0m',
      background: '\x1b[42m \x1b[0m',
      seperator: '\x1b[42m \x1b[0m'
    },
    bw: {
      apple: '',
      snake: '#',
      background: '.',
      seperator: ' '
    }
  },
  updateRate: 80,
  minSize: 3
}
