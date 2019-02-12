import {
    ANIMATIONS as ANIMS,
    ANIMATION_RATES as AR,
    ASSET_PATHS
} from '../../utils/Const.js'



export default {
    Attributes: {
        Damage: 10,
        Radius: 15
    },

    AnimationConfig: {
        Scale: 1.3,
        Spritesheet: ASSET_PATHS.MageEffects,
        AnimationRates: {
            [AR.Projectile]: .15,
            [AR.Boost]: .15,
            [AR.Impact]: .13
        },
        AnimationData: {
            [ANIMS.Effect0]: {
                rate: AR.Boost,
                options: {
                    width: 64,
                    height: 64
                }
            },
            [ANIMS.Projectile]: {
                rate: AR.Boost,
                options: {
                    width: 32,
                    height: 32,
                    MaxFrames: 12
                }
            },
            [ANIMS.Effect1]: {
                rate: AR.Projectile,
                options: {
                    width: 96,
                    height: 96,
                    maxFrames: 10
                }
            },
            [ANIMS.Effect2]: {
                rate: AR.Projectile,
                options: {
                    width: 48,
                    height: 48,
                    maxFrames: 11
                }
            },
            [ANIMS.Impact]: {
                rate: AR.Impact,
                options: {
                    width: 192,
                    height: 192,
                    maxFrames: 11
                }
            }
        }
    }
}