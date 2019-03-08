import InteractionComponent from './InteractionComponent.js'

export default class StairInteractionComponent extends InteractionComponent {
    constructor(entity, tiles) {
        super(entity)
        this.tiles = tiles
    }

    
    update() {
        super.update()
    }

    draw() {

    }

    setRightClick() {
        this.entity.game.addScore('END', false)
        this.entity.game.sceneManager.change('scoredisplay')
        this.entity.game.sceneManager.currentScene.updateText()
    }

    unsetRightClick() {

    }

    setLeftClick() {

    }

    unsetLeftClick() {

    }
}