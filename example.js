const pixels2points = require('./dist')

const calcSize = pixels2points.calculate

// configure device and design width in pixels
pixels2points.configure({
    deviceWidth: 640,
    designWidth: 750
})

console.log(calcSize(200)) // 170.66666666666666

// use built in roundeing function to round output to nearest integer
pixels2points.configure({
    roundToNearestPoint: true
})

console.log('rounded', calcSize(200)) // 171

const myRoundingFunction = function(points){
    return Math.floor(points)
}

// configure pixels2points to use custom middlewear function
pixels2points.configure({
    roundToNearestPoint: false,
    middlewear: myRoundingFunction
})

console.log('rounded down', calcSize(200)) // 170

// run with parameters
var buttonWidth = calcSize(200, {
    deviceWidth: 720,
    middlewear: points => points > 150 ? 120 : 100
})

console.log('responsive button width = ', buttonWidth) // 120