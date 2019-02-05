import { ANIMATIONS as ANIMS, STATES, DIRECTIONS, KEYS, ANIMATION_RATES as AR, ASSET_PATHS, SPELLS } from '../../utils/Const.js'
import Character from './Character.js'
import Animation from '../../Animation.js'
import Random from '../../utils/Random.js'
import Effect from '../Effect.js'

export default class PlayableCharacter extends Character {
    constructor(game, spritesheet, pos) {
        super(game, pos[0], pos[1])
        this.scale = 2
        this.width = 64
        this.height = 64
        this.animationRates = this.getDefaultAnimationRates()
        this.animations = this.getAnimations(spritesheet)
        this.animation = this.animations[ANIMS.StandEast]
        this.states[STATES.Cooling] = false
        this.speed = 250
        this.rng = new Random()
        this.coolEnd = 400
    }

    update() {
        this.updateEffectTest()
        super.update()
        if (this.states[STATES.Following] == false) {
            this.getDirectionInput()
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

    updateEffectTest() {
        if (this.states[STATES.Cooling]) {
            console.log('cooling')
            this.updateCoolDown();
        }
        if (this.states[STATES.Cooling] === false) {
            if (this.game.inputManager.downKeys[KEYS.KeyW]) {
                console.log('cooling off!')
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
            new Effect(this.game, this.game.getAsset(ASSET_PATHS.Mage), pos, SPELLS.Mage)
        )

    }

    explosion() {
        this.coolDown = 0
        this.states[STATES.Cooling] = true
        for (let i = 0; i < 5; i++) {
            const r = this.rng.int(-30, 30)
            const angle = this.rng.float() * Math.PI*2
            const pos = [this.x + this.width + Math.cos(angle) * r, 
                        this.y + this.height + Math.sin(angle) * r]
            this.game.sceneManager.currentScene.addEntity(
                new Effect(this.game, this.game.getAsset(ASSET_PATHS.Effect32), pos, SPELLS.Explosion)
            )
        }
    }
    
    updateCoolDown() {
        if (this.coolDown > this.coolEnd) {
            this.states[STATES.Cooling] = false
        } else {
            this.coolDown += this.game.clockTick *100
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
}