function sum(...args) {
  return args.reduce((a, b) => a + b)
}

function sub(a, b) {
  return a - b
}

module.exports = {
  sum,
  sub
}

