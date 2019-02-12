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
        Radius: 15
    },

    animationConfig: {
        Scale: 1.3,
        Spritesheet: ASSET_PATHS.Fireball,
        AnimationRates: {
            [AR.Projectile]: .15,
            [AR.Boost]: .15
        },
        AnimationData: {
            [ANIMS.Boost]: {
                rate: AR.Boost,
                options: {
                    width: boostSize,
                    height: boostSize
                }
            },
            [ANIMS.Fire]: {
                rate: AR.Boost,
                options: {
                    width: fireWidth,
                    height: fireHeight
                }
            },
            [ANIMS.Initial]: {
                rate: AR.Projectile,
                options: {
                    width: startWidth,
                    height: projHeight,
                    maxFrames: 4
                }
            },
            [ANIMS.Projectile]: {
                rate: AR.Projectile,
                options: {
                    width: projWidth,
                    height: projHeight
                }
            }
        }
    }
}