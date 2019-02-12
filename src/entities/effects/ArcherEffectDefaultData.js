import {
    ANIMATIONS as ANIMS,
    ANIMATION_RATES as AR,
    ASSET_PATHS
} from '../../utils/Const.js'



export default {
    Attributes: {
        Damage: 10,
    },

    animationConfig: {
        Scale: 1.3,
        Spritesheet: ASSET_PATHS.ArcherEffects,
        AnimationRates: {
            [AR.Projectile]: .15,
            [AR.Impact]: .13
        },
        AnimationData: {
            [ANIMS.Impact]: {
                rate: AR.Boost,
                options: {
                    width: 192,
                    height: 192,
                    // maxFrames: 12
                }
            },
            [ANIMS.Projectile]: {
                rate: AR.Projectile,
                options: {
                    width: 32,
                    height: 64,
                    // maxFrames: 7
                }
            }
        }
    }
}