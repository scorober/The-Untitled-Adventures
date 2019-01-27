export default class InputManager {
    constructor() {
        this.ctx = null
        this.downKeys = {}
        // (x, y) coordinate: Current mouse position over the canvas
        this.mousePosition = null
        // (x, y) coordinate: Right clicks, left clicks, all overwrite this value
        this.lastMouseClickPosition = null
        // (e) Event object: Last mouse wheel event stored here
        this.mouseWheel = null
    }

    registerEventListeners(ctx) {
        this.ctx = ctx

        this.ctx.canvas.addEventListener('click',
            e => { this.lastMouseClickPosition = this.getXandY(e) },
            false
        )

        this.ctx.canvas.addEventListener('contextmenu',
            e => {
                this.lastMouseClickPosition = this.getXandY(e)
                e.preventDefault()
            },
            false
        )

        this.ctx.canvas.addEventListener('mousemove',
            e => { this.mousePosition = this.getXandY(e) },
            false
        )

        this.ctx.canvas.addEventListener('mousewheel',
            e => { this.mouseWheel = e }, false)

        this.ctx.canvas.addEventListener('keydown',
            e => {
                /** e.code cooresponds to strings describing the key like ArrowUp, ArrowDown, KeyE, KeyW, Digit5, e.t.c */
                this.downKeys[e.code] = true
            },
            false
        )

        this.ctx.canvas.addEventListener('keyup',
            e => { this.downKeys[e.code] = false },
            false
        )

        console.log('Input started')
    }

    getXandY(e) {
        var x = e.clientX - this.ctx.canvas.getBoundingClientRect().left
        var y = e.clientY - this.ctx.canvas.getBoundingClientRect().top

        if (x < 1024) {
            x = Math.floor(x / 32)
            y = Math.floor(y / 32)
        }

        return { x: x, y: y }
    }
}
