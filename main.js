var AM = new AssetManager()

function Animation(
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

Animation.prototype.drawFrame = function(tick, ctx, x, y) {
    this.elapsedTime += tick
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0
    }
    var frame = this.currentFrame()
    var xindex = 0
    var yindex = 0
    xindex = frame % this.sheetWidth
    yindex = this.frameHeight * (this.row - 1)

    ctx.drawImage(
        this.spriteSheet,
        xindex * this.frameWidth,
        yindex, // source from sheet
        this.frameWidth,
        this.frameHeight,
        x,
        y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale
    )
}

Animation.prototype.currentFrame = function() {
    return Math.floor(this.elapsedTime / this.frameDuration)
}

Animation.prototype.isDone = function() {
    return this.elapsedTime >= this.totalTime
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0
    this.y = 0
    this.spritesheet = spritesheet
    this.game = game
    this.ctx = game.ctx
}

Background.prototype.draw = function() {
    this.ctx.drawImage(this.spritesheet, this.x, this.y)
}

Background.prototype.update = function() {}

// inheritance
function PlayableCharacter(game, spritesheet) {
    let scRate = 0.15
    let thRate = 0.15
    let wcRate = 0.1
    let slRate = 0.08
    let shRate = 0.15
    let huRate = 0.15
    this.animations = {
        'sc-n': new Animation(spritesheet, 64, 64, 7, 1, scRate, 7, true, 2),
        'sc-w': new Animation(spritesheet, 64, 64, 7, 2, scRate, 7, true, 2),
        'sc-s': new Animation(spritesheet, 64, 64, 7, 3, scRate, 7, true, 2),
        'sc-e': new Animation(spritesheet, 64, 64, 7, 4, scRate, 7, true, 2),
        'th-n': new Animation(spritesheet, 64, 64, 8, 5, thRate, 8, true, 2),
        'th-w': new Animation(spritesheet, 64, 64, 8, 6, thRate, 8, true, 2),
        'th-s': new Animation(spritesheet, 64, 64, 8, 7, thRate, 8, true, 2),
        'th-e': new Animation(spritesheet, 64, 64, 8, 8, thRate, 8, true, 2),
        'wc-n': new Animation(spritesheet, 64, 64, 9, 9, wcRate, 9, true, 2),
        'wc-w': new Animation(spritesheet, 64, 64, 9, 10, wcRate, 9, true, 2),
        'wc-s': new Animation(spritesheet, 64, 64, 9, 11, wcRate, 9, true, 2),
        'wc-e': new Animation(spritesheet, 64, 64, 9, 12, wcRate, 9, true, 2),
        'sl-n': new Animation(spritesheet, 64, 64, 6, 13, slRate, 6, true, 2),
        'sl-w': new Animation(spritesheet, 64, 64, 6, 14, slRate, 6, true, 2),
        'sl-s': new Animation(spritesheet, 64, 64, 6, 15, slRate, 6, true, 2),
        'sl-e': new Animation(spritesheet, 64, 64, 6, 16, slRate, 6, true, 2),
        'sh-n': new Animation(spritesheet, 64, 64, 13, 17, shRate, 13, true, 2),
        'sh-w': new Animation(spritesheet, 64, 64, 13, 18, shRate, 13, true, 2),
        'sh-s': new Animation(spritesheet, 64, 64, 13, 19, shRate, 13, true, 2),
        'sh-e': new Animation(spritesheet, 64, 64, 13, 20, shRate, 13, true, 2),
        'hu-s': new Animation(spritesheet, 64, 64, 6, 21, huRate, 6, true, 2),
    }
    this.animation = this.animations['wc-e']
    this.speed = 100
    this.ctx = game.ctx
    Entity.call(this, game, 0, 450)
}

PlayableCharacter.prototype = new Entity()
PlayableCharacter.prototype.constructor = PlayableCharacter

PlayableCharacter.prototype.update = function() {
    this.x += this.game.clockTick * this.speed
    if (this.x > 800) this.x = -230
    Entity.prototype.update.call(this)
}

PlayableCharacter.prototype.draw = function() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y)
    Entity.prototype.draw.call(this)
}

AM.queueDownload('./img/RobotUnicorn.png')
AM.queueDownload('./img/mikeschar.png')
AM.queueDownload('./img/mushroomdude.png')
AM.queueDownload('./img/runningcat.png')
AM.queueDownload('./img/background.jpg')

AM.downloadAll(function() {
    var canvas = document.getElementById('gameWorld')
    var ctx = canvas.getContext('2d')

    var gameEngine = new GameEngine()
    gameEngine.init(ctx)
    gameEngine.start()

    gameEngine.addEntity(
        new Background(gameEngine, AM.getAsset('./img/background.jpg'))
    )

    gameEngine.addEntity(
        new PlayableCharacter(gameEngine, AM.getAsset('./img/mikeschar.png'))
    )

    console.log('All Done!')
})
