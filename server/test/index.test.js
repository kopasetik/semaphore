const {format}= require('date-fns')
const createParams = require('../createParams.js')
const sendSignals = require('../sendSignals.js')
//const updatePattern = require('../updatePattern.js')

describe('create params', () =>{
    it('creates params with each direction', () =>{
        const startTime = new Date(2021,11,8,5,55,30)
        const duration = 180000
        const scheduleID = 0 
        const startPosition = 3
        const intervals = [55,4,1,55,4,1]

        const params = createParams(
            startTime, duration, scheduleID, startPosition, intervals
           )
        expect(params).toMatchObject({
            scheduleID: 0,
            startPosition: 3,
            intervals: [55,4,1,55,4,1]
        })
        expect(params).toHaveProperty('paramsID')
        expect(format(params.startTime, 'T')).toEqual('1638971730000')
        expect(format(params.endTime, 'T')).toEqual('1638971910000')
        expect(format(params.startTime, "p' ('OOO') on 'PPP")).toEqual('5:55 AM (GMT-8) on December 8th, 2021')
        expect(format(params.endTime, "p' ('OOO') on 'PPP")).toEqual('5:58 AM (GMT-8) on December 8th, 2021')
    })
}) 

describe('send signals', () =>{
    it('', () =>{
            
    })
})

describe('update pattern', () =>{
    it('', () =>{
            
    })
}) 

// handle socket disconnect

// handle socket connection error

// compile data from lights

// confirm client's message receipt

// check that light's instructions are up to date