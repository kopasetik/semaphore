const { Server } = require('socket.io')

function sendSignals(intervals, pattern, socket, io, roomName='the rec room'){
    let arr = [...intervals]
    arr.reverse()
    let len = arr.length
    let i = len

    return setTimeout(function run() {
        if(i<= 0)return
        
        const payload = pattern[len-i]
        console.log(`iteration ${len-i}, payload ${JSON.stringify(payload)}`)
        io.to(roomName).emit('signal', payload)
        
        setTimeout(run, arr[i]*500)
        i--
    }, 0)
}

module.exports =  sendSignals
