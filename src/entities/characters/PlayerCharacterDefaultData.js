import { ANIMATIONS as ANIMS, ANIMATION_RATES as AR, ASSET_PATHS } from '../../utils/Const.js'

/**
 * ANIMATIONS
 */
// Values defined here for use in export object
const yOffset = 0
const oversizedYOffset = 64

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
        Width: 64,
        Height: 64,
        Scale: 1,
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
                rate: AR.Spellcast,
                options: { yOffset: yOffset }
            },
            [ANIMS.SpellcastWest]: {
                rate: AR.Spellcast,
                options: { yOffset: yOffset }
            },
            [ANIMS.SpellcastSouth]: {
                rate: AR.Spellcast,
                options: { yOffset: yOffset }
            },
            [ANIMS.SpellcastEast]: {

                rate: AR.Spellcast,
                options: { yOffset: yOffset }
            },
            [ANIMS.ThrustNorth]: {
                rate: AR.Thrust,
                options: { yOffset: yOffset }
            },
            [ANIMS.ThrustWest]: {
                rate: AR.Thrust,
                options: { yOffset: yOffset }
            },
            [ANIMS.ThrustSouth]: {
                rate: AR.Thrust,
                options: { yOffset: yOffset }
            },
            [ANIMS.ThrustEast]: {
                rate: AR.Thrust,
                options: { yOffset: yOffset }
            },
            // Walk cycle
            [ANIMS.WalkNorth]: {
                rate: AR.Walk,
                options: { yOffset: yOffset }
            },
            [ANIMS.WalkWest]: {
                rate: AR.Walk,
                options: { yOffset: yOffset }
            },
            [ANIMS.WalkSouth]: {
                rate: AR.Walk,
                options: { yOffset: yOffset }
            },
            [ANIMS.WalkEast]: {
                rate: AR.Walk,
                options: { yOffset: yOffset }
            },
            // Slashing
            [ANIMS.SlashNorth]: {
                rate: AR.Slash,
                options: { yOffset: yOffset }
            },
            [ANIMS.SlashWest]: {
                rate: AR.Slash,
                options: { yOffset: yOffset }
            },
            [ANIMS.SlashSouth]: {
                rate: AR.Slash,
                options: { yOffset: yOffset }
            },
            [ANIMS.SlashEast]: {
                rate: AR.Slash,
                options: { yOffset: yOffset }
            },

            // Standing (modified slashing)
            [ANIMS.StandNorth]: {
                goBackRows: 4,
                goBackHeight: 4 * 64,
                rate: AR.Stand,
                options: { yOffset: yOffset, maxFrames: 2 }
            },
            [ANIMS.StandWest]: {
                rate: AR.Stand,
                options: { yOffset: yOffset, maxFrames: 2 }
            },
            [ANIMS.StandSouth]: {
                rate: AR.Stand,
                options: { yOffset: yOffset, maxFrames: 2 }
            },
            [ANIMS.StandEast]: {
                rate: AR.Stand,
                options: { yOffset: yOffset, maxFrames: 2 }
            },
            // Shooting
            [ANIMS.ShootNorth]: {
                rate: AR.Shoot,
                options: { yOffset: yOffset }
            },
            [ANIMS.ShootWest]: {
                rate: AR.Shoot,
                options: { yOffset: yOffset }
            },
            [ANIMS.ShootSouth]: {
                rate: AR.Shoot,
                options: { yOffset: yOffset }
            },
            [ANIMS.ShootEast]: {
                rate: AR.Shoot,
                options: { yOffset: yOffset }
            },
            // Hurt
            [ANIMS.DeathSouth]: {
                rate: AR.Death,
                options: { yOffset: yOffset }
            },
            // Oversized animations
            [ANIMS.OversizeNorth]: {
                optional: true,
                rate: AR.Oversize,
                options: { yOffset: oversizedYOffset, width: 192, height: 192 }
            },
            [ANIMS.OversizeWest]: {
                rate: AR.Oversize,
                options: { yOffset: oversizedYOffset, width: 192, height: 192 }

            },
            [ANIMS.OversizeSouth]: {
                rate: AR.Oversize,
                options: { yOffset: oversizedYOffset, width: 192, height: 192 }

            },
            [ANIMS.OversizeEast]: {
                rate: AR.Oversize,
                options: { yOffset: oversizedYOffset, width: 192, height: 192 }
            }
        }
    }
}