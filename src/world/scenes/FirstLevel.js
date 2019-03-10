import Scene from './Scene.js'
import Map from '../Map.js'
import Dungeon from '../generators/Dungeon.js'
import Entity from '../../entities/Entity.js'
import { ASSET_PATHS } from '../../utils/Const.js'

import PlayerCharacterData from '../../entities/characters/PlayerCharacterDefaultData.js'
import ArcherData from '../../entities/characters/ArcherDefaultData.js'
import MarriottData from '../../entities/characters/MarriottDefaultData.js'

import MovementComponent from '../../entities/components/MovementComponent.js'
import MarriottMovementComponent from '../../entities/components/MarriottMovementComponent.js'
import PlayerInputComponent from '../../entities/components/PlayerInputComponent.js'
import AnimationComponent from '../../entities/components/AnimationComponent.js'
import SpawnerBehaviorComponent from '../../entities/components/SpawnerBehaviorComponent.js'
import CollisionComponent from '../../entities/components/CollisionComponent.js'
import AttributeComponent from '../../entities/components/AttributeComponent.js'
import CombatComponent from '../../entities/components/CombatComponent.js'
import SpawnerData from '../../entities/effects/SpawnerDefaultData.js'
import EnemyInteractionComponent from '../../entities/components/InteractionComponent/EnemyInteractionComponent.js'
import MarriottInteractionComponent from '../../entities/components/InteractionComponent/MarriottInteractionComponent.js'
import Vector from '../../utils/Vector.js'
import DoorInteractionComponent from '../../entities/components/InteractionComponent/DoorInteractionComponent.js'
import PlayerCharacterCombatComponent from '../../entities/components/PlayerCharacterCombatComponent.js'
import StairInteractionComponent from '../../entities/components/InteractionComponent/StairInteractionComponent.js'
import WolfDefaultData from '../../entities/characters/WolfDefaultData.js'

import EquipmentComponent from '../../entities/components/EquipmentComponent.js'
import EquippedItemsComponent from '../../entities/components/EquippedItemsComponent.js'

export default class FirstLevel extends Scene {
    constructor(game) {
        super(game, 1)
        this.name = 'level1'

        //Initialize a dungeon with options, possibly move to the scene superclass w/ parameters.
        const dungeon = new Dungeon({
            size: [2000, 2000],
            // seed: 'abcd', //omit for generated seed
            rooms: {
                initial: {
                    min_size: [14, 18], //Floor size
                    max_size: [14, 18],
                    max_exits: 4,
                    position: [100, 100] //OPTIONAL pos of initial room 
                },
                any: {
                    min_size: [15, 15],
                    max_size: [20, 23],
                    max_exits: 4
                },
                corridor: { 
                    min_size: [26, 12],
                    max_size: [26, 12],
                    max_exits: 4
                },
                exit: {
                    min_size: [15, 15],
                    max_size: [20, 20],
                    max_exits: 1
                },
                treasure: {
                    min_size: [20, 16],
                    max_size: [20, 16],
                    max_exits: 3
                },
                maze: {
                    min_size: [18, 18],
                    max_size: [18, 18], 
                    max_exits: 4
                }

            },
            max_corridor_length: 15,
            min_corridor_length: 15,
            corridor_density: 0, //corridors per room, remove corridors? They'll be tagged as such.
            symmetric_rooms: true, // exits must be in the center of a wall if true. Setting true will make design easier
            interconnects: 1, //extra corridors to connect rooms and make circular paths. not 100% guaranteed
            max_interconnect_length: 10,
            room_count: 20
        })

        dungeon.generate()

        const map = new Map(game, game.getAsset(ASSET_PATHS.Dungeon), 64, 16, dungeon, this)
        this.setMap(map)
        const start = this.map.getStartPos()

        const playerCharacter = this.createPlayerCharacter(game, start)
        const marriott = this.createMarriott(game, start, playerCharacter)

        this.setPlayer(playerCharacter)
        this.addEntity(playerCharacter)
        this.addEntity(marriott)
        this.addEntity(game.camera)
        this.game.camera.setFollowedEntity(playerCharacter)

        const test = this.createArcher(game, start, playerCharacter)
        this.addEntity(test)

        this.createMapEntities(game, map)

        const testEq = new Entity(game, start)
        testEq.addComponent(new EquipmentComponent(testEq, {
            name: 'Thunderfury of the Windseeker',
            type: 'weapon',
            atk: 3,
            def: 0,
            matk: 2,
            mdef: 1
        }))
        testEq.addComponent(new AnimationComponent(testEq, {
            Spritesheet: ASSET_PATHS.EquipmentWeapon,
            Width: 32,
            Height: 32,
            Scale: 1.5
        }))
        testEq.addComponent(new CollisionComponent(testEq))
        this.addItem(testEq)

    }

    createMapEntities(game, map) {
        this.createSpawners(game, map)
        this.createExits(game, map)
        this.createStairs(game, map)
    }

    createStairs(game, map) {
        for (const tiles of map.levelExit) {
            const tileBox = map.getDoorBox(tiles)
            const exit = new Entity(game, new Vector(tileBox.x, tileBox.y))
            exit.addComponent(new StairInteractionComponent(exit, tiles))
            exit.addComponent(new CollisionComponent(exit, tileBox))
            this.addEntity(exit)
        }
    }

    createExits(game, map) {

        for (const exit of map.exits) {
            const doorBox = map.getDoorBox(exit.tiles)
            const door = new Entity(game, new Vector(doorBox.x, doorBox.y))
            door.addComponent(new DoorInteractionComponent(door, exit.tiles, exit.destination, exit.room))
            door.addComponent(new CollisionComponent(door, doorBox))
            this.addEntity(door)
        }
    }


