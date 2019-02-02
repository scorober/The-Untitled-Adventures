/**
 * Scene manager saves all of the game scenes, and calls the correct one.
 */
import FirstLevel from './world/scenes/FirstLevel.js'
import TitleMenuScene from './world/scenes/TitleMenu.js'
import {HitCircle, CollisionLayer} from './utils/Collision.js'


export default class SceneManager {


    constructor(game) {
        this.game = game
        this.collisionLayer = null
        this.scenes = []
        // const title = new TitleMenuScene(game)
        // this.addScene(title.name, title)
        // const scene = new FirstLevel(game)
        // this.addScene(scene.name, scene)
        //this.currentScene = title
        this.currentScene = null

    }

    init(){

        this.collisionLayer = new CollisionLayer()

        // this.hitbox1 = new HitCircle(32, 50, 100)
        // this.hitbox2 = new HitCircle(32, 100, 150)
        //
        // this.hitbox1.isBroken(this.hitbox2.x, this.hitbox2.y)

        const title = new TitleMenuScene(this.game) //title scene
        const scene = new FirstLevel(this.game) //first level
        this.addScene(title.name, title)
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
     * @returns {Scene}
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

    addCollidableEntity(entity){

        if(null != entity){
            if(null === entity.hitbox) {
                //todo: call entity.addCollidableEntity
            }
            this.collisionLayer.addCollidable(entity)
        }
    }
}