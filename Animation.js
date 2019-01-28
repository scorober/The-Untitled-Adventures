export default class Animation {
    constructor(
        spriteSheet,
        frameWidth,
        frameHeight,
        sheetWidth,
        row,
        frameDuration,
        frames,
        loop,
        scale
    ) {
        this.spriteSheet = spriteSheet
        this.frameWidth = frameWidth
        this.frameHeight = frameHeight
        this.sheetWidth = sheetWidth
        this.row = row
        this.frameDuration = frameDuration
        this.frames = frames
        this.loop = loop
        this.scale = scale
        this.elapsedTime = 0
        this.totalTime = frameDuration * frames
    }

    drawFrame(tick, game, x, y) {
        this.elapsedTime += tick
        if (this.isDone()) {
            if (this.loop) this.elapsedTime = 0
            else this.elapsedTime -= tick
        } 
        // else {
        //   console.log(this.elapsedTime);
            
        // }
        var frame = this.currentFrame()
        var xindex = 0
        var yindex = 0
        xindex = frame % this.sheetWidth
        yindex = this.frameHeight * (this.row - 1)

        game.ctx.drawImage(
            this.spriteSheet,
            xindex * this.frameWidth,
            yindex, // source from sheet
            this.frameWidth,
            this.frameHeight,
            x - game.camera.xView,
            y - game.camera.yView,
            this.frameWidth * this.scale,
            this.frameHeight * this.scale
        )
    }

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration)
    }

    isDone() {
        return this.elapsedTime > this.totalTime
    }
}