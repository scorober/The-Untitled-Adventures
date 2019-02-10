import Scene from './Scene.js'
import Animation from '../../Animation.js'
import { KEYS, ASSET_PATHS} from '../../utils/Const.js'


export default class TitleMenuScene extends Scene {

    constructor(game){
        super(game)
        this.name='titlemenu'

        const sheet = game.getAsset(ASSET_PATHS.TitleAnimation)
        const background = new Animation(sheet, 960, 540, 50, 1, 0.1, 50, true, 1)

        //Adding draw function
        background.draw = function (game) {
            background.drawFrame(game, game.surfaceWidth /2 , game.surfaceHeight / 1.5, 0)
        }

        background.update = function (tick) {
            background.updateFrame(tick)
        }

        this.setBackground(background) //Because it is just a menu, setting an animation as background

        this.selectedItem = 0
        this.drawSpeedBuffer = 0
        const yBase = this.ctx.canvas.height / 2 + 20
        this.text = [
            {TIME: 1.5, TEXT: 'THE UNTITLED ADVENTURES OF', W: this.ctx.canvas.width / 2, H: yBase - 200, COLOR: 'red', FONT: '40px arcade'},
            {TIME: 2, TEXT: 'DR. MARRIOTT', W: this.ctx.canvas.width / 2, H: yBase - 150, COLOR: 'red', FONT: '40px arcade'},
            {TIME: 3, TEXT: 'START', W: this.ctx.canvas.width / 2, H: yBase - 30, COLOR: 'red', FONT: '30px arcade'},
            {TIME: 3.4, TEXT: 'OPTIONS', W: this.ctx.canvas.width / 2, H: yBase + 5, COLOR: 'red', FONT: '30px arcade'},
            {TIME: 3.8, TEXT: 'HIGH SCORE', W: this.ctx.canvas.width / 2, H: yBase + 40, COLOR: 'red', FONT: '30px arcade'},
            {TIME: 4.2, TEXT: 'EXIT', W: this.ctx.canvas.width / 2, H: yBase + 75, COLOR: 'red', FONT: '30px arcade'}
        ]

    }

    update() {
        const tick = this.game.clockTick
        super.update()
        this.updateMap(tick)

        this.drawSpeedBuffer += tick

        //wait until all words are displayed to get input
        if(this.drawSpeedBuffer > 0.10 && this.timeElapsed > 4.5){

            if (this.selectedItem===0){this.selectedItem=2}//enable first option if not yet enabled

            if(this.game.inputManager.downKeys[KEYS.Enter]){
                switch (this.selectedItem) {
                    //TODO: Logic for other items
                    case 2:{
                        //switch to start game
                        console.log('start game!')
                        this.game.sceneManager.change('level1', null)
                    }

                }
            }
            if(this.game.inputManager.downKeys[KEYS.ArrowUp] ||
                this.game.inputManager.downKeys[KEYS.KeyW]){

                this.text[this.selectedItem].COLOR = 'red' //reset color
                if(this.selectedItem === 2){this.selectedItem =  5}else{this.selectedItem--}

            } else if(this.game.inputManager.downKeys[KEYS.ArrowDown] ||
                this.game.inputManager.downKeys[KEYS.KeyS]){

                this.text[this.selectedItem].COLOR = 'red' //reset color
                if(this.selectedItem === 5){this.selectedItem =  2}else{this.selectedItem++}
            }
            this.text[this.selectedItem].COLOR = 'white'
            this.drawSpeedBuffer = 0
        }
    }

    draw(){
        super.draw()
        super.drawBackground(this.game)

        this.ctx.textAlign = 'center'

        for(const i in this.text){

            const t = this.text[i]
            if(this.timeElapsed > t.TIME){
                this.ctx.font = t.FONT
                this.ctx.fillStyle = t.COLOR
                this.ctx.fillText(t.TEXT, t.W, t.H)
            }
        }
    }


}