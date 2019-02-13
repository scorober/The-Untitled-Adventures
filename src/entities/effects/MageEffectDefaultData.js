import {
    ANIMATIONS as ANIMS,
    ANIMATION_RATES as AR,
    ASSET_PATHS
} from '../../utils/Const.js'



export default {
    Attributes: {
        Damage: 10,
        Radius: 15,
        Speed: 900
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
            [ANIMS.Effect0]: {
                frames: 7,
                rate: AR.Boost,
                options: {
                    width: 64,
                    height: 64
                }
            },
            [ANIMS.Projectile]: {
                frames: 9,
                rate: AR.Boost,
                options: {
                    width: 32,
                    height: 32,
                }
            },
            [ANIMS.Effect1]: {
                frames:10,
                rate: AR.Projectile,
                options: {
                    width: 96,
                    height: 96,
                }
            },
            [ANIMS.Effect2]: {
                frames: 11,
                rate: AR.Projectile,
                options: {
                    width: 48,
                    height: 48,
  
                }
            },
            [ANIMS.Impact]: {
                frames: 11,
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