import Scene from './Scene.js'
import Animation from '../../Animation.js'
import { KEYS, ASSET_PATHS} from '../../utils/Const.js'




/**
 * API:
 *    timeElapsed = running clock
 *    selectedItem = the currently highlighted menu option
 *    menuLevel = the active menu
 */
export default class TitleMenuScene extends Scene {

    constructor(game) {
        super(game)
        this.name = 'titlemenu'
        this.canInteract = true

        this.animSize = 128



        this.hasLooped = false

        this.characterAnims = {
            INDEX : 0,
            BOUNDS: 2,
            TIMER: 5,
            'ARCHER' :  [
                new Animation(game.getAsset(ASSET_PATHS.ArcherPlayer_RunAttack), 128, 116, 15, 1, 0.05, 15, true, 1.5),
                new Animation(game.getAsset(ASSET_PATHS.ArcherPlayer_Hurt), 128, 116, 11, 1, 0.05, 11, true, 1.5),
                new Animation(game.getAsset(ASSET_PATHS.ArcherPlayer_Slide), 128, 116, 5, 1, 0.05, 5, true, 1.5),
            ],
            'SWORDMAN' : [
                new Animation(game.getAsset(ASSET_PATHS.Swordman_RunAttack), 128, 128, 15, 1, 0.05, 15, true, 1.5),
                new Animation(game.getAsset(ASSET_PATHS.Swordman_Hurt), 128, 128, 11, 1, 0.05, 11, true, 1.5),
                new Animation(game.getAsset(ASSET_PATHS.Swordman_Slide), 128, 128, 5, 1, 0.05, 5, true, 1.5),

            ],
            'MAGE' : [
                new Animation(game.getAsset(ASSET_PATHS.MagePlayer_RunAttack), 128, 128, 15, 1, 0.05, 15, true, 1.5),
                new Animation(game.getAsset(ASSET_PATHS.MagePlayer_Hurt), 128, 128, 11, 1, 0.05, 11, true, 1.5),
                new Animation(game.getAsset(ASSET_PATHS.MagePlayer_Slide), 128, 128, 5, 1, 0.05, 5, true, 1.5),
            ]
        }
        this.bgAnimation = new Animation(game.getAsset(ASSET_PATHS.TitleAnimation), 960, 540, 50, 1, 0.1, 50, true, 1.75)

        this.XBASE = game.surfaceWidth / 2
        this.YBASE = game.surfaceHeight / 2 + 20

        this.timeElapsed = 0
        this.selectedItem = 0

        this.currentLevel = MenuLevels[MENU_IDS.MAIN]
    }



    update() {
        super.update()
        let key = this.checkKeys()
        if(null !== key){
            if(key === 0){ //enter pressed
                this.checkNext(this.currentLevel[this.selectedItem].REF)
            } else if(key === -9){ //escape pressed
                this.currentLevel = MenuLevels[this.currentLevel.PREV] || this.currentLevel //if previous doesn't exist, stay at current level
            }
            else { //up/down/left/right pressed...move selected item cursor
                key += this.selectedItem
                this.currentLevel[this.selectedItem].COLOR = defaultTextStyles.BASECOLOR
                this.selectedItem = (key > this.currentLevel.BOUNDS) ? 0 //if item selection is higher than end of array, loop back around
                    : (key < 0) ? this.currentLevel.BOUNDS
                        : key
                this.currentLevel[this.selectedItem].COLOR = defaultTextStyles.SELECTEDCOLOR
            }
        }
        if(this.currentLevel.HAS_ANIMATIONS) {
            this.characterAnims.TIMER -= this.game.clockTick
            this.checkSwitchAnims()
        }
    }

    checkSwitchAnims() {
        if(this.characterAnims.TIMER < 0 ){
            this.characterAnims.TIMER = 5
            this.characterAnims.INDEX = (this.characterAnims.INDEX >= 2) ? 0 : this.characterAnims.INDEX+1
        }
    }

