const crypto = require('crypto')

function createParams(startTime, duration, scheduleID, startPosition, intervals){
    const endTime = new Date(startTime.getTime() + duration)
    const paramsID = crypto.randomUUID()
    return {startTime, endTime, scheduleID, startPosition, intervals, paramsID}
}

module.exports = createParams