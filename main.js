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

Background.prototype.update = function() { }

function Level(
    // rows,
    // cols, 
    tSize,
    setLength,
    tileAtlas
) {
   this.rows = 20
   this.cols =  20
   this.tileAtlas = tileAtlas
   this.tSize = tSize
   this.setLength = setLength
   this.tiles = [7,7,7,5,5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,  
                4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,  
                4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,  
                4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,  
                4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,  
                4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,  
                4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,  
                4,4,4,4,4,4,5,4,4,4,4,4,4,4,4,4,4,4,4,4,  
                4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4, 
                4,4,4,4,4,4,10,4,4,4,4,4,4,4,4,4,4,4,4,4,
                4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
                4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
                4,4,4,4,4,4,12,4,4,4,4,4,4,4,4,4,4,4,4,4,
                4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
                4,4,4,4,4,4,4,34,4,4,4,4,4,4,4,4,4,4,4,4,
                4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
                4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
                4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
                4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
                4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
                4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]

}

//Get type of tile at pos
Level.prototype.getTile = function(col, row) {
    return this.tiles[row * this.cols + col]    
}

//Draw full map... my x's and y's are all fucked up...
Level.prototype.drawMap = function(ctx) {
    for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.cols; c++) {
            let tile = this.getTile(r, c);
            if (tile !== 0) { //or -1? 0 is an index...
                let tileRow = (tile - 1) % this.setLength
                console.log(tileRow)
                ctx.drawImage(
                    this.tileAtlas,
                    ((tile - 1) % this.setLength) * this.tSize,
                    Math.floor((tile - 1) / this.setLength) * this.tSize,
                    this.tSize, 
                    this.tSize,
                    r * this.tSize,  //Placement on canvas
                    c * this.tSize,
                    this.tSize,
                    this.tSize
                )
            }
        }
    }
}


function Map(game, tileAtlas) {
    this.level = new Level(64, 16, tileAtlas)
    this.ctx = game.ctx
    Entity.call(this, game, 0, 450)
}

//This is behavior that can be managed by the scene manager
Map.prototype = new Entity()
Map.prototype.constructor = Map

//Update map based on camera view and when entering a new level
Map.prototype.update = function() {
    Entity.prototype.update.call(this)
}

Map.prototype.draw = function() {
    this.level.drawMap(this.ctx)
    Entity.prototype.draw.call(this)
    
}

