import { ANIMATIONS, STATES, DIRECTIONS, KEYS } from '../../utils/Const.js'
import Character from './Character.js'
import Effect from '../Effect.js'
import Animation from '../../Animation.js'

export default class PlayableCharacter extends Character {
    constructor(game, spritesheet) {
        super(game,spritesheet, 0, 450)
    }

    update() {
        super.update()
    }

    // overrides character class handleMovement
    handleMovement() {
        if (!this.following) {
            if (this.game.inputManager.downKeys[KEYS.ArrowLeft]) {
                this.direction = DIRECTIONS.West // Why not save the state in the character or the scene instead of the engine?
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
        super.handleMovement()
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
}