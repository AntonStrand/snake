/** randomInt :: Number → Number → Number */
const randomInt = from => to => Math.floor(Math.random() * to + from)

/** randomPoint :: Number → Number → Point */
const randomPoint = cols => rows => ({
  x: randomInt(0)(cols),
  y: randomInt(0)(rows)
})

module.exports = {
  randomPoint
}
