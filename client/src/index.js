const { io } = require('socket.io-client')
const _ = require('lodash')

const socket = io(':3000')

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

let light = lightDictionary['r']

const direction = 'north'

socket.on("connect", () => {
    console.log('it is ALIVE')
  })

socket.on('signal', (signals) => {
  console.log(`Time-${Date.now()}payload-${signals}`)
  console.log(lightDictionary[signals[direction]])
})

socket.on('disconnect', () => {
  light = lightDictionary['r']
  
})

//socket.emit('report')
