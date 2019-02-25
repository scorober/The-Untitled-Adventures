import Scene from './Scene.js'
import Animation from '../../Animation.js'
import { KEYS, ASSET_PATHS} from '../../utils/Const.js'



/**
 * API:
 *    timeElapsed = running clock
 *    selectedItem = the currently highlighted menu option
 *    menuLevel = the active menu
 */
export default class TitleMeScoreDIsplayScenenuScene extends Scene {

    constructor(game) {
        super(game)
        this.name = 'scoredisplay'
        this.menuLevel = MenuLevels.MAIN
        this.menus = {}
        this.scores = []
        for(let j = 0; j <  0; j++) {
            this.scores.push({
                Name: '_Kill',
                Time: 2,
                Duration: 10,
                lvl: j,
                Score: 700 * Math.sqrt(1)
            })
            this.scores.push({
                Name: '_Kill',
                Time: 7,
                Duration: null,
                lvl: 1,
                Score: 400 * Math.sqrt(1)
            })
        }
        this.params = {
            GAME : game,
            MANAGER: this,
            XBASE: game.surfaceWidth / 2,
            YBASE: game.surfaceHeight / 2 + 20,
        }
        this.defaultTextStyles = {
            FONT: '14px terminal',
            BASECOLOR: 'white'
        }
        
        this.bgAnimation = new Animation(game.getAsset(ASSET_PATHS.TitleAnimation), 960, 540, 50, 1, 0.1, 50, true, 1)
        this.timeElapsed = 0
        this.selectedItem = 0
        this.xBase = game.surfaceWidth / 2
        this.yBase = game.surfaceHeight / 2 + 20
        this.offset = 0
        this.lineSize = 17
        this.max = Math.floor(game.surfaceHeight / this.lineSize) - 6
        this.timeInt = 0.1
        this.count = this.max
        this.index = 0
        this.offsetPrint = 0
        this.scoreText = []
        this.updateText()
        this.FinalSCore = 0
        this.timeBuffer = 0
        this.totalScore = [
            {TIME: 1, TEXT: 0, W: 380, H: this.game.surfaceHeight - 20, COLOR: 'white', FONT: '14px terminal'}
        ]
        this.titleText = [
            {TIME: 1, TEXT: 'Task', W: 20, H: 30 , COLOR: 'white', FONT: '14px terminal'},
            {TIME: 1, TEXT: 'Time Stamp', W: 120, H: 30, COLOR: 'white', FONT: '14px terminal'},
            {TIME: 1, TEXT: 'Task Duration', W: 200, H: 30, COLOR: 'white', FONT: '14px terminal'},
            {TIME: 1, TEXT: 'Level', W: 300, H: 30, COLOR: 'white', FONT: '14px terminal'},
            {TIME: 1, TEXT: 'Score', W: 360, H: 30, COLOR: 'white', FONT: '14px terminal'},
            {TIME: 1, TEXT: 'TOTAL SCORE:', W: 150, H: this.game.surfaceHeight - 20, COLOR: 'white', FONT: '14px terminal'},
        ]
        for(let i = 0; i < (this.game.surfaceWidth/14); i++) {
            this.titleText.push({TIME: 1, TEXT: '_', W: i * 14, H: 35, COLOR: 'white', FONT: '14px terminal'})
            this.titleText.push({TIME: 1, TEXT: '_', W: i * 14, H: this.game.surfaceHeight - 45, COLOR: 'white', FONT: '14px terminal'})
        }
    }

    update() {
        super.update()
        this.timeBuffer += this.game.clockTick
        if(this.timeBuffer > this.timeInt) {
            if(this.index < this.scores.length) {
                this.FinalSCore += this.scores[this.index].Score
                this.updateFinalScore()
                this.index++
            }
            if((this.timeElapsed - 1)/this.timeInt > this.max && this.count < this.scores.length) {
                this.offset += this.lineSize
                super.draw()
                this.offsetPrint++
                this.updateText()
            }
            this.timeBuffer -= this.timeInt
        }
    }

    draw() {
        super.draw()
        this.drawText(this.scoreText)
        this.drawText(this.totalScore)
        this.drawText(this.titleText)
    }

    drawText(text){
        for(const i in text){
            const t = text[i]
            if(t.TIME === undefined
                || t.TIME === 0
                || this.timeElapsed > t.TIME){
                this.game.ctx.textAlign = t.ALIGN || 'left'
                this.game.ctx.font = t.FONT
                this.game.ctx.fillStyle = t.COLOR
                this.game.ctx.fillText(t.TEXT, t.W, t.H)
            }
        }
    }

    updateText() {
        this.scoreText = []
        this.count++
        for(let i = this.offsetPrint; i < this.scores.length; i++) {
            this.scoreText.push({TIME: 1 + i*this.timeInt, TEXT: this.scores[i].Name, W: 20, H: 60 + i * this.lineSize - this.offset, COLOR: 'white', FONT: '14px terminal'})
            this.scoreText.push({TIME: 1 + i*this.timeInt, TEXT: this.scores[i].Time, W: 150, H: 60 + i * this.lineSize - this.offset, COLOR: 'white', FONT: '14px terminal'})
            if(this.scores[i].duration != null) {
                this.scoreText.push({TIME: 1 + i*this.timeInt, TEXT: this.scores[i].Duration, W: 250, H: 60 + i * this.lineSize - this.offset, COLOR: 'white', FONT: '14px terminal'})
            }
            this.scoreText.push({TIME: 1 + i*this.timeInt, TEXT: this.scores[i].lvl, W: 310, H: 60 + i * this.lineSize - this.offset, COLOR: 'white', FONT: '14px terminal'})
            this.scoreText.push({TIME: 1 + i*this.timeInt, TEXT: (this.scores[i].Score).toString(), W: 380, H: 60 + i * this.lineSize - this.offset, COLOR: 'white', FONT: '14px terminal'})
        }
    
    }

