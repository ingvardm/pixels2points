const assert = require('assert')
const pixels2points = require('../src')

describe('configure', function () {
    it('should be exported', function () {
        assert.ok(typeof pixels2points.configure === 'function')
    })

    it('should configure', function () {
        let options = {
            designWidth: 1,
            deviceWidth: 1,
            roundToNearestPoint: true,
            middlewear: () => { },
            cache: true
        }
        pixels2points.configure({ ...options })
        let passed = true
        for (let prop in options) {
            if (options[prop] !== options[prop]) passed = false
        }
        assert.ok(passed)
    })

})

describe('calculate', function () {
    const { calculate, configure } = pixels2points
    const options = {
        designWidth: 720,
        deviceWidth: 530,
        roundToNearestPoint: false,
        middlewear: null,
        cache: false
    }

    it('should be exported', function () {
        assert.ok(typeof calculate === 'function')
    })

    it('should throw error if not configured properly', function () {
        configure({
            designWidth: 0,
            deviceWidth: 0,
            roundToNearestPoint: false,
            middlewear: null,
            cache: false
        })
        assert.throws(calculate.bind(null, 1))
    })

    it('should return number', function () {
        configure({ ...options })
        assert.ok(typeof calculate(100) === 'number')
    })

    it('should return correct ratio after configuration', function () {
        configure({ ...options })
        assert.equal(calculate(options.designWidth / options.deviceWidth), 1)
    })

    it('should return integer when rounding', function () {
        configure({ ...options, roundToNearestPoint: true })
        assert.ok(Number.isInteger(calculate(1)))
    })

    it('should use middleware', function(){
        const customValue = 10
        const middleware = v => customValue
        configure({ ...options, middleware })
        assert.equal(calculate(customValue), customValue)
    })
})