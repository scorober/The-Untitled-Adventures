import Scene from './Scene.js'
import Animation from '../../Animation.js'
import { KEYS, ASSET_PATHS} from '../../utils/Const.js'


export default class TitleMenuScene extends Scene {

    constructor(game){
        super(game)
        this.name='titlemenu'
        this.ctx = game.ctx
        this.isMusicPlaying = false

        const sheet = game.getAsset(ASSET_PATHS.TitleAnimation)
        const background = new Animation(sheet, 960, 540, 50, 1, 0.1, 50, true, 1)

        //Adding draw function
        background.draw = function (game) {
            background.drawFrame(game, -550, -200)
        }


        this.setBackground(background) //Because it is just a menu, setting an animation as background

        this.selectedItem = 0
        this.drawSpeedBuffer = 0

        this.text = [
            {TIME: 1.5, TEXT: 'THE UNTITLED ADVENTURES OF', W: this.ctx.canvas.width / 2, H: this.ctx.canvas.height / 2 - 150, COLOR: 'red', FONT: '40px arcade'},
            {TIME: 2, TEXT: 'DR. MARRIOTT', W: this.ctx.canvas.width / 2, H: this.ctx.canvas.height / 2 - 100, COLOR: 'red', FONT: '40px arcade'},
            {TIME: 3, TEXT: 'START', W: this.ctx.canvas.width / 2, H: this.ctx.canvas.height / 2 , COLOR: 'red', FONT: '30px arcade'},
            {TIME: 3.4, TEXT: 'OPTIONS', W: this.ctx.canvas.width / 2, H: this.ctx.canvas.height / 2 + 50, COLOR: 'red', FONT: '30px arcade'},
            {TIME: 3.8, TEXT: 'HIGH SCORE', W: this.ctx.canvas.width / 2, H: this.ctx.canvas.height / 2 + 100, COLOR: 'red', FONT: '30px arcade'},
            {TIME: 4.2, TEXT: 'EXIT', W: this.ctx.canvas.width / 2, H: this.ctx.canvas.height / 2 + 150, COLOR: 'red', FONT: '30px arcade'}
        ]

    }
    playMusic(){
        this.isMusicPlaying = true
        this.game.soundManager.playMusic(1)
    }

    exit(){
        this.game.soundManager.stopMusic()
    }

    // eslint-disable-next-line complexity
    update() {
        const tick = this.game.clockTick
        super.update()
        this.updateMap(tick)

        //wait until all words are displayed to get input
        if(this.timeElapsed > 4){
            if(!this.isMusicPlaying){this.playMusic()}
            if (this.selectedItem===0){this.selectedItem=2}//enable first option if not yet enabled

            if(this.game.inputManager.downKeys[KEYS.Enter]){
                switch (this.selectedItem) {

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
            }

            else if(this.game.inputManager.downKeys[KEYS.ArrowDown] ||
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