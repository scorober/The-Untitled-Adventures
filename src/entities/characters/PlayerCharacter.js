import { ANIMATIONS, DIRECTIONS, KEYS } from '../../utils/Constants.js'
import Entity from '../Entity.js'
import Animation from '../../Animation.js'

export default class PlayableCharacter extends Entity {
    constructor(game, spritesheet) {
        super(game, 0, 450)
        this.speed = 100
        this.game = game
        this.spellcastingRate = 0.15
        this.thrustingRate = 0.15
        this.walkCycleRate = 0.1
        this.slashingRate = 0.08
        this.standCycleRate = 0.6
        this.shootingRate = 0.15
        this.deathCycleRate = 0.15
        this.animations = this.getAnimations(spritesheet)
        this.animation = this.animations[ANIMATIONS.StandEast]
    }

    update() {
        /** Handle movement */
        if (this.game.inputManager.downKeys[KEYS.ArrowLeft]) {
            this.direction = DIRECTIONS.West // Why not save the state in the character or the scene instead of the engine?
            this.moving = true
            this.animation = this.animations[ANIMATIONS.WalkWest]
            this.x -= this.game.clockTick * this.speed
        } else if (this.game.inputManager.downKeys[KEYS.ArrowRight]) {
            this.direction = DIRECTIONS.East
            this.moving = true
            this.animation = this.animations[ANIMATIONS.WalkEast]
            this.x += this.game.clockTick * this.speed
        } else if (this.game.inputManager.downKeys[KEYS.ArrowUp]) {
            this.direction = DIRECTIONS.North
            this.moving = true
            this.animation = this.animations[ANIMATIONS.WalkNorth]
            this.y -= this.game.clockTick * this.speed
        } else if (this.game.inputManager.downKeys[KEYS.ArrowDown]) {
            this.direction = DIRECTIONS.South
            this.moving = true
            this.animation = this.animations[ANIMATIONS.WalkSouth]
            this.y += this.game.clockTick * this.speed
        } else {
            this.moving = false
        }
    }

    draw() {
        this.animation.drawFrame(this.game, this.x, this.y)
    }

    getAnimations(spritesheet) {
        const animations = {
            // Spellcasting
            [ANIMATIONS.SpellcastNorth]: new Animation(spritesheet, 64, 64, 7, 1, this.spellcastingRate, 7, true, 2),
            [ANIMATIONS.SpellcastWest]: new Animation(spritesheet, 64, 64, 7, 2, this.spellcastingRate, 7, true, 2),
            [ANIMATIONS.SpellcastSouth]: new Animation(spritesheet, 64, 64, 7, 3, this.spellcastingRate, 7, true, 2),
            [ANIMATIONS.SpellcastEast]: new Animation(spritesheet, 64, 64, 7, 4, this.spellcastingRate, 7, true, 2),
            // Thrusting
            [ANIMATIONS.ThrustNorth]: new Animation(spritesheet, 64, 64, 8, 5, this.thrustingRate, 8, true, 2),
            [ANIMATIONS.ThrustWest]: new Animation(spritesheet, 64, 64, 8, 6, this.thrustingRate, 8, true, 2),
            [ANIMATIONS.ThrustSouth]: new Animation(spritesheet, 64, 64, 8, 7, this.thrustingRate, 8, true, 2),
            [ANIMATIONS.ThrustEast]: new Animation(spritesheet, 64, 64, 8, 8, this.thrustingRate, 8, true, 2),
            // Walk cycle
            [ANIMATIONS.WalkNorth]: new Animation(spritesheet, 64, 64, 9, 9, this.walkCycleRate, 9, true, 2),
            [ANIMATIONS.WalkWest]: new Animation(spritesheet, 64, 64, 9, 10, this.walkCycleRate, 9, true, 2),
            [ANIMATIONS.WalkSouth]: new Animation(spritesheet, 64, 64, 9, 11, this.walkCycleRate, 9, true, 2),
            [ANIMATIONS.WalkEast]: new Animation(spritesheet, 64, 64, 9, 12, this.walkCycleRate, 9, true, 2),
            // Slashing
            [ANIMATIONS.SlashNorth]: new Animation(spritesheet, 64, 64, 6, 13, this.slashingRate, 6, true, 2),
            [ANIMATIONS.SlashWest]: new Animation(spritesheet, 64, 64, 6, 14, this.slashingRate, 6, true, 2),
            [ANIMATIONS.SlashSouth]: new Animation(spritesheet, 64, 64, 6, 15, this.slashingRate, 6, true, 2),
            [ANIMATIONS.SlashEast]: new Animation(spritesheet, 64, 64, 6, 16, this.slashingRate, 6, true, 2),
            // Standing (modified slashing)
            [ANIMATIONS.StandNorth]: new Animation(spritesheet, 64, 64, 2, 13, this.standCycleRate, 2, true, 2),
            [ANIMATIONS.StandWest]: new Animation(spritesheet, 64, 64, 2, 14, this.standCycleRate, 2, true, 2),
            [ANIMATIONS.StandSouth]: new Animation(spritesheet, 64, 64, 2, 15, this.standCycleRate, 2, true, 2),
            [ANIMATIONS.StandEast]: new Animation(spritesheet, 64, 64, 2, 16, this.standCycleRate, 2, true, 2),
            // Shooting
            [ANIMATIONS.ShootNorth]: new Animation(spritesheet, 64, 64, 13, 17, this.shootingRate, 13, true, 2),
            [ANIMATIONS.ShootWest]: new Animation(spritesheet, 64, 64, 13, 18, this.shootingRate, 13, true, 2),
            [ANIMATIONS.ShootSouth]: new Animation(spritesheet, 64, 64, 13, 19, this.shootingRate, 13, true, 2),
            [ANIMATIONS.ShootEast]: new Animation(spritesheet, 64, 64, 13, 20, this.shootingRate, 13, true, 2),
            // Hurt
            [ANIMATIONS.DeathSouth]: new Animation(spritesheet, 64, 64, 6, 21, this.deathCycleRate, 6, true, 2),
        }
        return animations
    }
}