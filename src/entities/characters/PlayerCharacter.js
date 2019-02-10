import { ANIMATIONS as ANIMS, STATES, ANIMATION_RATES as AR, DIRECTIONS, ASSET_PATHS, KEYS, EFFECTS } from '../../utils/Const.js'
import Character from '../Character.js'
import AStarPathfinding from '../../utils/AStarPathfinding.js'
import Map from '../../world/Map.js'
import Effect from '../../entities/Effect.js'
import AnimationFactory from '../../AnimationFactory.js'
import Fireball from '../Fireball.js'
import Vector from '../../utils/Vector.js';

export default class PlayableCharacter extends Character {
    constructor(game, spritesheet, x, y) {
        super(game, x, y)
        this.scale = 1.3
        this.width = 64
        this.height = 64
        this.oversizeWidth = 192
        this.oversizeHeight = 192
        this.oversizeOffset = 85
        this.animationRates = this.getDefaultAnimationRates()
        this.animations = this.getAnimations(spritesheet)
        if (this.animations[ANIMS.OversizeNorth] != false) {
            this.oversize = true
        }
        this.animation = this.animations[ANIMS.StandEast]
        this.states[STATES.Pathfinding] = false
        this.path = null
        this.v = new Vector(x, y)
        this.speed = 250
    }

    update() {
        //super.update()
        if (this.states[STATES.Following] == false) {
            this.getCombatInput()
            this.getPathfindingInput()

        }
        if (this.states[STATES.Pathfinding]) {
            this.handlePathfinding()
        }
        if (this.game.inputManager.downKeys[KEYS.KeyD] && this.oversize) {
            this.animation = this.animations[ANIMS.OversizeEast]
        }
        //TODO temporary remove!!
        this.v = new Vector(this.x, this.y)
    }

    draw() {
        this.animation.drawFrame(this.game, this.x, this.y, 0)
        super.draw()
    }

    getCombatInput() {
        if (this.game.inputManager.newLeftClick) {
            this.game.inputManager.newLeftClick = false
            const cam = this.game.camera
            const click = this.game.inputManager.lastLeftClickPosition
            //TODO method for all entities to find direction and give an origin pont in that direction form center.
            //TODO check player vector vs target prior to creating a fireball
            this.game.sceneManager.currentScene.addEntity(new Fireball(this.game, this.game.getAsset(ASSET_PATHS.Fireball), { x: this.x, y : this.y }, { x: cam.xView + click.x, y: cam.yView + click.y }))
        }
    }

    getPathfindingInput() {
        if (this.game.inputManager.newRightClick) {
            this.game.inputManager.newRightClick = false

            const cam = this.game.camera
            const click = this.game.inputManager.lastRightClickPosition
            const tileSize = this.game.sceneManager.currentScene.map.tileSize
            const endPos = Map.worldToTilePosition({ x: cam.xView + click.x, y: cam.yView + click.y }, tileSize)
            const startPos = Map.worldToTilePosition(this, tileSize)

            const pathfindingArray = this.game.sceneManager.currentScene.map.getPathfindingArray()
            const result = new AStarPathfinding(pathfindingArray, [startPos.x, startPos.y], [endPos.x, endPos.y]).calculatePath()
            if (result.length > 0) {
                this.states[STATES.Pathfinding] = true
                this.states[STATES.Moving] = true
                this.path = result
            }
        }
    }

    handlePathfinding() {
        const nextTile = { x: this.path[0][0], y: this.path[0][1] }
        const tilePosition = Map.tileToWorldPosition(nextTile, this.game.sceneManager.currentScene.map.tileSize)
        let dx = tilePosition.x - this.x
        let dy = tilePosition.y - this.y
        const length = Math.sqrt(dx * dx + dy * dy)
        if (length < 10) {
            if (this.path.length > 1) {
                this.path.splice(0, 1)
            } else {
                this.x = tilePosition.x
                this.y = tilePosition.y
                this.states[STATES.Pathfinding] = false
                this.states[STATES.Moving] = false
                this.setStandingAnimation()

            }
        } else {
            dx = dx / length
            dy = dy / length
            dx = dx * this.game.clockTick * this.speed
            dy = dy * this.game.clockTick * this.speed
            this.setMovingAnimation(dx, dy)
            this.x += dx
            this.y += dy
        }

    }

