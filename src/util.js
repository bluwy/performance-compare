let i = 0

export const increment = () => {
  i++

  // there's 1000 module that imports this
  if (i === 1000) {
    console.log('util.js')
  }
}
