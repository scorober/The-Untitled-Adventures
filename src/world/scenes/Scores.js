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
        this.generateFakeScore()
        
        
        this.bgAnimation = new Animation(game.getAsset(ASSET_PATHS.TitleAnimation), 960, 540, 50, 1, 0.1, 50, true, 1)
        this.timeElapsed = 0
        this.selectedItem = 0
        this.width = game.surfaceWidth
        this.height = game.surfaceHeight
        this.offset = 0
        this.txtOffset = this.width / 22
        this.lineSize = 17
        this.max = Math.floor(game.surfaceHeight / this.lineSize) - 6
        this.timeInt = 0.1
        this.count = this.max
        this.index = 0
        this.offsetPrint = 0
        this.scoreText = []
        this.gameOverText = []
        this.initGOT()
        this.titleText = []
        this.initTT()
        this.replayText = []
        this.initRT()
        this.updateText()
        this.FinalSCore = 0
        this.timeBuffer = 0
        this.totalScore = [
            {TIME: 1, TEXT: 0, W: this.width * 5/11 - this.txtOffset, H: this.game.surfaceHeight - 15, COLOR: 'white', FONT: '18px terminal'}
        ]
        

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
        
        // this.game.ctx.addEventListener('resize', function () {
        //     this.draw()
        // })
        
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
        this.drawText(this.gameOverText)
        this.drawText(this.scoreText)
        this.drawText(this.totalScore)
        this.drawText(this.titleText)
        
        if((this.timeElapsed - 1)/this.timeInt > this.scores.length) {
            this.drawTextButton(this.replayText)
        }
    }

    drawText(text){
        for(const i in text){
            const t = text[i]
            if(t.TIME === undefined
                || t.TIME === 0
                || this.timeElapsed > t.TIME){
                this.game.ctx.textAlign = t.ALIGN || 'center'
                this.game.ctx.font = t.FONT
                this.game.ctx.fillStyle = t.COLOR
                this.game.ctx.fillText(t.TEXT, t.W, t.H)
            }
        }
    }

    drawTextButton(text){
        for(const i in text){
            const t = text[i]
            if(t.TIME === undefined
                || t.TIME === 0
                || this.timeElapsed > t.TIME){
                this.game.ctx.textAlign = t.ALIGN || 'center'
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
            this.scoreText.push({TIME: 1 + i*this.timeInt, TEXT: this.scores[i].Name, W: this.width * 1/11 - this.txtOffset, H: 60 + i * this.lineSize - this.offset, COLOR: 'white', FONT: '14px terminal'})
            this.scoreText.push({TIME: 1 + i*this.timeInt, TEXT: this.scores[i].Time, W: this.width * 2/11 - this.txtOffset, H: 60 + i * this.lineSize - this.offset, COLOR: 'white', FONT: '14px terminal'})
            if(this.scores[i].duration != null) {
                this.scoreText.push({TIME: 1 + i*this.timeInt, TEXT: this.scores[i].Duration, W: this.width * 3/11 - this.txtOffset, H: 60 + i * this.lineSize - this.offset, COLOR: 'white', FONT: '14px terminal'})
            }
            this.scoreText.push({TIME: 1 + i*this.timeInt, TEXT: this.scores[i].lvl, W: this.width * 4/11 - this.txtOffset, H: 60 + i * this.lineSize - this.offset, COLOR: 'white', FONT: '14px terminal'})
            this.scoreText.push({TIME: 1 + i*this.timeInt, TEXT: (this.scores[i].Score).toString(), W: this.width * 5/11 - this.txtOffset, H: 60 + i * this.lineSize - this.offset, COLOR: 'white', FONT: '14px terminal'})
        }
    
    }

    updateFinalScore() {
        this.totalScore = []
        this.totalScore.push({TIME: 1, TEXT: this.FinalSCore, W: this.width * 5/11 - this.txtOffset, H: this.game.surfaceHeight - 15, COLOR: 'white', FONT: '18px terminal'})
        
    }
    
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
    
    initGOT() {
        this.gameOverText = [
            {TIME: 0, TEXT: 'GAME', W: this.width * 3 / 4, H: this.height * 1/4 + 25 , COLOR: 'white', FONT: '50px terminal'},
            {TIME: 0, TEXT: 'OVER', W: this.width * 3 / 4, H: this.height * 1/4 - 25 , COLOR: 'white', FONT: '50px terminal'},
        ]
        for(let i = 0; i <= 16 ; i++) {
            this.gameOverText.push({TIME: 0, TEXT: '_', W: this.width * 3 / 4 + (i - 8) * 14, H: this.height * 1/4 - 90 , COLOR: 'white', FONT: '14px terminal'})
            this.gameOverText.push({TIME: 0, TEXT: '_', W: this.width * 3 / 4 + (i - 8) * 14, H: this.height * 1/4 + 55, COLOR: 'white', FONT: '14px terminal'})
        }
        for(let i = 0; i < 8; i++) {
            this.gameOverText.push({TIME: 0, TEXT: '|', W: this.width * 3 / 4 - 7 - (8 * 14), H: this.height * 1 / 4 + (i - 4) * 18, COLOR: 'white', FONT: '14px terminal'})
            this.gameOverText.push({TIME: 0, TEXT: '|', W: this.width * 3 / 4 + 7 + (8 * 14), H: this.height * 1 / 4 + (i - 4) * 18, COLOR: 'white', FONT: '14px terminal'})
            
        }
    }

    initTT() {
        this.titleText = [
            {TIME: 1, TEXT: 'Task', W: this.width * 1/11 - this.txtOffset, H: 25 , COLOR: 'white', FONT: '14px terminal'},
            {TIME: 1, TEXT: 'Time Stamp', W: this.width * 2/11 - this.txtOffset, H: 25, COLOR: 'white', FONT: '14px terminal'},
            {TIME: 1, TEXT: 'Task Duration', W: this.width * 3 / 11 - this.txtOffset, H: 25, COLOR: 'white', FONT: '14px terminal'},
            {TIME: 1, TEXT: 'Level', W: this.width * 4/11 - this.txtOffset, H: 25, COLOR: 'white', FONT: '14px terminal'},
            {TIME: 1, TEXT: 'Score', W: this.width * 5/11 - this.txtOffset, H: 25, COLOR: 'white', FONT: '14px terminal'},
            {TIME: 1, TEXT: 'TOTAL SCORE', W: this.width / 4, H: this.game.surfaceHeight - 15, COLOR: 'white', FONT: '18px terminal'},
        ]
        for(let i = 0; i < this.width * 5 / 11; i += 14) {
            this.titleText.push({TIME: 1, TEXT: '_', W: i, H: 35, COLOR: 'white', FONT: '14px terminal'})
            this.titleText.push({TIME: 1, TEXT: '_', W: i, H: this.game.surfaceHeight - 42, COLOR: 'white', FONT: '14px terminal'})
        }
        for(let i = 0; i < this.game.surfaceHeight - 42; i += 14) {
            this.titleText.push({TIME: 1 , TEXT: ':', W: this.width * 1/11, H: i , COLOR: 'white', FONT: '14px terminal'})
            this.titleText.push({TIME: 1 , TEXT: ':', W: this.width * 2/11, H: i , COLOR: 'white', FONT: '14px terminal'})
            this.titleText.push({TIME: 1 , TEXT: ':', W: this.width * 3/11, H: i , COLOR: 'white', FONT: '14px terminal'})
            this.titleText.push({TIME: 1 , TEXT: ':', W: this.width * 4/11, H: i , COLOR: 'white', FONT: '14px terminal'})
        }
        for(let i = 0; i <= this.height; i += 14) {
            this.titleText.push({TIME: 1 , TEXT: '|', W: this.width / 2 - this.txtOffset, H:  i, COLOR: 'white', FONT: '14px terminal'})
        }
    }

    initRT() {
        this.replayText = [
            {TIME: 0, TEXT: 'REPLAY', W: this.width * 3 / 4, H: this.height *3/4 , COLOR: 'white', FONT: '50px terminal'},
        ]
        for(let i = 0; i <= 18; i++) {
            this.replayText.push({TIME: 0, TEXT: '_', W: this.width * 3 / 4 + (i - 9) * 14, H: this.height * 3 / 4 + 30, COLOR: 'white', FONT: '14px terminal'})
            this.replayText.push({TIME: 0, TEXT: '_', W: this.width * 3 / 4 + (i - 9) * 14, H: this.height * 3 / 4 - 65, COLOR: 'white', FONT: '14px terminal'})
        }
        for(let i = 0; i < 5; i++) {
            this.replayText.push({TIME: 0, TEXT: '|', W: this.width * 3 / 4 - 7 - (9 * 14), H: this.height * 3 / 4 + (i - 3) * 18 + 7, COLOR: 'white', FONT: '14px terminal'})
            this.replayText.push({TIME: 0, TEXT: '|', W: this.width * 3 / 4 + 7 + (9 * 14), H: this.height * 3 / 4 + (i - 3) * 18 + 7, COLOR: 'white', FONT: '14px terminal'})
            
        }
    }
    
    generateFakeScore() {
        for(let j = 0; j < 0; j++) {
            this.scores.push({
                Name: 'MAGE_Kill',
                Time: 2,
                Duration: 10,
                lvl: j,
                Score: 700 * Math.sqrt(1)
            })
            this.scores.push({
                Name: 'ARCHER_Kill',
                Time: 7,
                Duration: null,
                lvl: 1,
                Score: 400 * Math.sqrt(1)
            })
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