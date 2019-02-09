import { ANIMATION_RATES as AR, ANIMATIONS as ANIMS } from '../../../utils/Const.js'
import Component from '../Component'
import AnimationFactory from '../../../AnimationFactory.js'

export default class PlayerCharacterAnimationComponent extends Component {
    /**
     * 
     * @param {Entity} entity The Entity this Component belongs to
     * @param {*} spritesheet The spritesheet
     */
    constructor(entity, spritesheet) {
        super(entity)
        this.spritesheet = spritesheet
        this.animationRates = this.getDefaultAnimationRates()
        this.animations = this.getAnimations()
        this.animation = ANIMS.StandEast
    }

    update() {
        this.animations[this.animation].drawFrame(this.entity.game, this.entity.x, this.entity.y)
    }

    getDefaultAnimationRates() {
        return {
            [AR.Walk]: 0.06,
            [AR.Stand]: 0.6,
            [AR.Death]: 0.15,
            [AR.Spellcast]: 0.15,
            [AR.Thrust]: 0.15,
            [AR.Slash]: 0.15,
            [AR.Shoot]: 0.15,
            [AR.Oversize]: 0.1
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
        animations[ANIMS.StandNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand], { maxFrames: 2 })
        animations[ANIMS.StandWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand], { maxFrames: 2 })
        animations[ANIMS.StandSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand], { maxFrames: 2 })
        animations[ANIMS.StandEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand], { maxFrames: 2 })
        // Shooting
        animations[ANIMS.ShootNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Shoot])
        animations[ANIMS.ShootWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Shoot])
        animations[ANIMS.ShootSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Shoot])
        animations[ANIMS.ShootEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Shoot])
        // Hurt
        animations[ANIMS.DeathSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Death])
        // Oversized animations
        animations[ANIMS.OversizeNorth] = animationFactory.getNextRow(this.oversizeWidth, this.oversizeHeight, this.animationRates[AR.Oversize], { yOffset: this.oversizeOffset })
        animations[ANIMS.OversizeWest] = animationFactory.getNextRow(this.oversizeWidth, this.oversizeHeight, this.animationRates[AR.Oversize], { yOffset: this.oversizeOffset })
        animations[ANIMS.OversizeSouth] = animationFactory.getNextRow(this.oversizeWidth, this.oversizeHeight, this.animationRates[AR.Oversize], { yOffset: this.oversizeOffset })
        animations[ANIMS.OversizeEast] = animationFactory.getNextRow(this.oversizeWidth, this.oversizeHeight, this.animationRates[AR.Oversize], { yOffset: this.oversizeOffset })
        return animations
    }
}