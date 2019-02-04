/**
 * Scene manager saves all of the game scenes, and calls the correct one.
 */
import FirstLevel from './world/scenes/FirstLevel.js'
import {HitCircle, CollisionLayer} from './utils/Collision.js'

export default class SceneManager {


    constructor(game) {
        this.game = game
        this.scenes = []
        this.currentScene = null
    }

    init(){
        this.collisionLayer = new CollisionLayer()
        const scene = new FirstLevel(this.game)
        this.addScene(scene.name, scene)
        this.currentScene = scene
    }

    /**
     * Adds ascene to the collection of scenes
     * @param name the name of the new scene
     * @param scene a reference ot the scene
     */
    addScene(name, scene) {
        //TODO: Check if exists
        this.scenes[name] = scene
    }

    /**
     * Returns a scene by its name
     * @param name of the scene
     * @returns {scene}
     */
    getScene(name) {
        return this.scenes[name]
    }

    /**
     * Calls update func for active scene
     */
    update() {
        this.currentScene.update()
    }

    /**
     * This function calls the draw function for the active scene
     */
    draw() {
        this.currentScene.draw()
    }

    /**
     * This function changes from one scene to another
     * @param name the name of the scene you want to change to
     */
    change(name){
        this.currentScene.exit()  //exit old scene
        this.currentScene = this.getScene(name)
        this.currentScene.enter() //enter new scene
    }

    /**
     * Adds an entity to the collidable layer. Checks to ensure it has a hitbox before being added.
     *
     * @param entity the entity to be added.
     */
    addCollidableEntity(entity){
        if(null != entity){
            if(null === entity.hitbox) {
                entity.hitbox = new HitCircle(entity.radius, entity.x, entity.y)
            }
            this.collisionLayer.addCollidable(entity)
        }
    }
}