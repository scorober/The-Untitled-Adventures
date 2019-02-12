import {
    ANIMATIONS as ANIMS,
    ANIMATION_RATES as AR,
    ASSET_PATHS
} from '../../utils/Const.js'



export default {
    Attributes: {
        Damage: 10,
        Speed: 600
    },
    AnimationConfig: {
        Scale: 1,
        Spritesheet: ASSET_PATHS.Lightning,
        InitialAnimation: ANIMS.Projectile,
        AnimationRates: {
            [AR.Projectile]: .15,
            [AR.Impact]: .13
        },
        AnimationData: {
            [ANIMS.Effect0]: {
                frames: 7,
                rate: AR.Projectile,
                options: {
                    width: 64,
                    height: 64
                }
            },
            [ANIMS.Impact]: {
                frames: 7,
                rate: AR.Projectile,
                options: {
                    width: 96,
                    height: 96,
                }
            },
            [ANIMS.Projectile]: {
                frames: 11,
                rate: AR.Impact,
                options: {
                    width: 48,
                    height: 48,
                }
            }
        }
    }
}