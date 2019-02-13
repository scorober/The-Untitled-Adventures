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
        Scale: 2,
        Width: 32,
        Height: 32,
        Spritesheet: ASSET_PATHS.Freeze,
        InitialAnimation: ANIMS.Impact,
        AnimationRates: {
            [AR.Projectile]: .15,
            [AR.Impact]: .13
        },
        AnimationData: {
            [ANIMS.Effect0]: {
                frames: 16,
                rate: AR.Projectile
            },
            [ANIMS.Effect1]: {
                frames: 9,
                rate: AR.Projectile,
                options: {
                    width: 33,
                    height: 16
                }
            },
            [ANIMS.Effect2]: {
                frames: 10,
                rate: AR.Impact,
                options: {
                    width: 50,
                    height: 25
                }
            },
            [ANIMS.Impact]: {
                frames: 16,
                rate: AR.Impact,
                options: {
                    width: 64,
                    height: 64,
                }
            }
        }
    }
}