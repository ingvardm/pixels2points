'use strict'

/**
 * 
 */

var _config = {
    designWidth: 0,
    deviceWidth: 0,
    ratio: 1,
    roundToNearestPoint: false,
    middlewear: null,
}

function _roundToNearestPoint(points){
    let rounded = Math.floor(points)
    let fraction = points - rounded

    if(fraction > 0.49) return rounded + 1
    else return rounded
}

exports.configure = function({
        designWidth = _config.designWidth,
        deviceWidth = _config.deviceWidth,
        roundToNearestPoint = _config.roundToNearestPoint,
        middlewear = _config.middlewear
} = {}){
    let ratio = designWidth / deviceWidth

    _config = {
        ..._config,
        designWidth,
        deviceWidth,
        roundToNearestPoint,
        ratio,
        middlewear
    }
}

exports.calculate = function(pixels = 0, {
    roundToNearestPoint = _config.roundToNearestPoint,
    middlewear = _config.middlewear,
    designWidth = _config.designWidth,
    deviceWidth = _config.deviceWidth
} = {}){
    let { ratio } = _config
    if(!designWidth) throw new Error('Design width is not set')
    if(!deviceWidth) throw new Error('Dvice width is not set')
    if(!pixels) return 0
    
    let dp = pixels / ratio

    if(roundToNearestPoint) dp = _roundToNearestPoint(dp)
    if(middlewear) dp = middlewear(dp)

    return dp
}