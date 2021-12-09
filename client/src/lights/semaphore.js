const { io } = require('socket.io-client')
const _ = require('lodash')

const socket = io(':3000')

//const getLightCode = (abbreviation, dictionary) => {
//   dictionary[abbreviation]
// }
const lightDictionary = {
  r: {
    red: true,
    yellow: false,
    green: false
  },
  y: {
    red: false,
    yellow: true,
    green: false
  },
  g: {
    red: false,
    yellow: false,
    green: true
  }
}

//

let light = lightDictionary['r']
//let light = getLightCode('r', lightDictionary)



function semaphore(direction){

  let dir = direction || 'north' 

  console.log(dir)

  socket.on("connect", () => {
    console.log('it is ALIVE')
  })

socket.on('signal', (signals) => {
  console.log(`Time-${Date.now()}`)
  console.log(lightDictionary[signals[dir]])
  //console.log(getLightCode(lightDictionary,signals[dir]))
})

socket.on('disconnect', () => {
  light = lightDictionary['r']
  //light = getLightCode('r', lightDictionary)
  
})

//socket.emit('report')
}

module.exports = semaphore