    createSpawners(game, map) {
        for (const mapSpawner of map.spawners) {
            const spawner = new Entity(game, mapSpawner.pos)
            spawner.addComponent(new AnimationComponent(spawner, SpawnerData.AnimationConfig))
            spawner.addComponent(new SpawnerBehaviorComponent(spawner, this, mapSpawner.type, mapSpawner.r, 4, mapSpawner.room))
            this.addEntity(spawner)
        }
    }


    createMarriott(game, start, playerCharacter) {
        const marriott = new Entity(game, start, MarriottData.Attributes)
        marriott.addComponent(new AnimationComponent(marriott, MarriottData.AnimationConfig))
        marriott.addComponent(new MarriottMovementComponent(marriott, MarriottData.Attributes))
        marriott.addComponent(new AttributeComponent(marriott, MarriottData.Attributes))
        marriott.addComponent(new CollisionComponent(marriott))
        marriott.addComponent(new MarriottInteractionComponent(marriott))
        marriott.getComponent(MovementComponent).setFollowTarget(playerCharacter)
        return marriott
    }

    createArcher(game, start, playerCharacter) {
        const archer = new Entity(game, { x: start.x - 300, y: start.y - 350})
        archer.addComponent(new AnimationComponent(archer, WolfDefaultData.AnimationConfig))
        archer.addComponent(new MovementComponent(archer, ArcherData.Attributes))
        archer.addComponent(new AttributeComponent(archer, ArcherData.Attributes))
        archer.addComponent(new CollisionComponent(archer))
        archer.addComponent(new EnemyInteractionComponent(archer))
        archer.addComponent(new CombatComponent(archer))
        // archer.getComponent(MovementComponent).setFollowTarget(playerCharacter)
        return archer
    }

    createPlayerCharacter(game, start) {
        const pc = new Entity(game, start, PlayerCharacterData.Attributes)
        pc.addComponent(new AnimationComponent(pc, PlayerCharacterData.AnimationConfig))
        pc.addComponent(new AttributeComponent(pc, PlayerCharacterData.Attributes))
        pc.addComponent(new MovementComponent(pc, PlayerCharacterData.Attributes))
        pc.addComponent(new CollisionComponent(pc))
        pc.addComponent(new MarriottInteractionComponent(pc))
        pc.addComponent(new PlayerCharacterCombatComponent(pc))
        pc.addComponent(new PlayerInputComponent(pc))
        pc.addComponent(new EquippedItemsComponent(pc))
        return pc
    }

    /**
     * Spawns some random equipment at given entity location
     */
    spawnReward(entity) {
        const eq = new Entity(entity.game, new Vector(entity.x, entity.y))
        const namePrefixes = ['Swoll', 'Bizarre', 'Dynamic', 'Fascinating', 'Filty', 'Whimsical', 'Flowing', 'Bubbling']
        const nameSuffixes = ['of Reaching', 'of Decisions', 'of the Jungle', 'of Emptiness', 'of Punishment', 'of Sailing', 'of Strength']
        const eqMap = [{
            asset: ASSET_PATHS.EquipmentChest,
            type: 'head',
            name: ' Tunic ',
            atkMod: 0,
            defMod: 2,
            matkMod: 0,
            mdefMod: 2
        },
        {
            asset: ASSET_PATHS.EquipmentFeet,
            type: 'feet',
            name: ' Sandals ',
            atkMod: 0,
            defMod: 1,
            matkMod: 0,
            mdefMod: 2
        },
        {
            asset: ASSET_PATHS.EquipmentHands,
            type: 'hands',
            name: ' Handwraps ',
            atkMod: 1,
            defMod: 1,
            matkMod: 1,
            mdefMod: 0
        },
        {
            asset: ASSET_PATHS.EquipmentHead,
            type: 'head',
            name: ' Cap ',
            atkMod: 0,
            defMod: 1,
            matkMod: 1,
            mdefMod: 1
        },
        {
            asset: ASSET_PATHS.EquipmentWeapon,
            type: 'weapon',
            name: ' Sword ',
            atkMod: 3,
            defMod: 0,
            matkMod: 1,
            mdefMod: 0
        }]
        const thisEquip = eqMap[Math.min(Math.floor(Math.random() * eqMap.length), eqMap.length - 1)]
        const thisPrefix = namePrefixes[Math.min(Math.floor(Math.random() * namePrefixes.length), namePrefixes.length - 1)]
        const thisSuffix = nameSuffixes[Math.min(Math.floor(Math.random() * nameSuffixes.length), nameSuffixes.length - 1)]
        eq.addComponent(new EquipmentComponent(eq, {
            name: thisPrefix + thisEquip.name + thisSuffix,
            type: thisEquip.type,
            atk: Math.floor(Math.random() * 2 * thisEquip.atkMod),
            def: Math.floor(Math.random() * 2 * thisEquip.defMod),
            matk: Math.floor(Math.random() * 2 * thisEquip.matkMod),
            mdef: Math.floor(Math.random() * 2 * thisEquip.mdefMod)
        }))
        eq.addComponent(new AnimationComponent(eq, {
            Spritesheet: thisEquip.asset,
            Width: 32,
            Height: 32,
            Scale: 1
        }))
        eq.addComponent(new CollisionComponent(eq))
        this.addItem(eq)
    }

    /**
     * Updates this scene.
     */
    update() {
        //NOTE: These two functions were originally done automatically in the super class, but I added them
        //here to reduce confusion, and to allow the order they are updated/rendered to be adjusted.
        this.updateMap()
        this.updateEntities()
    }

    /**
     * Draw this scene.
     */
    draw() {
        this.drawBackground()
        this.drawMap()
        this.drawEntities()
        this.drawMapTop()
    }

    enter(){
        this.game.soundManager.playMusic(2)
    }
}