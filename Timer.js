export default class Timer {
    constructor() {
        this.gameTime = 0
        this.maxStep = 0.05
        this.wallLastTimestamp = 0
    }

    tick() {
        var wallCurrent = Date.now()
        var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000
        this.wallLastTimestamp = wallCurrent

        var gameDelta = Math.min(wallDelta, this.maxStep)
        this.gameTime += gameDelta
        return gameDelta
    }
}