    checkNext(nextMenuRef){
        if(nextMenuRef == MENU_IDS.ARCHER){
            //start game archer
            this.game.sceneManager.change('level1', 'ARCHER') //TODO: Add params to spawn as an archer
        } else if(nextMenuRef == MENU_IDS.SWORDMAN){
            //start swordsman game
            this.game.sceneManager.change('level1', 'SWORDMAN')
        } else if (nextMenuRef == MENU_IDS.MAGE) {
            //start mage
            this.game.sceneManager.change('level1', 'MAGE')
        } else {
            this.currentLevel = MenuLevels[nextMenuRef]
        }
    }



    draw() {
        super.draw()
        if(this.currentLevel.HAS_ANIMATIONS){
            this.drawAnims()
            this.drawText(MenuLevels.NEWGAME.TITLE)
        } else {
            this.bgAnimation.drawFrame(this.game, this.XBASE, this.YBASE + ((3/4) * this.YBASE) - 10 )
            this.drawText(MenuLevels.TITLE)
        }
        this.drawText(this.currentLevel)
    }


    drawText(textlevel){ //set to current level if no level
        if(null === textlevel){textlevel = this.currentLevel}
        this.game.ctx.textAlign = textlevel.ALIGNMENT || 'center'
        for(let i = 0; i <= textlevel.BOUNDS; i++){
            //const padding = this.game.ctx.measureText(textlevel[i].TEXT)
            this.game.ctx.font = textlevel[i].FONT
            this.game.ctx.fillStyle = textlevel[i].COLOR
            this.game.ctx.fillText(textlevel[i].TEXT, textlevel[i].W + this.XBASE , textlevel[i].H + this.YBASE)
        }
    }

    drawAnims(){

        //const x = this.animSize + ((1/3)*this.animSize) - 10
        const padding = this.animSize*(2/3)
        const y = (this.YBASE - this.animSize - ((1/3)*this.animSize)) + padding
        const w = this.game.ctx.canvas.width
        const archerX = w*(1/4)
        const swordmanX = w*(1/2)
        const mageX = w*(3/4)


        this.game.ctx.beginPath()
        this.game.ctx.lineWidth = '5'
        this.game.ctx.fillStyle = 'black'
        this.game.ctx.strokeStyle = 'black'

        this.game.ctx.fillRect(archerX - padding - 12, y, this.animSize + padding , this.animSize + padding)
        this.game.ctx.fillRect(swordmanX - padding - 12, y , this.animSize + padding, this.animSize + padding)
        this.game.ctx.fillRect(mageX - padding - 12, y, this.animSize + padding, this.animSize + padding)
        this.game.ctx.stroke()

        this.characterAnims.ARCHER[this.characterAnims.INDEX].drawFrame(this.game, archerX, this.YBASE + padding)
        this.characterAnims.SWORDMAN[this.characterAnims.INDEX].drawFrame(this.game, swordmanX, this.YBASE + padding + 10)
        this.characterAnims.MAGE[this.characterAnims.INDEX].drawFrame(this.game, mageX, this.YBASE + padding)
    }

    /**
     * Checks the input manager for downkeys. Returns:
     *      0 if enter pressed,
     *      -1 for anything that would move the selected item up,
     *      1 for anything that would move the selected item down
     *      null if no relavent keys were pressed
     *
     *   TODO: Check for mouse input.
     */
    checkKeys(){
        if(!this.canInteract){
            return null
        }else {
            const downKeys = this.game.inputManager.downKeys
            return (downKeys[KEYS.Enter]) ? 0
                : (downKeys[KEYS.Escape]) ? -9
                    : (downKeys[KEYS.ArrowUp] || downKeys[KEYS.KeyW] || downKeys[KEYS.ArrowLeft] || downKeys[KEYS.KeyA]) ? -1
                        : (downKeys[KEYS.ArrowDown] || downKeys[KEYS.ArrowRight] || downKeys[KEYS.KeyS] || downKeys[KEYS.KeyD]) ? 1
                            : null
        }
    }

    setInteractable(){
        this.canInteract = true
        this.selectedItem = 0
        this.currentLevel[this.selectedItem].COLOR = defaultTextStyles.SELECTEDCOLOR
    }

}

