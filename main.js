import AssetManager from './src/utils/AssetManager.js'
import GameEngine from './src/GameEngine.js'

let AM = new AssetManager()

AM.queueDownload('./assets/img/RobotUnicorn.png')
AM.queueDownload('./assets/img/mikeschar.png')
AM.queueDownload('./assets/img/mushroomdude.png')
AM.queueDownload('./assets/img/runningcat.png')
AM.queueDownload('./assets/img/background.jpg')
AM.queueDownload('./assets/img/DungeonColor3@64x64.png')

AM.downloadAll(function() {

    var canvas = document.getElementById('gameWorld')
    var ctx = canvas.getContext('2d')
    var gameEngine = new GameEngine()
    gameEngine.ASSET_MANAGER = AM

    gameEngine.init(ctx)
    gameEngine.start()
})
