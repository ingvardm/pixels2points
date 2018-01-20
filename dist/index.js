'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _config = {
    designWidth: 0,
    deviceWidth: 0,
    ratio: 1,
    roundToNearestPoint: false,
    middleware: null,
    cache: false
};

var _cachedValues = {};

function _roundToNearestPoint(points) {
    var rounded = Math.floor(points);
    var fraction = points - rounded;

    if (fraction > 0.49) return rounded + 1;else return rounded;
}

function _getCachedValue(ratio, pixels) {
    return _cachedValues[ratio[pixels]];
}

function _setCachedValue(ratio, pixels, value) {
    if (!_cachedValues[ratio]) _cachedValues[ratio] = {};
    _cachedValues[ratio[pixels]] = value;
}

exports.configure = function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$designWidth = _ref.designWidth,
        designWidth = _ref$designWidth === undefined ? _config.designWidth : _ref$designWidth,
        _ref$deviceWidth = _ref.deviceWidth,
        deviceWidth = _ref$deviceWidth === undefined ? _config.deviceWidth : _ref$deviceWidth,
        _ref$roundToNearestPo = _ref.roundToNearestPoint,
        roundToNearestPoint = _ref$roundToNearestPo === undefined ? _config.roundToNearestPoint : _ref$roundToNearestPo,
        _ref$middleware = _ref.middleware,
        middleware = _ref$middleware === undefined ? _config.middleware : _ref$middleware,
        _ref$cache = _ref.cache,
        cache = _ref$cache === undefined ? _config.cache : _ref$cache;

    var ratio = designWidth / deviceWidth;

    _config = _extends({}, _config, {
        designWidth: designWidth,
        deviceWidth: deviceWidth,
        roundToNearestPoint: roundToNearestPoint,
        ratio: ratio,
        middleware: middleware,
        cache: cache
    });
};

exports.calculate = function () {
    var pixels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$roundToNearestP = _ref2.roundToNearestPoint,
        roundToNearestPoint = _ref2$roundToNearestP === undefined ? _config.roundToNearestPoint : _ref2$roundToNearestP,
        _ref2$middleware = _ref2.middleware,
        middleware = _ref2$middleware === undefined ? _config.middleware : _ref2$middleware,
        _ref2$designWidth = _ref2.designWidth,
        designWidth = _ref2$designWidth === undefined ? _config.designWidth : _ref2$designWidth,
        _ref2$deviceWidth = _ref2.deviceWidth,
        deviceWidth = _ref2$deviceWidth === undefined ? _config.deviceWidth : _ref2$deviceWidth;

    var _config2 = _config,
        ratio = _config2.ratio,
        cache = _config2.cache;

    if (!designWidth) throw new Error('Design width is not set');
    if (!deviceWidth) throw new Error('Dvice width is not set');
    if (!pixels) return 0;

    var dp = _getCachedValue(ratio, pixels) || pixels / ratio;

    if (cache) _setCachedValue(ratio, pixels, dp);

    if (roundToNearestPoint) dp = _roundToNearestPoint(dp);
    if (middleware) dp = middleware(dp);

    return dp;
};