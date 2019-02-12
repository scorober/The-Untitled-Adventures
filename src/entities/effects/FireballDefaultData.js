import {
    ANIMATIONS as ANIMS,
    ANIMATION_RATES as AR,
    ASSET_PATHS
} from '../../utils/Const.js'


const fireWidth = 22
const fireHeight = 28
const startWidth = 27
const projWidth = 21
const projHeight = 57
const boostSize = 96

export default {
    Attributes: {
        Damage: 10,
        // Radius: 15,
        Speed: 800
    },

    AnimationConfig: {
        Scale: 1.3,
        Spritesheet: ASSET_PATHS.Fireball,
        InitialAnimation: ANIMS.Initial,
        AnimationRates: {
            [AR.Projectile]: .15,
            [AR.Boost]: .15
        },
        AnimationData: {
            [ANIMS.Impact]: {
                frames: 12,
                rate: AR.Boost,
                options: {
                    width: 96,
                    height: 96,
                }
            },
            [ANIMS.Fire]: {
                frames: 11,
                rate: AR.Boost,
                options: {
                    width: 22,
                    height: 28,
                }
            },
            [ANIMS.Initial]: {
                frames: 4,
                rate: AR.Projectile,
                options: {
                    width: 21,
                    height: 57,
                }
            },
            [ANIMS.Projectile]: {
                frames: 7,
                rate: AR.Projectile,
                options: {
                    width: 21,
                    height: 57,
                }
            }
        }
    }
}