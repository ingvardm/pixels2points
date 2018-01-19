Description
---
Use this lib to create pixel pirfect designs in web or react-native/native-script projects

Instalation
---
**Installing from git:**
```bash
npm i -S git+https://git@github.com/ingvardm/pixels2points.git#master

yarn add git+https://git@github.com/ingvardm/pixels2points.git#master
```
**Installing from npm:**
```bash

```

**Installing from bower:**
```bash

```

Usage
---

**Require and configure:**
```javascript
const pixels2points = require('node_modules/pixels2points')

const calcSize = pixels2points.calculate

// configure device and design width in pixels
pixels2points.configure({
    deviceWidth: 640,
    designWidth: 750
})

console.log(calcSize(200)) // 170.66666666666666
```

**Use built in roundeing function to round output to nearest integer;**
```javascript
pixels2points.configure({
    roundToNearestPoint: true
})

console.log('rounded ', calcSize(200)) // rounded 171
```

**Configure pixels2points to use custom middlewear function:**
```javascript
const myRoundingFunction = function(points){
    return Math.floor(points)
}

pixels2points.configure({
    roundToNearestPoint: false,
    middlewear: myRoundingFunction
})

console.log('rounded down ', calcSize(200)) // rounded down 170
```

**Run with parameters:**
```javascript
var buttonWidth = calcSize(200, {
    deviceWidth: 720,
    middlewear: points => points > 150 ? 120 : 100
})

console.log('responsive button width = ', buttonWidth)
// responsive button width =  120
```

Development
---

Contributing
---
To contribute to this project follow these [guidelines](https://git-scm.com/book/en/v2/GitHub-Contributing-to-a-Project)


