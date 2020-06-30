const gravity = 9.8;

module.exports = (height, coff) => {
    const result = [];
    result.push({x: 0, y: height});
    let totalTime = 0;
    for (let i = 0; i < 10; i++){
        totalTime += Math.pow(coff, i)*(Math.sqrt(2*gravity*height)/gravity)
        result.push({x: totalTime, y: 0});
        totalTime += Math.pow(coff, i + 1)*(Math.sqrt(2*gravity*height)/gravity)
        result.push({x: totalTime, y: ( Math.pow(coff, 2*(i+1)) * height )});
    }
    return result;
}