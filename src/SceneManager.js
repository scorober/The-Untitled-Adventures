/**
 * Scene manager saves all of the game scenes, and calls the correct one.
 */
import FirstLevel from './world/scenes/firstlevel_scene.js'

export default class SceneManager {


    constructor(game) {
        this.GAME = game

        this.scenes = []


        //var scene = new MainMenuScene(game)
        //this.addScene(scene.name, scene)
        //this.active = scene
        //this.addScene('play', new PlayScene(game))

        //add scenes here. Load all from JSON?
        var scene = new FirstLevel(game)
        this.addScene(scene.name, scene)
        this.ACTIVE_SCENE = scene
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
        for (var scene of this.scenes) {
            if (scene.SceneName === name) {
                return scene.Scene
            }
        }
    }

    /**
     * Calls update func for active scene
     * @param tick amount of time passed since last update.
     */
    update(tick) {
        this.ACTIVE_SCENE.update(tick)
    }

    /**
     * This function calls the draw function for the active scene
     * @param ctx = the area being drawn on
     */
    draw(ctx) {
        this.ACTIVE_SCENE.draw(ctx)
    }

    /**
     * This function changes from one scene to another
     * @param name the name of the scene you want to change to
     */
    change(name){
        this.ACTIVE_SCENE.exit()  //exit old scene
        this.ACTIVE_SCENE = this.getScene(name)
        this.ACTIVE_SCENE.enter() //enter new scene
    }
}