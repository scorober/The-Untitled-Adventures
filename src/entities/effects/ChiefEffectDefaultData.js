import {
    ANIMATIONS as ANIMS,
    ANIMATION_RATES as AR,
    ASSET_PATHS
} from '../../utils/Const.js'

const yOffset = 80


export default {
    Attributes: {
        Damage: 10,
        Radius: 15,
        Speed: 300,
        SpellPower: 12,
        INT: 1,
        Name: 'CHIEFEFFECT'
    },

    AnimationConfig: {
        Scale: 1,
        Spritesheet: ASSET_PATHS.MageEffects,
        InitialAnimation: ANIMS.Effect0,
        AnimationRates: {
            [AR.Projectile]: .15,
            [AR.Boost]: .15,
            [AR.Impact]: .13
        },
        AnimationData: {
            [ANIMS.Impact]: {
                frames: 11,
                rate: AR.Impact,
                
                options: {
                    width: 192,
                    height: 192,
                    maxFrames: 11,
                    scale: .5,
                    yOffset: yOffset,
                }
            },
            [ANIMS.Projectile]: {
                frames: 9,
                rate: AR.Projectile,
                options: {
                    width: 32,
                    height: 32,
                    yOffset: yOffset
                }
            },
        }
    }
}