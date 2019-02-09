import { ANIMATIONS as ANIMS, STATES, ANIMATION_RATES as AR, DIRECTIONS, ASSET_PATHS, SPELLS, KEYS } from '../../utils/Const.js'
import Character from '../Character.js'
import AStarPathfinding from '../../utils/AStarPathfinding.js'
import Map from '../../world/Map.js'
import Effect from '../../entities/Effect.js'

export default class PlayableCharacter extends Character {
    constructor(game, spritesheet, x, y) {
        super(game, x, y)
        this.scale = 1.3
        this.width = 64
        this.height = 64
        this.oversizeWidth = 192
        this.oversizeHeight = 192
        this.oversizeOffset = 85
        this.animationRates = this.getDefaultAnimationRates()
        this.animations = this.getAnimations(spritesheet)
        if (this.animations[ANIMS.OversizeNorth] != false) {
            this.oversize = true
        }
        this.animation = this.animations[ANIMS.StandEast]
        this.states[STATES.Pathfinding] = false
        this.path = null

        this.speed = 110
    }

    update() {
        //super.update()
        if (this.states[STATES.Following] == false) {
            this.getPathfindingInput()

        }
        if (this.states[STATES.Pathfinding]) {
            this.handlePathfinding()
        }
        if (this.game.inputManager.downKeys[KEYS.KeyD] && this.oversize) {
            this.animation = this.animations[ANIMS.OversizeEast]
        }
    }

    draw() {
        this.animation.drawFrame(this.game, this.x, this.y)
        super.draw()
    }

    getPathfindingInput() {
        if (this.game.inputManager.newRightClick) {
            this.game.inputManager.newRightClick = false

            const cam = this.game.camera
            const click = this.game.inputManager.lastRightClickPosition
            const tileSize = this.game.sceneManager.currentScene.map.tileSize
            const endPos = Map.worldToTilePosition({ x: cam.xView + click.x, y: cam.yView + click.y }, tileSize)
            const startPos = Map.worldToTilePosition(this, tileSize)

            const pathfindingArray = this.game.sceneManager.currentScene.map.getPathfindingArray()
            const result = new AStarPathfinding(pathfindingArray, [startPos.x, startPos.y], [endPos.x, endPos.y]).calculatePath()
            if (result.length > 0) {
                this.states[STATES.Pathfinding] = true
                this.states[STATES.Moving] = true
                this.path = result
            }
        }
    }

    handlePathfinding() {
        const nextTile = { x: this.path[0][0], y: this.path[0][1] }
        const tilePosition = Map.tileToWorldPosition(nextTile, this.game.sceneManager.currentScene.map.tileSize)
        let dx = tilePosition.x - this.x
        let dy = tilePosition.y - this.y
        const length = Math.sqrt(dx * dx + dy * dy)
        if (length < 10) {
            if (this.path.length > 1) {
                this.path.splice(0, 1)
            } else {
                this.x = tilePosition.x
                this.y = tilePosition.y
                this.states[STATES.Pathfinding] = false
                this.states[STATES.Moving] = false
                this.setStandingAnimation()

            }
        } else {
            dx = dx / length
            dy = dy / length
            dx = dx * this.game.clockTick * this.speed
            dy = dy * this.game.clockTick * this.speed
            this.setMovingAnimation(dx, dy)
            this.x += dx
            this.y += dy
        }

    }

    setMovingAnimation(dx, dy) {
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
                this.direction = DIRECTIONS.East
                this.animation = this.animations[ANIMS.WalkEast]
            } else {
                this.direction = DIRECTIONS.West
                this.animation = this.animations[ANIMS.WalkWest]
            }
        } else {
            if (dy > 0) {
                this.direction = DIRECTIONS.South
                this.animation = this.animations[ANIMS.WalkSouth]
            } else {
                this.direction = DIRECTIONS.North
                this.animation = this.animations[ANIMS.WalkNorth]
            }
        }
    }

    setStandingAnimation() {
        switch (this.direction) {
            case DIRECTIONS.East:
                this.animation = this.animations[ANIMS.StandEast]
                break
            case DIRECTIONS.West:
                this.animation = this.animations[ANIMS.StandWest]
                break
            case DIRECTIONS.North:
                this.animation = this.animations[ANIMS.StandNorth]
                break
            case DIRECTIONS.South:
                this.animation = this.animations[ANIMS.StandSouth]
        }
    }

    updateEffectTest() {
        if (this.states[STATES.Cooling]) {
            this.updateCoolDown()
        }
        if (this.states[STATES.Cooling] === false) {
            if (this.game.inputManager.downKeys[KEYS.KeyW]) {
                this.explosion()
            }
            if (this.game.inputManager.downKeys[KEYS.KeyQ]) {

                this.mage([this.x + 100, this.y + 100])
            }
        }
    }

    mage(pos) {
        this.coolDown = 0
        this.states[STATES.Cooling] = true
        this.game.sceneManager.currentScene.addEntity(
            new Effect(this.game, this.game.getAsset(ASSET_PATHS.Mage), SPELLS.Mage, pos)
        )

    }

    explosion() {
        this.coolDown = 0
        this.states[STATES.Cooling] = true
        for (let i = 0; i < 5; i++) {
            const r = this.rng.int(-30, 30)
            const angle = this.rng.float() * Math.PI * 2
            const pos = [this.x + this.width + Math.cos(angle) * r,
                this.y + this.height + Math.sin(angle) * r]
            this.game.sceneManager.currentScene.addEntity(
                new Effect(this.game, this.game.getAsset(ASSET_PATHS.Effect32), SPELLS.Explosion, pos)
            )
        }
    }

    updateCoolDown() {
        if (this.coolDown > this.coolEnd) {
            this.states[STATES.Cooling] = false
        } else {
            this.coolDown += this.game.clockTick * 100
        }
    }
}