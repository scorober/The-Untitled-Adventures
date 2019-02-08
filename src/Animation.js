
export default class Animation {
    constructor(spritesheet, frameWidth, frameHeight, startY, frameDuration, loop, scale, maxFrames = false) {
        this.spritesheet = spritesheet
        this.frameWidth = frameWidth
        this.frameHeight = frameHeight
        this.startY = startY
        this.frameDuration = frameDuration
        this.frames = maxFrames ? maxFrames : this.countSpriteRowColumns(this.spritesheet, this.startY, this.frameWidth, this.frameHeight)
        this.loop = loop
        this.scale = scale
        this.elapsedTime = 0
        this.totalTime = frameDuration * frames
    }

    /**
     * Reverses the animation, so it plays from last frame to first frame
     */
    reverse() {

    }

    /**
     * 
     * @param {HTMLImageElement} spritesheet The entire spritesheet for this Entity 
     * @returns {boolean||number} False if sheet is not oversized, integer value number
     *          of columns with oversized sprites if oversized
     */
    countSpriteRowColumns(spritesheet, startY, frameWidth, frameHeight) {
        const sheetWidth = spritesheet.width
        const sheetHeight = spritesheet.height

        /** Create an offscreen canvas and draw the spritesheet on top */
        const sampleCanvas = document.createElement('canvas')
        sampleCanvas.width = sheetWidth
        sampleCanvas.height = sheetHeight
        sampleCanvas.getContext('2d').drawImage(spritesheet, 0, 0, sheetWidth, sheetHeight)

        /** Interate and check each spot where a sprite may be. Terminate when the pixel is white
         * or when the image file ends.
         */
        const sampleY = startY + frameHeight / 2
        for (let i = 0; i < Math.floor(sheetWidth / frameWidth); i++) {
            const sampleX = frameWidth * i + frameWidth / 2
            /** Check whether the pixel in the center of where a sprite would be is transparent
             * One potential pitfall is if the sprite has a transparent pixel in the center.
             * TODO: Instead, sample a 2x2 area or something.
             */
            if (this.pixelsAreTransparent(sampleCanvas, sampleX, sampleY)) {
                return i
            }
        }
        return Math.floor(sheetWidth / frameWidth)
    }

    /**
     * Checks whether a pixel is fully transparent or out of range of the canvas
     * @param {HTMLCanvasElement} canvas The offscreen Canvas element to sample from
     * @param {number} x The x value of the pixel to sample
     * @param {number} y The y value of the pixel to sample
     * @returns {boolean} True if the pixel is white or off-canvas, false otherwise
     */
    pixelsAreTransparent(canvas, x, y) {
        /** Pixel data is in the form of a 1d array, with [r, g, b, a] for each pixel sampled
         * We're only sampling 1 pixel so it will have 4 elements.
         */
        
        const pixelData = canvas.getContext('2d').getImageData(x - 1, y - 1, 3, 3).data
        let alphaSum = 0
        for (let i = 0; i < 9; i++) {
            alphaSum += pixelData[i * 3 + 3]
        }
        return alphaSum == 0
    }

    drawFrame(game, x, y) {
        console.log(this.loop)
        this.elapsedTime += game.clockTick
        if (this.isDone()) {
        
            if (this.loop) this.elapsedTime = 0
            else this.elapsedTime -= game.clockTick
        }
        const frame = this.currentFrame()
        const startX = (frame % this.frames) * this.frameWidth
        const startY = this.startY
        game.ctx.drawImage(
            this.spritesheet,
            startX,
            startY, // source from sheet
            this.frameWidth,
            this.frameHeight,
            (x + this.frameWidth / 2) - game.camera.xView,
            (y + this.frameHeight / 2) - game.camera.yView,
            this.frameWidth * this.scale,
            this.frameHeight * this.scale
        )
    }

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration)
    }

    isDone() {
        return this.elapsedTime >= this.totalTime
    }
}