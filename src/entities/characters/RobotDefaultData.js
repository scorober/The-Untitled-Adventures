import { ANIMATIONS as ANIMS, ANIMATION_RATES as AR, ASSET_PATHS } from '../../utils/Const.js'

/**
 * ANIMATIONS
 */
// Values defined here for use in export object
const attackWidth = 384
const attackHeight = 192
const impactSize = 244
const height = 192
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
        Speed: 40
    },
    // Animation Component Configuration
    AnimationConfig: {
        // Values are repeated here for export
        Width: 192,
        Height: 192,
        Scale: 0.6,
        Spritesheet: ASSET_PATHS.Robot,
        InitialAnimation: ANIMS.StandEast,
        AnimationRates: {
            [AR.Walk]: 0.06,
            [AR.Stand]: 0.12,
            [AR.Attack]: 0.15,
            [AR.Impact]: 0.1
        },
        AnimationData: {
            [ANIMS.AttackWest]: {
                frames: 17,
                rate: AR.Attack,
                options: {
                    yOffset: yOffset,
                    width: attackWidth,
                    height: attackHeight
                }
            },
            [ANIMS.AttackEast]: {
                frames: 17,
                rate: AR.Attack,
                options: {
                    yOffset: yOffset,
                    width: attackWidth,
                    height: attackHeight
                }
            },
            // Copy of AttackWest
            [ANIMS.AttackNorth]: {
                goBackRows: 2,
                goBackHeight: 2 * attackHeight,
                frames: 17,
                rate: AR.Attack,
                options: { yOffset: yOffset, width: attackWidth, height: attackHeight }
            },
            // Copy of AttackEast
            [ANIMS.AttackSouth]: {
                frames: 17,
                rate: AR.Attack,
                options: { yOffset: yOffset, width: attackWidth, height: attackHeight }
            },
            // Standing
            [ANIMS.StandWest]: {
                frames: 18,
                rate: AR.Stand,
                options: { yOffset: yOffset, }
            },
            [ANIMS.StandEast]: {
                frames: 18,
                rate: AR.Stand,
                options: { yOffset: yOffset, }
            },
            // Copy of StandWest
            [ANIMS.StandNorth]: {
                goBackRows: 2,
                goBackHeight: 2,
                frames: 18,
                rate: AR.Stand,
                options: { yOffset: yOffset, }
            },
            // Copy of StandEast
            [ANIMS.StandSouth]: {
                frames: 18,
                rate: AR.Stand,
                options: { yOffset: yOffset, }

            },
            // Walking
            [ANIMS.WalkWest]: {
                frames: 9,
                rate: AR.Walk,
                options: { yOffset: yOffset, }
            },
            [ANIMS.WalkEast]: {
                frames: 9,
                rate: AR.Walk,
                options: { yOffset: yOffset, }
            },
            // Copy of WalkWest
            [ANIMS.WalkSouth]: {
                goBackRows: 2,
                goBackHeight: 2 * height,
                frames: 9,
                rate: AR.Walk,
                options: { yOffset: yOffset, }
            },
            // Copy of WalkEast
            [ANIMS.WalkNorth]: {
                frames: 9,
                rate: AR.Walk,
                options: { yOffset: yOffset, }
            },
            // Impact
            [ANIMS.Impact]: {
                frames: 9,
                rate: AR.Impact,
                options: { loop: false, width: impactSize, height: impactSize }
            },
        }
    }
}