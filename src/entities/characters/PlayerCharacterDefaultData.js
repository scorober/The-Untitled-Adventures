import { ANIMATIONS as ANIMS, ANIMATION_RATES as AR, ASSET_PATHS } from '../../utils/Const.js'

/**
 * ANIMATIONS
 */
// Values defined here for use in export object
const width = 64
const height = 64
const scale = 1
const yOffset = 0
const oversizedWidth = 192
const oversizedHeight = 192
const oversizedYOffset = 85

/** 
 * Animations should be defined in the order they appear in the spritesheet
 * With derivative animations appearing after the main animation, with 2 properties:
 * goBackRows, goBackHeight appearing in the first derivative animation. See PlayerCharacter's
 * ANIMS.StandNorth for usage example
 */
export default {
    // Attributes Component Configuration
    Attributes: {
        HP: 30,
        Mana: 10,
        Atk: 10,
        Def: 15,
        Mdef: 3
    },
    // Animation Component Configuration
    AnimationConfig: {
        // Values are repeated here for export
        Width: width,
        Height: height,
        Scale: scale,
        YOffset: yOffset,
        OversizedWidth: oversizedWidth,
        OversizedHeight: oversizedHeight,
        OversizedYOffset: oversizedYOffset,
        Spritesheet: ASSET_PATHS.MikesChar,
        InitialAnimation: ANIMS.StandEast,
        AnimationRates: {
            [AR.Walk]: 0.06,
            [AR.Stand]: 0.6,
            [AR.Death]: 0.15,
            [AR.Spellcast]: 0.15,
            [AR.Thrust]: 0.15,
            [AR.Slash]: 0.15,
            [AR.Shoot]: 0.15,
            [AR.Oversize]: 0.1
        },
        AnimationData: {
            [ANIMS.SpellcastNorth]: {
                width: width,
                height: height,
                rate: AR.Spellcast,
                options: { yOffset: yOffset }
            },
            [ANIMS.SpellcastWest]: {
                width: width,
                height: height,
                rate: AR.Spellcast,
                options: { yOffset: yOffset }
            },
            [ANIMS.SpellcastSouth]: {
                width: width,
                height: height,
                rate: AR.Spellcast,
                options: { yOffset: yOffset }
            },
            [ANIMS.SpellcastEast]: {
                width: width,
                height: height,
                rate: AR.Spellcast,
                options: { yOffset: yOffset }
            },
            [ANIMS.ThrustNorth]: {
                width: width,
                height: height,
                rate: AR.Thrust,
                options: { yOffset: yOffset }
            },
            [ANIMS.ThrustWest]: {
                width: width,
                height: height,
                rate: AR.Thrust,
                options: { yOffset: yOffset }
            },
            [ANIMS.ThrustSouth]: {
                width: width,
                height: height,
                rate: AR.Thrust,
                options: { yOffset: yOffset }
            },
            [ANIMS.ThrustEast]: {
                width: width,
                height: height,
                rate: AR.Thrust,
                options: { yOffset: yOffset }
            },
            // Walk cycle
            [ANIMS.WalkNorth]: {
                width: width,
                height: height,
                rate: AR.Walk,
                options: { yOffset: yOffset }
            },
            [ANIMS.WalkWest]: {
                width: width,
                height: height,
                rate: AR.Walk,
                options: { yOffset: yOffset }
            },
            [ANIMS.WalkSouth]: {
                width: width,
                height: height,
                rate: AR.Walk,
                options: { yOffset: yOffset }
            },
            [ANIMS.WalkEast]: {
                width: width,
                height: height,
                rate: AR.Walk,
                options: { yOffset: yOffset }
            },
            // Slashing
            [ANIMS.SlashNorth]: {
                width: width,
                height: height,
                rate: AR.Slash,
                options: { yOffset: yOffset }
            },
            [ANIMS.SlashWest]: {
                width: width,
                height: height,
                rate: AR.Slash,
                options: { yOffset: yOffset }
            },
            [ANIMS.SlashSouth]: {
                width: width,
                height: height,
                rate: AR.Slash,
                options: { yOffset: yOffset }
            },
            [ANIMS.SlashEast]: {
                width: width,
                height: height,
                rate: AR.Slash,
                options: { yOffset: yOffset }
            },

            // Standing (modified slashing)
            [ANIMS.StandNorth]: {
                goBackRows: 4,
                goBackHeight: 4 * height,
                width: width,
                height: height,
                rate: AR.Stand,
                options: { yOffset: yOffset, maxFrames: 2 }
            },
            [ANIMS.StandWest]: {
                width: width,
                height: height,
                rate: AR.Stand,
                options: { yOffset: yOffset, maxFrames: 2 }
            },
            [ANIMS.StandSouth]: {
                width: width,
                height: height,
                rate: AR.Stand,
                options: { yOffset: yOffset, maxFrames: 2 }
            },
            [ANIMS.StandEast]: {
                width: width,
                height: height,
                rate: AR.Stand,
                options: { yOffset: yOffset, maxFrames: 2 }
            },
            // Shooting
            [ANIMS.ShootNorth]: {
                width: width,
                height: height,
                rate: AR.Shoot,
                options: { yOffset: yOffset }
            },
            [ANIMS.ShootWest]: {
                width: width,
                height: height,
                rate: AR.Shoot,
                options: { yOffset: yOffset }
            },
            [ANIMS.ShootSouth]: {
                width: width,
                height: height,
                rate: AR.Shoot,
                options: { yOffset: yOffset }
            },
            [ANIMS.ShootEast]: {
                width: width,
                height: height,
                rate: AR.Shoot,
                options: { yOffset: yOffset }
            },
            // Hurt
            [ANIMS.DeathSouth]: {
                width: width,
                height: height,
                rate: AR.Death,
                options: { yOffset: yOffset }
            },
            // Oversized animations
            [ANIMS.OversizeNorth]: {
                width: oversizedWidth,
                height: oversizedHeight,
                rate: AR.Oversize,
                options: { yOffset: oversizedYOffset }
            },
            [ANIMS.OversizeWest]: {
                width: oversizedWidth,
                height: oversizedHeight,
                rate: AR.Oversize,
                options: { yOffset: oversizedYOffset }

            },
            [ANIMS.OversizeSouth]: {
                width: oversizedWidth,
                height: oversizedHeight,
                rate: AR.Oversize,
                options: { yOffset: oversizedYOffset }

            },
            [ANIMS.OversizeEast]: {
                width: oversizedWidth,
                height: oversizedHeight,
                rate: AR.Oversize,
                options: { yOffset: oversizedYOffset }
            }
        }
    }
}