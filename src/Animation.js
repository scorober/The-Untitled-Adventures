export default class Animation {
    constructor(spritesheet, frameWidth, frameHeight, startY, yOffset, frameDuration, loop, scale, maxFrames = false) {
        this.spritesheet = spritesheet
        this.frameWidth = frameWidth
        this.frameHeight = frameHeight
        this.startY = startY
        this.yOffset = yOffset
        this.frameDuration = frameDuration
        this.frames = maxFrames ? maxFrames : this.countSpriteRowColumns(this.spritesheet, this.startY, this.frameWidth, this.frameHeight)
        this.loop = loop
        this.scale = scale
        this.elapsedTime = 0
        this.totalTime = this.frameDuration * this.frames
    }

    /**
     * 
     * @param {HTMLImageElement} spritesheet The entire spritesheet for this Entity 
     * @returns {booleannumber} False if sheet is not oversized, integer value number
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
        for (let i = 0; i < Math.floor(sheetWidth / frameWidth); i++) {
            const sampleStartPoint = {x: frameWidth * i, y: startY}
            const sampleEndPoint = {x: frameWidth * (i + 1), y: startY + frameHeight }
            /** Check whether the pixel in the center of where a sprite would be is transparent
             * One potential pitfall is if the sprite has a transparent pixel in the center.
             * TODO: Instead, sample a 2x2 area or something.
             */
            if (this.pixelsAreTransparent(sampleCanvas, sampleStartPoint, sampleEndPoint)) {
                return i
            }
        }
        return Math.floor(sheetWidth / frameWidth)
    }

    /**
     * Checks whether a pixel is fully transparent or out of range of the canvas
     * @param {HTMLCanvasElement} canvas The offscreen Canvas element to sample from
     * @param {Object} startPoint The top left point to start sampling
     * @param {Object} endPoint The bottom right point to end sampling from
     * @returns {boolean} True if the pixel is white or off-canvas, false otherwise
     */
    pixelsAreTransparent(canvas, startPoint, endPoint) {
        /** Pixel data is in the form of a 1d array, with [r, g, b, a] for each pixel sampled
         * We're only sampling 1 pixel so it will have 4 elements.
         */
        const dx = endPoint.x - startPoint.x
        const dy = endPoint.y - startPoint.y
        const pixelData = canvas.getContext('2d').getImageData(startPoint.x, startPoint.y, dx, dy).data
        let alphaSum = 0
        for (let i = 0; i < dx; i++) {
            for (let j = 0; j < dy; j++) {
                // j * dx = number of rows, i * 3 + 3 = every 3 pixels
                alphaSum += pixelData[j * dx + i * 3 + 3]
            }
            
        }
        return alphaSum === 0
    }

    drawFrame(game, x, y, angle) {
        this.elapsedTime += game.clockTick
        if (this.isDone()) {
            if (this.loop) this.elapsedTime = 0
            // else this.elapsedTime -= game.clockTick
        }
        const frame = this.currentFrame()
        const startX = (frame % this.frames) * this.frameWidth
        const startY = this.startY

        const offscreenCanvas = document.createElement('canvas')
        const size = Math.max(this.frameWidth * this.scale, this.frameHeight * this.scale)

        offscreenCanvas.width = size
        offscreenCanvas.height = size
        const offscreenCtx = offscreenCanvas.getContext('2d')

        const thirdCanvas = document.createElement('canvas')
        thirdCanvas.width = size
        thirdCanvas.height = size
        const thirdCtx = thirdCanvas.getContext('2d')

            
        thirdCtx.drawImage(
            this.spritesheet,
            startX, 
            startY,
            this.frameWidth, 
            this.frameHeight,
            0, 
            0,
            this.frameWidth * this.scale,
            this.frameHeight * this.scale
        )

        offscreenCtx.save()
        offscreenCtx.translate(size / 2, size / 2)
        offscreenCtx.rotate(angle)
        offscreenCtx.translate(0, 0)
        offscreenCtx.drawImage(thirdCanvas, - (this.frameWidth * this.scale / 2), - (this.frameHeight * this.scale / 2))
        offscreenCtx.restore()
        thirdCtx.clearRect(0,0, size, size)
        game.ctx.drawImage(offscreenCanvas,  (x - (this.frameWidth * this.scale / 2)) - game.camera.xView,(y - (this.frameHeight * this.scale)) + this.yOffset - game.camera.yView)

    }

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration)
    }

    isDone() {
        return this.elapsedTime >= this.totalTime
    }
}