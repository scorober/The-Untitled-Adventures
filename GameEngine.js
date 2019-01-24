import Timer from './Timer.js'

export default class GameEngine {
    constructor() {
        this.entities = []
        this.ctx = null
        this.surfaceWidth = null
        this.surfaceHeight = null
        this.requestAnimFrame =
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            // eslint-disable-next-line no-unused-vars
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60)
            }
    }

    init(ctx) {
        this.ctx = ctx
        this.surfaceWidth = this.ctx.canvas.width
        this.surfaceHeight = this.ctx.canvas.height
        this.timer = new Timer()
        this.startInput()
        console.log('game initialized')
    }

    start() {
        console.log('starting game')
        this.gameLoop()
    }

    gameLoop() {
        this.loop()
        this.requestAnimFrame(this.gameLoop, this.ctx.canvas)
    }

    startInput() {
        console.log('Starting input')

        var getXandY = function (e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top

            if (x < 1024) {
                x = Math.floor(x / 32)
                y = Math.floor(y / 32)
            }

            return { x: x, y: y }
        }

        var that = this

        // event listeners are added here

        this.ctx.canvas.addEventListener(
            'click',
            function (e) {
                that.click = getXandY(e)
                console.log(e)
                console.log(
                    'Left Click Event - X,Y ' + e.clientX + ', ' + e.clientY
                )
            },
            false
        )

        this.ctx.canvas.addEventListener(
            'contextmenu',
            function (e) {
                that.click = getXandY(e)
                console.log(e)
                console.log(
                    'Right Click Event - X,Y ' + e.clientX + ', ' + e.clientY
                )
                e.preventDefault()
            },
            false
        )

        this.ctx.canvas.addEventListener(
            'mousemove',
            function (e) {
                //console.log(e);
                that.mouse = getXandY(e)
            },
            false
        )

        this.ctx.canvas.addEventListener(
            'mousewheel',
            function (e) {
                console.log(e)
                that.wheel = e
                console.log(
                    'Click Event - X,Y ' +
                    e.clientX +
                    ', ' +
                    e.clientY +
                    ' Delta ' +
                    e.deltaY
                )
            },
            false
        )

        this.ctx.canvas.addEventListener(
            'keydown',
            function (e) {
                if (
                    e.code == 'ArrowLeft' ||
                    e.code == 'ArrowRight' ||
                    e.code == 'ArrowUp' ||
                    e.code == 'ArrowDown'
                ) {
                    that.playerDirection = e.code
                    that.playerMoving = true
                }
                console.log(e)
                console.log(
                    'Key Down Event - Char ' + e.code + ' Code ' + e.keyCode
                )
            },
            false
        )

        this.ctx.canvas.addEventListener(
            'keypress',
            function (e) {
                if (e.code === 'KeyD') that.d = true
                that.chars[e.code] = true
                console.log(e)
                console.log(
                    'Key Pressed Event - Char ' + e.charCode + ' Code ' + e.keyCode
                )
            },
            false
        )

        this.ctx.canvas.addEventListener(
            'keyup',
            function (e) {
                if (e.code == that.playerDirection) {
                    that.playerMoving = false
                }
                console.log(e)
                console.log('Key Up Event - Char ' + e.code + ' Code ' + e.keyCode)
            },
            false
        )

        console.log('Input started')
    }


    addEntity(entity) {
        console.log('added entity')
        this.entities.push(entity)
    }

    draw() {
        this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight)
        this.ctx.save()
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx)
        }
        this.ctx.restore()
    }

    update() {
        var entitiesCount = this.entities.length

        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i]

            entity.update()
        }
    }

    loop() {
        this.clockTick = this.timer.tick()
        this.update()
        this.draw()
    }
}