// inheritance
function PlayableCharacter(game, spritesheet) {
    let scRate = 0.15
    let thRate = 0.15
    let wcRate = 0.1
    let slRate = 0.08
    let stRate = 0.6
    let shRate = 0.15
    let huRate = 0.15
    this.animations = {
        // Spellcasting
        'sc-n': new Animation(spritesheet, 64, 64, 7, 1, scRate, 7, true, 2),
        'sc-w': new Animation(spritesheet, 64, 64, 7, 2, scRate, 7, true, 2),
        'sc-s': new Animation(spritesheet, 64, 64, 7, 3, scRate, 7, true, 2),
        'sc-e': new Animation(spritesheet, 64, 64, 7, 4, scRate, 7, true, 2),
        // Thrusting
        'th-n': new Animation(spritesheet, 64, 64, 8, 5, thRate, 8, true, 2),
        'th-w': new Animation(spritesheet, 64, 64, 8, 6, thRate, 8, true, 2),
        'th-s': new Animation(spritesheet, 64, 64, 8, 7, thRate, 8, true, 2),
        'th-e': new Animation(spritesheet, 64, 64, 8, 8, thRate, 8, true, 2),
        // Walk cycle
        'wc-n': new Animation(spritesheet, 64, 64, 9, 9, wcRate, 9, true, 2),
        'wc-w': new Animation(spritesheet, 64, 64, 9, 10, wcRate, 9, true, 2),
        'wc-s': new Animation(spritesheet, 64, 64, 9, 11, wcRate, 9, true, 2),
        'wc-e': new Animation(spritesheet, 64, 64, 9, 12, wcRate, 9, true, 2),
        // Slashing
        'sl-n': new Animation(spritesheet, 64, 64, 6, 13, slRate, 6, true, 2),
        'sl-w': new Animation(spritesheet, 64, 64, 6, 14, slRate, 6, true, 2),
        'sl-s': new Animation(spritesheet, 64, 64, 6, 15, slRate, 6, true, 2),
        'sl-e': new Animation(spritesheet, 64, 64, 6, 16, slRate, 6, true, 2),
        // Standing (modified slashing)
        'st-n': new Animation(spritesheet, 64, 64, 2, 13, stRate, 2, true, 2),
        'st-w': new Animation(spritesheet, 64, 64, 2, 14, stRate, 2, true, 2),
        'st-s': new Animation(spritesheet, 64, 64, 2, 15, stRate, 2, true, 2),
        'st-e': new Animation(spritesheet, 64, 64, 2, 16, stRate, 2, true, 2),
        // Shooting
        'sh-n': new Animation(spritesheet, 64, 64, 13, 17, shRate, 13, true, 2),
        'sh-w': new Animation(spritesheet, 64, 64, 13, 18, shRate, 13, true, 2),
        'sh-s': new Animation(spritesheet, 64, 64, 13, 19, shRate, 13, true, 2),
        'sh-e': new Animation(spritesheet, 64, 64, 13, 20, shRate, 13, true, 2),
        // Hurt
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
    if (this.game.playerMoving) {
        if (this.game.playerDirection == 'ArrowUp') {
            this.animation = this.animations['wc-n']
            this.y -= this.game.clockTick * this.speed
        } else if (this.game.playerDirection == 'ArrowRight') {
            this.animation = this.animations['wc-e']
            this.x += this.game.clockTick * this.speed
        } else if (this.game.playerDirection == 'ArrowDown') {
            this.animation = this.animations['wc-s']
            this.y += this.game.clockTick * this.speed
        } else if (this.game.playerDirection == 'ArrowLeft') {
            this.animation = this.animations['wc-w']
            this.x -= this.game.clockTick * this.speed
        }
    } else {
        if (this.game.playerDirection == 'ArrowUp') {
            this.animation = this.animations['st-n']
        } else if (this.game.playerDirection == 'ArrowRight') {
            this.animation = this.animations['st-e']
        } else if (this.game.playerDirection == 'ArrowDown') {
            this.animation = this.animations['st-s']
        } else if (this.game.playerDirection == 'ArrowLeft') {
            this.animation = this.animations['st-w']
        }
    }
    if (this.x > this.ctx.canvas.width + 5) {
        this.x = -5
    } else if (this.y > this.ctx.canvas.height + 5) {
        this.y = -5
    } else if (this.x < -5) {
        this.x = this.ctx.canvas.width + 5
    } else if (this.y < -5) {
        this.y = this.ctx.canvas.height + 5
    }
    Entity.prototype.update.call(this)
}

PlayableCharacter.prototype.draw = function() {
    if (this.game.playerMovement != '') {
        if (this.game.playerMovement == 'ArrowUp') {
            this.y -= this.game.clockTick * this.speed
        } else if (this.game.playerMovement == 'ArrowRight') {
            this.x += this.game.clockTick * this.speed
        } else if (this.game.playerMovement == 'ArrowDown') {
            this.y += this.game.clockTick * this.speed
        } else if (this.game.playerMovement == 'ArrowLeft') {
            this.x -= this.game.clockTick * this.speed
        }
    }
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y)
    Entity.prototype.draw.call(this)
}

AM.queueDownload('./img/RobotUnicorn.png')
AM.queueDownload('./img/mikeschar.png')
AM.queueDownload('./img/mushroomdude.png')
AM.queueDownload('./img/runningcat.png')
AM.queueDownload('./img/background.jpg')
AM.queueDownload('./img/DungeonColor3@64x64.png')

AM.downloadAll(function() {
    var canvas = document.getElementById('gameWorld')
    var ctx = canvas.getContext('2d')

    var gameEngine = new GameEngine()
    gameEngine.init(ctx)
    gameEngine.start()

    // gameEngine.addEntity(
    //     new Background(gameEngine, AM.getAsset('./img/background.jpg'))
    // )

    gameEngine.addEntity(
        new Map(gameEngine, AM.getAsset('./img/DungeonColor3@64x64.png'))
    )

    gameEngine.addEntity(
        new PlayableCharacter(gameEngine, AM.getAsset('./img/mikeschar.png'))
    )

    console.log('All Done!')
})
