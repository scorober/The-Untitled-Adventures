import Animation from './Animation.js'

export default class AnimationFactory {
    /**
     * Slices the spritesheet into rows and returns Animation objects using getNextRow(...)
     * @param {HTMLImageElement} spritesheet The entire spritesheet for this Entity
     * @param {number} scale The scale at which to draw the sprites
     */
    constructor(spritesheet, scale = 1) {
        this.spritesheet = spritesheet
        this.scale = scale

        this.startY = 0
        this.row = 1
    }

    /**
     * Returns the next row of sprites as a single Animation object.
     * @param {number} frameWidth Width of a single sprite on this row
     * @param {number} frameHeight Height of a single sprite on this row
     * @param {number} rate Duration before switching to the next sprite frame
     * @param {boolean} loop Whether to loop this animation
     * @param {boolean or number} maxFrames The maximum number of frames, starting from the left of the spritesheet,
     *                                      which should be included in this animation
     * @returns The animation on the next row, or false if no more rows of sprites exist.
     */
    getNextRow(frameWidth, frameHeight, rate, loop = true, maxFrames = false) {
        if (this.startY + frameHeight <= this.spritesheet.height) {
            const animation = new Animation(this.spritesheet, frameWidth, frameHeight, this.startY, rate, loop, this.scale, maxFrames)
            this.startY += frameHeight
            this.row += 1
            return animation
        } else {
            console.error('getNextRow has reached the bottom of the spritesheet and cannot access another row.')
            return false
        }
    }

    /**
     * Moves the AnimationFactory back to a previous row. This can be useful to create alternative animations
     * based on the frame of a different animation. For example, LPC Standing is a modified Walking animation
     * @param {number} rows The number of rows to reverse
     * @param {number} totalHeight The total height to reverse
     */
    rewindFactory(rows, totalHeight) {
        this.rows -= rows
        this.startY -= totalHeight
    }
}