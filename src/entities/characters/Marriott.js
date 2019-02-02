import { ANIMATIONS, STATES, DIRECTIONS, KEYS } from '../../utils/Const.js'
import Effect from '../Effect.js'
import Animation from '../../Animation.js'
import Npc from './Npc.js'

export default class Marriott extends Npc {
    constructor(game,spriteSheet, x, y) {
        super(game, spriteSheet, x, y)
        this.sittingRate = 0.1
    }

    update() {
        super.update()
    }

    handleMovement() {
        super.handleMovement()
    }

    draw() {
        super.draw()
    }

    getAnimations(spritesheet) {
        this.height = 69
        const animations = {
            // Walk cycle
            [ANIMATIONS.WalkNorth]: new Animation(spritesheet, this.width, this.height, 9, 1, this.walkCycleRate, 9, true, this.scale),
            [ANIMATIONS.WalkWest]: new Animation(spritesheet, this.width, this.height, 9, 2, this.walkCycleRate, 9, true, this.scale),
            [ANIMATIONS.WalkSouth]: new Animation(spritesheet, this.width, this.height, 9, 3, this.walkCycleRate, 9, true, this.scale),
            [ANIMATIONS.WalkEast]: new Animation(spritesheet, this.width, this.height, 9, 4, this.walkCycleRate, 9, true, this.scale),
            // Sitting on desk
            [ANIMATIONS.SitDown]: new Animation(spritesheet, this.width, this.height, 5, 5, this.sittingRate, 5, false, this.scale),
            [ANIMATIONS.StandUp]: new Animation(spritesheet, this.width, this.height, 5, 5, this.sittingRate, 5, false, this.scale),
            
            //standing
            [ANIMATIONS.StandNorth]: new Animation(spritesheet, this.width, this.height, 1, 1, this.standCycleRate, 1, true, this.scale),
            [ANIMATIONS.StandWest]: new Animation(spritesheet, this.width, this.height, 1, 2, this.standCycleRate, 1, true, this.scale),
            [ANIMATIONS.StandSouth]: new Animation(spritesheet, this.width, this.height, 1, 3, this.standCycleRate, 1, true, this.scale),
            [ANIMATIONS.StandEast]: new Animation(spritesheet, this.width, this.height, 1, 4, this.standCycleRate, 1, true, this.scale),
        }

        return animations
    }

}