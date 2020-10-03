function randomValsFromArray(arr, numOfVals) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numOfVals);
}

module.exports = {
    randomValsFromArray
}