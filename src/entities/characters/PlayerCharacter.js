import { ANIMATIONS, STATES, DIRECTIONS, KEYS } from '../../utils/Const.js'
import Character from './Character.js'
import Animation from '../../Animation.js'
import AStarPathfinding from '../../utils/AStarPathfinding.js'

export default class PlayableCharacter extends Character {
    constructor(game, spritesheet) {
        super(game, spritesheet, 1 * 64, 1 * 64)
        this.pathfinding = false
        this.path = false
        this.speed = 200
    }

    update() {
        //super.update()
        this.handleMovement()
    }

    // overrides character class handleMovement
    // Not really, because super.handlemovement is called next, overwriting all changes made here.
    handleMovement() {
        if (!this.following) {
            if (this.game.inputManager.newRightClick) {
                this.game.inputManager.newRightClick = false

                const cam = this.game.camera
                const click = this.game.inputManager.lastRightClickPosition
                const endPos = this.worldToTilePosition({ x: cam.xView + click.x, y: cam.yView + click.y })
                const startPos = this.worldToTilePosition(this)

                const mapArray = this.game.sceneManager.currentScene.map.getPathfindingArray()
                const myAstar = new AStarPathfinding(mapArray, [startPos.x, startPos.y], [endPos.x, endPos.y])
                const result = myAstar.calculatePath()
                if (result.length > 0) {
                    this.pathfinding = true
                    this.states[STATES.Moving] = true
                    this.path = result
                }

            }
        }
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
        super.draw()
    }

    getAnimations(spritesheet) {
        const animations = {
            // Spellcasting
            [ANIMATIONS.SpellcastNorth]: new Animation(spritesheet, this.width, this.height, 7, 1, this.spellcastingRate, 7, true, this.scale),
            [ANIMATIONS.SpellcastWest]: new Animation(spritesheet, this.width, this.height, 7, 2, this.spellcastingRate, 7, true, this.scale),
            [ANIMATIONS.SpellcastSouth]: new Animation(spritesheet, this.width, this.height, 7, 3, this.spellcastingRate, 7, true, this.scale),
            [ANIMATIONS.SpellcastEast]: new Animation(spritesheet, this.width, this.height, 7, 4, this.spellcastingRate, 7, true, this.scale),
            // Thrusting
            [ANIMATIONS.ThrustNorth]: new Animation(spritesheet, this.width, this.height, 8, 5, this.thrustingRate, 8, true, this.scale),
            [ANIMATIONS.ThrustWest]: new Animation(spritesheet, this.width, this.height, 8, 6, this.thrustingRate, 8, true, this.scale),
            [ANIMATIONS.ThrustSouth]: new Animation(spritesheet, this.width, this.height, 8, 7, this.thrustingRate, 8, true, this.scale),
            [ANIMATIONS.ThrustEast]: new Animation(spritesheet, this.width, this.height, 8, 8, this.thrustingRate, 8, true, this.scale),
            // Walk cycle
            [ANIMATIONS.WalkNorth]: new Animation(spritesheet, this.width, this.height, 9, 9, this.walkCycleRate, 9, true, this.scale),
            [ANIMATIONS.WalkWest]: new Animation(spritesheet, this.width, this.height, 9, 10, this.walkCycleRate, 9, true, this.scale),
            [ANIMATIONS.WalkSouth]: new Animation(spritesheet, this.width, this.height, 9, 11, this.walkCycleRate, 9, true, this.scale),
            [ANIMATIONS.WalkEast]: new Animation(spritesheet, this.width, this.height, 9, 12, this.walkCycleRate, 9, true, this.scale),
            // Slashing
            [ANIMATIONS.SlashNorth]: new Animation(spritesheet, this.width, this.height, 6, 13, this.slashingRate, 6, true, this.scale),
            [ANIMATIONS.SlashWest]: new Animation(spritesheet, this.width, this.height, 6, 14, this.slashingRate, 6, true, this.scale),
            [ANIMATIONS.SlashSouth]: new Animation(spritesheet, this.width, this.height, 6, 15, this.slashingRate, 6, true, this.scale),
            [ANIMATIONS.SlashEast]: new Animation(spritesheet, this.width, this.height, 6, 16, this.slashingRate, 6, true, this.scale),
            // Standing (modified slashing)
            [ANIMATIONS.StandNorth]: new Animation(spritesheet, this.width, this.height, 2, 13, this.standCycleRate, 2, true, this.scale),
            [ANIMATIONS.StandWest]: new Animation(spritesheet, this.width, this.height, 2, 14, this.standCycleRate, 2, true, this.scale),
            [ANIMATIONS.StandSouth]: new Animation(spritesheet, this.width, this.height, 2, 15, this.standCycleRate, 2, true, this.scale),
            [ANIMATIONS.StandEast]: new Animation(spritesheet, this.width, this.height, 2, 16, this.standCycleRate, 2, true, this.scale),
            // Shooting
            [ANIMATIONS.ShootNorth]: new Animation(spritesheet, this.width, this.height, 13, 17, this.shootingRate, 13, true, this.scale),
            [ANIMATIONS.ShootWest]: new Animation(spritesheet, this.width, this.height, 13, 18, this.shootingRate, 13, true, this.scale),
            [ANIMATIONS.ShootSouth]: new Animation(spritesheet, this.width, this.height, 13, 19, this.shootingRate, 13, true, this.scale),
            [ANIMATIONS.ShootEast]: new Animation(spritesheet, this.width, this.height, 13, 20, this.shootingRate, 13, true, this.scale),
            // Hurt
            [ANIMATIONS.DeathSouth]: new Animation(spritesheet, this.width, this.height, 6, 21, this.deathCycleRate, 6, true, this.scale),
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

    worldToTilePosition(obj) {
        const tileSize = this.game.sceneManager.currentScene.map.tileSize
        return {
            x: Math.floor((obj.x + tileSize / 2) / 64),
            y: Math.floor((obj.y + tileSize / 2) / 64)
        }
    }


}