import { ANIMATIONS as ANIMS, STATES, ANIMATION_RATES as AR, DIRECTIONS } from '../../utils/Const.js'
import Character from './Character.js'
import Animation from '../../Animation.js'
import AStarPathfinding from '../../utils/AStarPathfinding.js'
import Map from '../../world/Map.js'

export default class PlayableCharacter extends Character {
    constructor(game, spritesheet, x, y) {
        super(game, x, y)
        this.scale = 1.3
        this.width = 64
        this.height = 64
        this.animationRates = this.getDefaultAnimationRates()
        this.animations = this.getAnimations(spritesheet)
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

    getDefaultAnimationRates() {
        return {
            [AR.Walk]: 0.06,
            [AR.Stand]: 0.6,
            [AR.Death]: 0.15,
            [AR.Spellcast]: 0.15,
            [AR.Thrust]: 0.15,
            [AR.Slash]: 0.15,
            [AR.Shoot]: 0.15
        }
    }

    getAnimations(spritesheet) {
        const animations = {
            // Spellcasting
            [ANIMS.SpellcastNorth]: new Animation(spritesheet, this.width, this.height, 7, 1, this.animationRates[AR.Spellcast], 7, true, this.scale),
            [ANIMS.SpellcastWest]: new Animation(spritesheet, this.width, this.height, 7, 2, this.animationRates[AR.Spellcast], 7, true, this.scale),
            [ANIMS.SpellcastSouth]: new Animation(spritesheet, this.width, this.height, 7, 3, this.animationRates[AR.Spellcast], 7, true, this.scale),
            [ANIMS.SpellcastEast]: new Animation(spritesheet, this.width, this.height, 7, 4, this.animationRates[AR.Spellcast], 7, true, this.scale),
            // Thrusting
            [ANIMS.ThrustNorth]: new Animation(spritesheet, this.width, this.height, 8, 5, this.animationRates[AR.Thrust], 8, true, this.scale),
            [ANIMS.ThrustWest]: new Animation(spritesheet, this.width, this.height, 8, 6, this.animationRates[AR.Thrust], 8, true, this.scale),
            [ANIMS.ThrustSouth]: new Animation(spritesheet, this.width, this.height, 8, 7, this.animationRates[AR.Thrust], 8, true, this.scale),
            [ANIMS.ThrustEast]: new Animation(spritesheet, this.width, this.height, 8, 8, this.animationRates[AR.Thrust], 8, true, this.scale),
            // Walk cycle
            [ANIMS.WalkNorth]: new Animation(spritesheet, this.width, this.height, 9, 9, this.animationRates[AR.Walk], 9, true, this.scale),
            [ANIMS.WalkWest]: new Animation(spritesheet, this.width, this.height, 9, 10, this.animationRates[AR.Walk], 9, true, this.scale),
            [ANIMS.WalkSouth]: new Animation(spritesheet, this.width, this.height, 9, 11, this.animationRates[AR.Walk], 9, true, this.scale),
            [ANIMS.WalkEast]: new Animation(spritesheet, this.width, this.height, 9, 12, this.animationRates[AR.Walk], 9, true, this.scale),
            // Slashing
            [ANIMS.SlashNorth]: new Animation(spritesheet, this.width, this.height, 6, 13, this.animationRates[AR.Slash], 6, true, this.scale),
            [ANIMS.SlashWest]: new Animation(spritesheet, this.width, this.height, 6, 14, this.animationRates[AR.Slash], 6, true, this.scale),
            [ANIMS.SlashSouth]: new Animation(spritesheet, this.width, this.height, 6, 15, this.animationRates[AR.Slash], 6, true, this.scale),
            [ANIMS.SlashEast]: new Animation(spritesheet, this.width, this.height, 6, 16, this.animationRates[AR.Slash], 6, true, this.scale),
            // Standing (modified slashing)
            [ANIMS.StandNorth]: new Animation(spritesheet, this.width, this.height, 2, 13, this.animationRates[AR.Stand], 2, true, this.scale),
            [ANIMS.StandWest]: new Animation(spritesheet, this.width, this.height, 2, 14, this.animationRates[AR.Stand], 2, true, this.scale),
            [ANIMS.StandSouth]: new Animation(spritesheet, this.width, this.height, 2, 15, this.animationRates[AR.Stand], 2, true, this.scale),
            [ANIMS.StandEast]: new Animation(spritesheet, this.width, this.height, 2, 16, this.animationRates[AR.Stand], 2, true, this.scale),
            // Shooting
            [ANIMS.ShootNorth]: new Animation(spritesheet, this.width, this.height, 13, 17, this.animationRates[AR.Shoot], 13, true, this.scale),
            [ANIMS.ShootWest]: new Animation(spritesheet, this.width, this.height, 13, 18, this.animationRates[AR.Shoot], 13, true, this.scale),
            [ANIMS.ShootSouth]: new Animation(spritesheet, this.width, this.height, 13, 19, this.animationRates[AR.Shoot], 13, true, this.scale),
            [ANIMS.ShootEast]: new Animation(spritesheet, this.width, this.height, 13, 20, this.animationRates[AR.Shoot], 13, true, this.scale),
            // Hurt
            [ANIMS.DeathSouth]: new Animation(spritesheet, this.width, this.height, 6, 21, this.animationRates[AR.Death], 6, true, this.scale),
        }
        return animations
    }




}