/**
 * Basic scene object most other scenes will extend.
 */

export default class Scene {
    constructor(game, lvl) {
        this.game = game
        this.entities = []
        this.items = []
        this.map = null
        this.background = null
        this.highlightedEntity = {}
        this.timeElapsed = 0
        this.timeBuffer = 0
        this.pacified = true
        this.swarm = false
        this.scores = []
        this.level = lvl
        this.mobCount = 0
        this.killCount = 0
        this.currentRoomEnterTime = 0
        this.currentRoomTimeLapse = 0
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
     * Adds an item to the scene's item layer to be updated and drawn
     * @param item
     */
    addItem(item) {
        this.items.push(item)
    }

    /**
     * Adds an a collidable entity to the game. Works in place of addEntity.
     * @param entity
     */
    addCollidableEntity(entity) {
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
     * Remove an item from scene so it is no longer updated or drawn
     * @param item
     */
    removeItem(index) {
        this.items.splice(index, 1)
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
     * Draws the top layer of the scene's map over entities.
     */
    drawMapTop() {
        if (this.map && this.map.update) {
            this.map.drawTop(this.game.ctx)
        }
    }

    /**
     * Update entities details, location, etc
     */
    updateEntities() {
        // Concat sorted Entities list to the end of items, so items draw first
        const entities = this.items.concat(this.entities.sort((a, b) => a.y - b.y))
        const entitiesCount = entities.length
        for (let i = 0; i < entitiesCount; i++) {
            const entity = entities[i]
            if (entity) {
                if (entity.removeFromWorld === true) {
                    this.game.removeEntityByRef(entities[i])
                } else {
                    entity.update()
                }
            }
        }
        this.checkMapState()
    }

    /**
     * Draw all entities in the scene.
     */
    drawEntities() {
        // Concat sorted Entities list to the end of items, so items draw first
        const entities = this.items.concat(this.entities.sort((a, b) => a.y - b.y))
        const entitiesCount = entities.length
        for (let i = 0; i < entitiesCount; i++) {

            const entity = entities[i]
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

    countMob() {
        this.mobCount++
    }

    /**
     * Adds to the mobcount.
     * @param {Number} mobs 
     */
    addMobs(mobs) {
        if (this.mobCount === 0) {
            this.setSwarm()
        }
        this.mobCount += mobs
    }

    setSwarm() {
        this.baseCount = this.game.sceneManager.scenes['scoredisplay'].killCount
        this.swarm = true
        this.pacified = false
        this.currentRoomEnterTime = this.game.timer.gameTime
    }

    setPacified() {
        this.pacified = true
        this.swarm = false
        this.mobCount = 0
        this.currentRoomTimeLapse = (this.game.timer.gameTime - this.currentRoomEnterTime).toFixed(2)
        this.game.addScore('ROOM', false)
    }

    checkEnemy(str) {
        return str.includes('MAGE') || str.includes('ARCHER') || str.includes('ROBOT')
    }

    checkMapState() {
        //TODO check against a known spawn amount of mobs for this cycle and player's killcount?
        const killCount = this.game.sceneManager.scenes['scoredisplay'].killCount
        if (killCount === this.baseCount + this.mobCount) {

            this.setPacified()
        }
    }
}