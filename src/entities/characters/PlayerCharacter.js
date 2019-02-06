import { ANIMATIONS as ANIMS, STATES, DIRECTIONS, KEYS, ANIMATION_RATES as AR, ASSET_PATHS, SPELLS } from '../../utils/Const.js'
import Character from './Character.js'
import Random from '../../utils/Random.js'
import Effect from '../Effect.js'
import AnimationFactory from '../../AnimationFactory.js';

export default class PlayableCharacter extends Character {
    constructor(game, spritesheet, pos) {
        super(game, pos)
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
        const animations = []
        const animationFactory = new AnimationFactory(spritesheet, this.scale)
        // Spellcasting
        animations[ANIMS.SpellcastNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Spellcast])
        animations[ANIMS.SpellcastWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Spellcast])
        animations[ANIMS.SpellcastSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Spellcast])
        animations[ANIMS.SpellcastEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Spellcast])
        // Thrusting
        animations[ANIMS.ThrustNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Thrust])
        animations[ANIMS.ThrustWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Thrust])
        animations[ANIMS.ThrustSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Thrust])
        animations[ANIMS.ThrustEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Thrust])
        // Walk cycle
        animations[ANIMS.WalkNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        animations[ANIMS.WalkWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        animations[ANIMS.WalkSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        animations[ANIMS.WalkEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        // Slashing
        animations[ANIMS.SlashNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Slash])
        animations[ANIMS.SlashWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Slash])
        animations[ANIMS.SlashSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Slash])
        animations[ANIMS.SlashEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Slash])
        // Standing (modified slashing)
        animationFactory.rewindFactory(4, 4 * this.height)
        animations[ANIMS.StandNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand], true, 2)
        animations[ANIMS.StandWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand], true, 2)
        animations[ANIMS.StandSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand], true, 2)
        animations[ANIMS.StandEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand], true, 2)
        // Shooting
        animations[ANIMS.ShootNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Shoot])
        animations[ANIMS.ShootWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Shoot])
        animations[ANIMS.ShootSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Shoot])
        animations[ANIMS.ShootEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Shoot])
        // Hurt
        animations[ANIMS.DeathSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Death])
        return animations
    }
}