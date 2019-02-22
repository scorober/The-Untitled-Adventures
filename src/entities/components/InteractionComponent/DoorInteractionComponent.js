import InteractionComponent from './InteractionComponent.js'

export default class DoorInteractionComponent extends InteractionComponent {
    constructor(entity, tiles, destination, room) {
        super(entity)
        this.tiles = tiles
    }

    
    update() {
        super.update()
    }

    draw() {

    }

    setRightClick() {
        this.entity.game.sceneManager.currentScene.map.openExit(this.tiles)
        this.entity.removeFromWorld = true
    }

    unsetRightClick() {

    }

    setLeftClick() {

    }

    unsetLeftClick() {

    }
}