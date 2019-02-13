/**
 * Basic scene object most other scenes will extend.
 */

export default class Scene {
    constructor(game) {
        this.game = game
        this.entities = []
        this.map = null
        this.background = null
        this.timeElapsed = 0
        this.timeBuffer = 0
        this.ctx = game.ctx
    }

    /**
     * Super-most update method for the scene hierarchy.
     * Currently just updates a timer that tracks how long the current scene is active.
     */
    update() {

        this.timeElapsed += this.game.clockTick
    }
    draw() { }

    /**
     * Super-most enter method for the scene hierarchy.
     * Currently just resets the timeElapsed variable to ensure it is reset when scenes change.
     */
    enter(params) { this.timeElapsed = 0 }
    exit() { }

    /**
     * Adds an entity to the scene to be updated and drawn
     * @param entity
     */
    addEntity(entity) {
        this.entities.push(entity)
    }

    /**
     * Adds an a collidable entity to the game.
     * @param entity
     */
    addCollidableEntity(entity){
        entity.setCollidable()
        this.game.sceneManager.addCollidableEntity(entity)
    }

    /**
     * Remove an entity from scene so it is no longer updated or drawn
     * @param entitiy
     */
    removeEntity(index) {
        this.entities.splice(index, 1)
    }

    removeEntityByRef(entity){
        this.removeEntity(this.entities.indexOf(entity))
    }

    /**
     * Update the scene's map
     *
     * @param tick
     */
    updateMap(tick) {
        if (this.map && this.map.update) {
            this.map.update(tick)
        }
    }


    /**
     * Draws the scene's background.
     * @param ctx 
     */
    drawBackground(ctx) {
        if (this.background) {
            if (!ctx) {
                this.background.draw(this.ctx)
            } else {
                this.background.draw(ctx)
            }
        }
    }


    /**
     * Draw the scene's map
     */
    drawMap() {
        if (this.map && this.map.update) {
            this.map.draw(this.game.ctx)
        }
    }

    /**
     * Update entities details, location, etc
     */
    updateEntities() {
        const entitiesCount = this.entities.length
        if(entitiesCount){
            this.entities.sort((a,b) => a.y - b.y)
        }
        for (let i = 0; i < entitiesCount; i++) {
            const entity = this.entities[i]
            if (entity) { //Removed entities are still in array and being called on??
                if (entity.removeFromWorld === true) {
                    this.removeEntity(i)
                } else {
                    entity.update()
                }
            }
        }

    }

    /**
     * Draw all entities in the scene.
     */
    drawEntities() {
        const entitiesCount = this.entities.length
        for (let i = 0; i < entitiesCount; i++) {
            const entity = this.entities[i]
            entity.draw()
        }
    }

    /**
     * Sets the map for this scene
     *
     * @param map
     */
    setMap(map) {
        this.map = map
    }

    getPlayer() {
        return this.player
    }

    setPlayer(player) {
        this.player = player
    }

    /**
     * Sets the background for this scene
     * 
     * @param background 
     */
    setBackground(background) {
        this.background = background
    }

    /**
     * Generates the map from a dungeon object for this scene.
     * 
     * @param  dungeon 
     */
    generateMap(dungeon) {
        this.dungeon = dungeon
    }
}