/**
 * Basic scene object most other scenes will extend.
 */

export default class Scene {
    constructor(game){
        this.game = game
        this.ctx = game.ctx
        this.entities = []

        this.map = null

        this.timeEllapsed = 0
        this.timeBuffer = 0
    }

    //Empty methods to prevent errors if inherited classes don't call them//
    update(tick){} // eslint-disable-line no-unused-vars
    draw(ctx){} // eslint-disable-line no-unused-vars
    enter(){}
    exit(){}

    /**
     * Adds an entity to the scene to be updated and drawn
     * @param entity
     */
    addEntity(entity){
        this.entities.push(entity)
    }

    /**
     * Remove an entity from scene so it is no longer updated or drawn
     * @param entitiy
     */
    removeEntitiy(entitiy){
        this.entities.pop(entitiy)
    }

    /**
     * Update the scene's map
     *
     * @param tick
     */
    updateMap(tick){
        if(this.map && this.map.update){
            this.map.update(tick)
        }
    }

    /**
     * Draw the scene's map
     * @param ctx
     */
    drawMap(ctx){
        if(this.map && this.map.update){
            if(!ctx){
                this.map.draw(this.ctx)
            }else {
                this.map.draw(ctx)
            }
        }
    }

    /**
     * Update entities details, location, etc
     * @param tick the time passed since last update
     */
    updateEntities(tick){

        var entitiesCount = this.entities.length

        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i]

            entity.update(tick)
        }
    }

    /**
     * Draw all entities in the scene.
     * @param ctx the drawing area
     */
    drawEntities(ctx){

        var entitiesCount = this.entities.length

        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i]

            entity.draw(ctx)
        }
    }

    /**
     * Serts the map for this scene
     *
     * @param map
     */
    setMap(map){
        this.map = map
    }



}