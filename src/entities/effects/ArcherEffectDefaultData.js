import {
    ANIMATIONS as ANIMS,
    ANIMATION_RATES as AR,
    ASSET_PATHS
} from '../../utils/Const.js'



export default {
    Attributes: {
        Damage: 10,
        Speed: 1200
    },
    AnimationConfig: {
        Scale: .75,
        Spritesheet: ASSET_PATHS.ArcherEffects,
        InitialAnimation: ANIMS.Projectile,
        AnimationRates: {
            [AR.Projectile]: .15,
            [AR.Impact]: .13
        },
        AnimationData: {
            [ANIMS.Projectile]: {
                frames: 7,
                rate: AR.Projectile,
                options: {
                    width: 32,
                    height: 64,
                }
            },
            [ANIMS.Impact]: {
                frames: 12,
                rate: AR.Impact,
                options: {
                    width: 192,
                    height: 192,
                }
            }

        }
    }
}