const pixels2points = require('pixels2points')

const calcSize = pixels2points.calculate

// configure device and design width in pixels
pixels2points.configure({
    deviceWidth: 640,
    designWidth: 750,
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

// configure pixels2points to use custom middleware function
pixels2points.configure({
    roundToNearestPoint: false,
    middleware: myRoundingFunction
})

console.log('rounded down', calcSize(200)) // 170

// run with parameters
var buttonWidth = calcSize(200, {
    deviceWidth: 720,
    middleware: points => points > 150 ? 120 : 100
})

console.log('responsive button width = ', buttonWidth) // 120

// use chached values for better performance

pixels2points.configure({
    cache: true,
    middleware: null // Dont forget to reset previously configured parameters
})

var buttonWidthA = calcSize(200)

console.log('200 isn\'cached, calculating...', buttonWidthA)

var buttonWidthB = calcSize(200)

console.log('200 IS cached, returning chached value', buttonWidthB)