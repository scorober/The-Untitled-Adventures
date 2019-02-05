import { ANIMATIONS as ANIMS, STATES, DIRECTIONS, KEYS, ANIMATION_RATES as AR } from '../../utils/Const.js'
import Character from './Character.js'
import Animation from '../../Animation.js'
import AStarPathfinding from '../../utils/AStarPathfinding.js'

export default class PlayableCharacter extends Character {
    constructor(game, spritesheet, x, y) {
        super(game, x, y)
        this.scale = 2
        this.width = 64
        this.height = 64
        this.animationRates = this.getDefaultAnimationRates()
        this.animations = this.getAnimations(spritesheet)
        this.animation = this.animations[ANIMS.StandEast]
        this.states[STATES.Pathfinding] = false
        this.path = null

        this.speed = 250
    }

    update() {
        super.update()
        if (this.states[STATES.Following] == false) {
            this.listenForInput()
            this.handleMovement()
        }
    }

    listenForInput() {
        if (this.game.inputManager.newRightClick) {
            this.game.inputManager.newRightClick = false

            const cam = this.game.camera
            const click = this.game.inputManager.lastRightClickPosition
            const endPos = this.worldToTilePosition({ x: cam.xView + click.x, y: cam.yView + click.y })
            const startPos = this.worldToTilePosition(this)

            const pathfindingArray = this.game.sceneManager.currentScene.map.getPathfindingArray()
            const result = new AStarPathfinding(pathfindingArray, [startPos.x, startPos.y], [endPos.x, endPos.y]).calculatePath()
            if (result.length > 0) {
                this.pathfinding = true
                this.states[STATES.Moving] = true
                this.path = result
            }

        }
    }

    // overrides character class handleMovement
    // Not really, because super.handlemovement is called next, overwriting all changes made here.
    handleMovement() {
        if (this.pathfinding) {
            const nextTile = { x: this.path[0][0], y: this.path[0][1] }
            const tilePosition = this.tileToWorldPosition(nextTile)
            let dx = tilePosition.x - this.x
            let dy = tilePosition.y - this.y
            const length = Math.sqrt(dx * dx + dy * dy)
            if (length < 15) {
                if (this.path.length > 1) {
                    this.path.splice(0, 1)

                } else {
                    this.x = tilePosition.x
                    this.y = tilePosition.y
                }
            } else {
                dx = dx / length
                dy = dy / length
                dx = dx * this.game.clockTick * this.speed
                dy = dy * this.game.clockTick * this.speed
                this.x += dx
                this.y += dy
            }
        }
    }


    draw() {
        this.animation.drawFrame(this.game, this.x, this.y)
        super.draw()
    }

    getDirectionInput() {
        if (this.game.inputManager.downKeys[KEYS.ArrowLeft]) {
            this.direction = DIRECTIONS.West
            this.states[STATES.Moving] = true
        }
        else if (this.game.inputManager.downKeys[KEYS.ArrowRight]) {
            this.direction = DIRECTIONS.East
            this.states[STATES.Moving] = true
        }
        else if (this.game.inputManager.downKeys[KEYS.ArrowUp]) {
            this.direction = DIRECTIONS.North
            this.states[STATES.Moving] = true
        }
        else if (this.game.inputManager.downKeys[KEYS.ArrowDown]) {
            this.direction = DIRECTIONS.South
            this.states[STATES.Moving] = true
        }
        else {
            this.states[STATES.Moving] = false
        }
    }

    getDefaultAnimationRates() {
        return {
            [AR.Walk]: 0.1,
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

    tileToWorldPosition(obj) {
        const tileSize = this.game.sceneManager.currentScene.map.tileSize
        return {
            x: obj.x * tileSize,
            y: obj.y * tileSize
        }
    }

    /**
     * Converts from world coordinates (measured in pixels starting from the top left of the Map)
     * to 
     */
    worldToTilePosition(obj) {
        const tileSize = this.game.sceneManager.currentScene.map.tileSize
        return {
            x: Math.floor((obj.x + tileSize / 2) / 64),
            y: Math.floor((obj.y + tileSize / 2) / 64)
        }
    }


}