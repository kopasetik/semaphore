const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const sendSignals = require('./sendSignals')
const { readFile } = require('fs/promises')
const path = require('path')

const filepath = path.resolve(__dirname, 'usPattern.json')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: true
})

const intervals = [55,4,1,55,4,1]

const roomName = 'the rec room'

const directionIndexMap = {
    east: 0,
    south: 1,
    west: 2,
    north: 3
};

(async () => {
    const data = await readFile(filepath, 'utf8')
    const pattern = JSON.parse(data)

const connectionTracker = [false, false, false, false]

const reachesAllLights = (tracker) => {
    return tracker.every(el => el)
}

io.on("connection", (socket) => {
    console.log(`Connnections - ${io.of('/').sockets.size}`)

    socket.on('register', ({direction}) => {
        connectionTracker[directionIndexMap[direction]] = true
        console.log(`just connected to ${direction} light`)
        if(reachesAllLights(connectionTracker)) console.log('all lights are connected')
    })

    //socket.on('report', announceReport)
    socket.join(roomName)
})

io.once("connection", (socket) => {

    const sumIntervals = intervals.reduce((a,b) => a+b)
    sendSignals(intervals, pattern, socket, io)
    setInterval(() => {if (io.of('/').sockets.size > 0) sendSignals(intervals, pattern, socket, io)}, sumIntervals*500)

})

httpServer.listen(3000)

})()