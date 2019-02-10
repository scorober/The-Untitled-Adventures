import { ANIMATIONS as ANIMS, STATES, ANIMATION_RATES as AR, DIRECTIONS, ASSET_PATHS, SPELLS, KEYS } from '../../utils/Const.js'
import Character from '../Character.js'
import AStarPathfinding from '../../utils/AStarPathfinding.js'
import Map from '../../world/Map.js'
import Effect from '../../entities/Effect.js'

export default class PlayableCharacter extends Character {
    constructor(game, spritesheet, x, y) {
        super(game, x, y)
        
        this.states[STATES.Pathfinding] = false
        this.path = null

        this.speed = 110
    }

    update() {
        //super.update()
        if (this.game.inputManager.downKeys[KEYS.KeyD] && this.oversize) {
            this.animation = this.animations[ANIMS.OversizeEast]
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