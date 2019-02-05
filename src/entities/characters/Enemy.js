import Character from './Character.js'
import { ANIMATIONS as ANIMS, ANIMATION_RATES as AR } from '../../utils/Const.js'

export default class Enemy extends Character {
    constructor(game, x, y) {
        if (new.target == Enemy) {
            throw new TypeError('Should not construct Enemy directly')
        }
        super(game, x, y)
    }

    getDefaultAnimationRates() {
        return {
            [AR.Spellcast]: 0.15,
            [AR.Sit]: 0.1,
            [AR.Stand]: 0.6,
            [AR.Walk]: 0.1
        }
    }

    update() {
        super.update()
    }

    draw() {
        super.draw()
    }
}