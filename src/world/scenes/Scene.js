/**
 * Basic scene object most other scenes will extend.
 */

export default class Scene {
    constructor(game) {
        this.game = game
        this.ctx = game.ctx
        this.entities = []
        this.map = null
        this.background = null
        this.timeElapsed = 0
        this.timeBuffer = 0
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
    enter() { this.timeElapsed = 0 }
    exit() { }

    /**
     * Adds an entity to the scene to be updated and drawn
     * @param entity
     */
    addEntity(entity) {
        this.entities.push(entity)
    }

    /**
     * Adds an a collidable entity to the game. Works in place of addEntity.
     * @param entity
     */
    addCollidableEntity(entity){
        this.addEntity(entity)
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
     * @param ctx
     */
    drawMap(ctx) {
        if (this.map && this.map.update) {
            if (!ctx) {
                this.map.draw(this.ctx)
            } else {
                this.map.draw(ctx)
            }
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
            console.log(entity)
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