const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: true
})

const intervals = [55,4,1,55,4,1]//.reduce((a,c,i) => {a.push(a[i]+c);return a},[0])
// intervals.shift()

const pattern = JSON.parse('[{"east":"y","west":"y","north":"r","south":"r"},{"east":"r","west":"r","north":"r","south":"r"},{"east":"r","west":"r","north":"g","south":"g"},{"east":"r","west":"r","north":"y","south":"y"},{"east":"r","west":"r","north":"r","south":"r"},{"east":"g","west":"g","north":"r","south":"r"}]')


// const sleep = s => {
//     return new Promise(resolve => {
//       setTimeout(resolve, s * 1000)
//     })
//   }
  
// const somethingAsync = async t => {
//     await sleep(t)
//     return t
// }



const directionIndexMap = {
    east: 0,
    south: 1,
    west: 2,
    north: 3
}

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

    function sendSignals(intervals){
        let jed = [...intervals]
        jed.reverse()
        let len = jed.length
        let i = len-1
    
        return setTimeout(function run() {
            if(i<= 0)return
            
            const payload = pattern[len-i]
            console.log(`iteration ${len-i}, payload ${JSON.stringify(payload)}`)
            socket.emit('signal', payload)
            i--
            setTimeout(run, jed[i]*100)
            
        }, jed[len-1]*100)
    }

    sendSignals(intervals)
    
    
    /*while (true){

        (async () => {
            return await intervals.map(async (e, i) => {
              
              console.log("time: ", (Date.now() - now) / 1000)
              await somethingAsync(e)
              
              
              return e
            })
        })()
    
        
    }*/
})

httpServer.listen(3000)