    updateFinalScore() {
        this.totalScore = []
        this.totalScore.push({TIME: 1, TEXT: this.FinalSCore, W: 380, H: this.game.surfaceHeight - 20, COLOR: 'white', FONT: '14px terminal'})
        
    }
    // getFinalScore(indexTo) {
    //     for(let i = 0; i <= indexTo; i++) {
    //         this.FinalSCore += this.scores[i].Score
    //     }
    // }
    checkKeys(){
        return (this.game.inputManager.downKeys[KEYS.Enter]) ? 0
            : (this.game.inputManager.downKeys[KEYS.ArrowUp]
                || this.game.inputManager.downKeys[KEYS.KeyW]) ? -1
                : (this.game.inputManager.downKeys[KEYS.ArrowDown]
                    || this.game.inputManager.downKeys[KEYS.KeyS]) ? 1
                    : null
    }

    addScores(scoresPassed) {
        for(let i = 0; i < scoresPassed.length; i++) {
            this.scores.push(scoresPassed[i])
        }

    }
}

// class BaseLevel {
//     constructor(params){
//         this.bgAnimation = null
//         this.spritesheet = params.SPRITESHEET
//         this.manager = params.MANAGER
//         this.optionSelected = 0
//         this.menuOptions = ['']

//         this.defaultFont = this.manager.defaultTextStyles.FONT
//         this.defaultBaseColor = this.manager.defaultTextStyles.BASECOLOR
//         this.defaultSelectedColor = this.manager.defaultTextStyles.SELECTEDCOLOR

//     }
//     draw(){

//         if(this.bgAnimation !== null) {
//             const game = this.getGame()
//             this.bgAnimation.drawFrame(game, game.surfaceWidth / 2, game.surfaceHeight / 1.5) //draw animation
//         }
//         // this.drawText(this.manager.scoreText)
//         // this.drawText(this.menuOptions) //draw menu options

//     }
//     //Default update method
//     update(){
//         //tpm debug hack
//         const oldtime = this.manager.timeElapsed
//         this.manager.timeElapsed = 100
//         if(this.manager.timeElapsed > 4.5 ) {
//             const key = this.manager.checkKeys()
//             if(null !== key){
//                 if(0 === key){
//                     this.manager.change(this.getMenuLevel())
//                 }
//                 else {
//                     this.menuOptions[this.optionSelected].COLOR = this.defaultBaseColor
//                     this.optionSelected = this.verifyKeyPos(key)
//                 }
//             }
//             this.menuOptions[this.optionSelected].COLOR = this.defaultSelectedColor
//         }
//         this.manager.timeElapsed = oldtime
//     }
//     enter(){}
//     exit(){}
//     getGame(){return this.manager.game}
//     getElapsedTime(){return this.manager.timeElapsed}
//     getTick(){return this.manager.clockTick}
//     getSelectedItem(){return this.manager.selectedItem}
//     setSelectedItem(item){this.manager.selectedItem = item} //TODO: verify item?
//     updatescoreText(text){
//         if(null === text){
//             this.manager.scoreText = null
//         }else{
//             this.manager.scoreText = text
//         }
//     }
//     drawText(text){this.manager.drawText(text)}
//     getDefaultTextOptions(){return this.manager.defaultTextStyles}
// }

// class MainLevel extends BaseLevel{

//     constructor(params) {
//         super(params)
//         this.level = MenuLevels.MAIN

        

//         this.menuOptions = [
//             {TIME: 3, TEXT: 'START', W: params.XBASE, H: params.YBASE + 5, COLOR: this.defaultBaseColor, FONT: '30px arcade'},
//             {TIME: 3.4, TEXT: 'OPTIONS', W: params.XBASE, H: params.YBASE + 40, COLOR: this.defaultBaseColor, FONT: '30px arcade'},
//             {TIME: 3.8, TEXT: 'HIGH SCORES', W: params.XBASE, H: params.YBASE + 75, COLOR: this.defaultBaseColor, FONT: '30px arcade'},
//             {TIME: 4.2, TEXT: 'EXIT', W: params.XBASE, H: params.YBASE + 105, COLOR: this.defaultBaseColor, FONT: '30px arcade'}

//         ]
//     }


//     verifyKeyPos(key){
//         key += this.optionSelected
//         return this.optionSelected = (key < 0) ? 3 //if user hit 'up' at top option, loop to bot
//             : this.optionSelected = (key > 3) ? 0 //if user hit 'down' on bottom, loop  to top
//                 : key //otherwise keep value as is
//     }

//     getMenuLevel(){
//         return (this.optionSelected === 0) ? MenuLevels.START
//             : (this.optionSelected === 1) ? MenuLevels.OPTIONS
//                 : (this.optionSelected === 2) ? MenuLevels.HIGHSCORE
//                     : this.optionSelected === 3 ? MenuLevels.EXIT
//                         : MenuLevels.START
//     }
//     exit(){
//         this.manager.scoreText[0].TIME = 0
//         this.manager.scoreText[1].TIME = 0
//     }
// }

const MenuLevels = {
    MAIN: 1,
    START: 2,
    OPTIONS: 3,
    HIGHSCORE: 4,
    EXIT: 5,
    NEWGAME: 6,
    SELECTCHAR: 7,
}