    setMovingAnimation(dx, dy) {
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
                this.direction = DIRECTIONS.East
                this.animation = this.animations[ANIMS.WalkEast]
            } else {
                this.direction = DIRECTIONS.West
                this.animation = this.animations[ANIMS.WalkWest]
            }
        } else {
            if (dy > 0) {
                this.direction = DIRECTIONS.South
                this.animation = this.animations[ANIMS.WalkSouth]
            } else {
                this.direction = DIRECTIONS.North
                this.animation = this.animations[ANIMS.WalkNorth]
            }
        }
    }

    setStandingAnimation() {
        switch (this.direction) {
            case DIRECTIONS.East:
                this.animation = this.animations[ANIMS.StandEast]
                break
            case DIRECTIONS.West:
                this.animation = this.animations[ANIMS.StandWest]
                break
            case DIRECTIONS.North:
                this.animation = this.animations[ANIMS.StandNorth]
                break
            case DIRECTIONS.South:
                this.animation = this.animations[ANIMS.StandSouth]
        }
    }

    updateEffectTest() {
        if (this.states[STATES.Cooling]) {
            this.updateCoolDown()
        }
        if (this.states[STATES.Cooling] === false) {
            if (this.game.inputManager.downKeys[KEYS.KeyW]) {
                this.explosion()
            }
            if (this.game.inputManager.downKeys[KEYS.KeyQ]) {

                this.mage([this.x + 100, this.y + 100])
            }
        }
    }

    mage(pos) {
        this.coolDown = 0
        this.states[STATES.Cooling] = true
        this.game.sceneManager.currentScene.addEntity(
            new Effect(this.game, this.game.getAsset(ASSET_PATHS.Mage), EFFECTS.Mage, pos)
        )

    }

    explosion() {
        this.coolDown = 0
        this.states[STATES.Cooling] = true
        for (let i = 0; i < 5; i++) {
            const r = this.rng.int(-30, 30)
            const angle = this.rng.float() * Math.PI * 2
            const pos = [this.x + this.width + Math.cos(angle) * r,
                this.y + this.height + Math.sin(angle) * r]
            this.game.sceneManager.currentScene.addEntity(
                new Effect(this.game, this.game.getAsset(ASSET_PATHS.Effect32), EFFECTS.Explosion, pos)
            )
        }
    }

    updateCoolDown() {
        if (this.coolDown > this.coolEnd) {
            this.states[STATES.Cooling] = false
        } else {
            this.coolDown += this.game.clockTick * 100
        }
    }


    getDefaultAnimationRates() {
        return {
            [AR.Walk]: 0.06,
            [AR.Stand]: 0.6,
            [AR.Death]: 0.15,
            [AR.Spellcast]: 0.15,
            [AR.Thrust]: 0.15,
            [AR.Slash]: 0.15,
            [AR.Shoot]: 0.15,
            [AR.Oversize]: 0.1
        }
    }

    getAnimations(spritesheet) {
        const animations = []
        const animationFactory = new AnimationFactory(spritesheet, this.scale)
        // Spellcasting
        animations[ANIMS.SpellcastNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Spellcast])
        animations[ANIMS.SpellcastWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Spellcast])
        animations[ANIMS.SpellcastSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Spellcast])
        animations[ANIMS.SpellcastEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Spellcast])
        // Thrusting
        animations[ANIMS.ThrustNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Thrust])
        animations[ANIMS.ThrustWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Thrust])
        animations[ANIMS.ThrustSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Thrust])
        animations[ANIMS.ThrustEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Thrust])
        // Walk cycle
        animations[ANIMS.WalkNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        animations[ANIMS.WalkWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        animations[ANIMS.WalkSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        animations[ANIMS.WalkEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Walk])
        // Slashing
        animations[ANIMS.SlashNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Slash])
        animations[ANIMS.SlashWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Slash])
        animations[ANIMS.SlashSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Slash])
        animations[ANIMS.SlashEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Slash])
        // Standing (modified slashing)
        animationFactory.rewindFactory(4, 4 * this.height)
        animations[ANIMS.StandNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand], { maxFrames: 2 })
        animations[ANIMS.StandWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand], { maxFrames: 2 })
        animations[ANIMS.StandSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand], { maxFrames: 2 })
        animations[ANIMS.StandEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Stand], { maxFrames: 2 })
        // Shooting
        animations[ANIMS.ShootNorth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Shoot])
        animations[ANIMS.ShootWest] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Shoot])
        animations[ANIMS.ShootSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Shoot])
        animations[ANIMS.ShootEast] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Shoot])
        // Hurt
        animations[ANIMS.DeathSouth] = animationFactory.getNextRow(this.width, this.height, this.animationRates[AR.Death])
        // Oversized animations
        animations[ANIMS.OversizeNorth] = animationFactory.getNextRow(this.oversizeWidth, this.oversizeHeight, this.animationRates[AR.Oversize], { yOffset: this.oversizeOffset })
        animations[ANIMS.OversizeWest] = animationFactory.getNextRow(this.oversizeWidth, this.oversizeHeight, this.animationRates[AR.Oversize], { yOffset: this.oversizeOffset })
        animations[ANIMS.OversizeSouth] = animationFactory.getNextRow(this.oversizeWidth, this.oversizeHeight, this.animationRates[AR.Oversize], { yOffset: this.oversizeOffset })
        animations[ANIMS.OversizeEast] = animationFactory.getNextRow(this.oversizeWidth, this.oversizeHeight, this.animationRates[AR.Oversize], { yOffset: this.oversizeOffset })
        return animations
    }




}