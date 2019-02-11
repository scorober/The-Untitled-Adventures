import {
    ANIMATIONS as ANIMS,
    ANIMATION_RATES as AR,
    ASSET_PATHS
} from '../../utils/Const.js'

/**
 * ANIMATIONS
 */
// Values defined here for use in export object
const attackWidth = 288
const attackHeight = 192
const height = 192
const width = 192
const yOffset = 10


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
        Mdef: 3,
        Speed: 50
    },
    // Animation Component Configuration
    AnimationConfig: {
        // Values are repeated here for export
        Width: 192,
        Height: 192,
        Scale: 0.5,
        Spritesheet: ASSET_PATHS.Archer,
        InitialAnimation: ANIMS.StandEast,
        AnimationRates: {
            [AR.Walk]: 0.06,
            [AR.Stand]: 0.6,
            [AR.Death]: 0.15,
            [AR.Spellcast]: 0.15,
            [AR.Thrust]: 0.15,
            [AR.Slash]: 0.15,
            [AR.Shoot]: 0.15,
        },
        AnimationData: {
            [ANIMS.ShootWest]: {
                rate: AR.Shoot,
                options: {
                    yOffset: yOffset,
                    width: attackWidth,
                    height: attackHeight
                }
            },
            [ANIMS.ShootEast]: {
                rate: AR.Shoot,
                options: {
                    yOffset: yOffset,
                    width: attackWidth,
                    height: attackHeight
                }
            },
            // Copy of ShootWest
            [ANIMS.ShootNorth]: {
                goBackRows: 2,
                goBackHeight: 2 * attackHeight,
                rate: AR.Shoot,
                options: {
                    yOffset: yOffset,
                    width: attackWidth,
                    height: attackHeight
                }
            },
            // Copy of ShootEast
            [ANIMS.ShootSouth]: {
                rate: AR.Shoot,
                options: {
                    yOffset: yOffset,
                    width: attackWidth,
                    height: attackHeight
                }
            },
            // Standing
            [ANIMS.StandWest]: {
                rate: AR.Stand,
                options: {
                    yOffset: yOffset,
                }
            },
            [ANIMS.StandEast]: {
                rate: AR.Stand,
                options: {
                    yOffset: yOffset,
                }
            },
            // Copy of StandWest
            [ANIMS.StandNorth]: {
                goBackRows: 2,
                goBackHeight: 2 * height,
                rate: AR.Stand,
                options: {
                    yOffset: yOffset,
                }
            },
            // Copy of StandEast
            [ANIMS.StandSouth]: {
                rate: AR.Stand,
                options: {
                    yOffset: yOffset,
                }

            },
            // Impact
            [ANIMS.Impact]: {
                rate: AR.Impact,
                options: {
                    loop: false,
                    maxFrames: 12
                }
            },
            // Walking
            [ANIMS.WalkWest]: {
                rate: AR.Walk,
                options: {
                    yOffset: yOffset,
                }
            },
            [ANIMS.WalkEast]: {
                rate: AR.Walk,
                options: {
                    yOffset: yOffset,
                }
            },
            // Copy of WalkWest
            [ANIMS.WalkSouth]: {
                goBackRows: 2,
                goBackHeight: 2 * height,
                width: width,
                height: height,
                rate: AR.Walk,
                options: {
                    yOffset: yOffset,
                }
            },
            // Copy of WalkEast
            [ANIMS.WalkNorth]: {
                width: width,
                height: height,
                rate: AR.Walk,
                options: {
                    yOffset: yOffset,
                }
            }
        }
    }
}