const MENU_IDS = {
    MAIN: 'MAIN',
    START: 'START',
    NEWGAME: 'NEWGAME',
    LOADGAME: 'LOAD',
    OPTIONS: 'OPT',
    SCORES: 'SCORE',
    EXIT: 'EXIT',
    ARCHER: 'ARCHER',
    SWORDMAN : 'SWORDMAN',
    MAGE : 'MAGE',
    TITLE : 'TITLE'
}
/**
 * LEVEL : {
 *     TEXT OPTION : {
 *         TEXT:
 *         W : <offset from base start point, defined by canvas size>
 *         H : <offset from base start point, defined by canvas size>
 *         COLOR : print color
 *         FONT : font type
 *         TIME : elapsed time before text appears
 *     }
 * }
 */

const MenuLevels = {
    TITLE: {
        0 : {
            TEXT : 'THE UNTITLED ADVENTURES OF',
            W : 0,
            H : - 200,
            COLOR : 'red',
            FONT : '40px arcade',
            TIME : 1
        },
        1 : {
            TEXT: 'DR MARIOTT',
            W : 0,
            H : - 150,
            COLOR : 'red',
            FONT : '40px arcade',
            TIME : 2
        },
        BOUNDS : 1,
        ALIGNMENT: 'center'
    },
    MAIN : {
        BOUNDS : 3,
        PREV : MENU_IDS.MAIN,
        HAS_ANIMATIONS : false,
        0 :{
            TEXT : 'START',
            W : 0,
            H : 50,
            COLOR : 'red',
            FONT : '40px arcade',
            TIME : 1,
            REF: MENU_IDS.START
        },
        1 :{
            TEXT : 'OPTIONS',
            W : 0,
            H : 90,
            COLOR : 'red',
            FONT : '40px arcade',
            TIME : 1,
            REF: MENU_IDS.OPTIONS
        },
        2 :{
            TEXT : 'SCORES',
            W : 0,
            H : 130,
            COLOR : 'red',
            FONT : '40px arcade',
            TIME : 1,
            REF: MENU_IDS.SCORES
        },
        3  :{
            TEXT : 'EXIT',
            W : 0,
            H : 170,
            COLOR : 'red',
            FONT : '40px arcade',
            TIME : 1,
            REF: MENU_IDS.EXIT
        },
    },
    START : {
        BOUNDS : 1,
        PREV: MENU_IDS.MAIN,
        ALIGNMENT: 'center',
        HAS_ANIMATIONS : false,
        0 :{
            TEXT : 'NEW GAME',
            W : 0,
            H : 50,
            COLOR : 'white',
            FONT : '40px arcade',
            TIME : 1,
            REF: MENU_IDS.NEWGAME
        },
        1 :{
            TEXT : 'LOAD GAME',
            W : 0,
            H : 100,
            COLOR : 'red',
            FONT : '40px arcade',
            TIME : 1,
            REF: MENU_IDS.LOADGAME
        },

    },
    NEWGAME: {
        TITLE: {
            BOUNDS: 0,
            ALIGNMENT : 'center',
            0 : {
                TEXT : 'SELECT A CHARACTER',
                W : 0,
                H : - 200,
                COLOR : 'red',
                FONT : '40px arcade',
                TIME : 1
            },
        },
        BOUNDS : 2,
        PREV: MENU_IDS.START,
        HAS_ANIMATIONS : true,
        ALIGNMENT: 'center',
        0 :{
            TEXT : 'ARCHER',
            W : -470,
            H : 175,
            COLOR : 'red',
            FONT : '30px arcade',
            TIME : 1,
            REF: MENU_IDS.ARCHER
        },
        1 :{
            TEXT : 'SWORSDMAN',
            W : 10,
            H : 175,
            COLOR : 'red',
            FONT : '30px arcade',
            TIME : 1,
            REF: MENU_IDS.SWORDMAN
        },
        2 :{
            TEXT : 'MAGE',
            W : 500,
            H : 175,
            COLOR : 'red',
            FONT : '30px arcade',
            TIME : 1,
            REF: MENU_IDS.MAGE
        },
    },
    LOADGAME : {
        ID: 4,
        MENU_OPTIONS : {},
    },
    ARCHER: {
        ID: 15
    },
    SWORDMAN : {
        ID: 16
    },
    MAGE : {
        ID: 17
    }
}

const defaultTextStyles = {
    FONT: '30px arcade',
    SELECTEDCOLOR: 'white',
    BASECOLOR: 'red'
}