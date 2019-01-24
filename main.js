import AssetManager from './AssetManager.js'
import Background from './Background.js'
import GameEngine from './GameEngine.js'
import PlayerCharacter from './PlayerCharacter.js'

var AM = new AssetManager()

AM.queueDownload('./img/RobotUnicorn.png')
AM.queueDownload('./img/mikeschar.png')
AM.queueDownload('./img/mushroomdude.png')
AM.queueDownload('./img/runningcat.png')
AM.queueDownload('/img/background.jpg')

AM.downloadAll(function () {
    var canvas = document.getElementById('gameWorld')
    var ctx = canvas.getContext('2d')

    var gameEngine = new GameEngine()
    gameEngine.init(ctx)
    gameEngine.start()

    gameEngine.addEntity(
        new Background(gameEngine, AM.getAsset('/img/background.jpg'))
    )

    gameEngine.addEntity(
        new PlayerCharacter(gameEngine, AM.getAsset('./img/mikeschar.png'))
    )

    console.log('All Done!')
})
