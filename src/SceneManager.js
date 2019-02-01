/**
 * Scene manager saves all of the game scenes, and calls the correct one.
 */
import FirstLevel from './world/scenes/FirstLevel.js'
import TitleMenuScene from './world/scenes/TitleMenu.js'

export default class SceneManager {


    constructor(game) {
        this.game = game
        this.scenes = []
        const title = new TitleMenuScene(game)
        this.addScene(title.name, title)
        const scene = new FirstLevel(game)
        this.addScene(scene.name, scene)
        this.currentScene = title
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
}