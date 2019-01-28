import AssetManager from './AssetManager.js'
import GameEngine from './GameEngine.js'
import PlayerCharacter from './PlayerCharacter.js'
import Map from './Map.js'
import Camera from './Camera.js'
import Marriott from './Marriott.js'

let AM = new AssetManager()

AM.queueDownload('./img/RobotUnicorn.png')
AM.queueDownload('./img/mikeschar.png')
AM.queueDownload('./img/mushroomdude.png')
AM.queueDownload('./img/runningcat.png')
AM.queueDownload('./img/background.jpg')
AM.queueDownload('./img/DungeonColor3@64x64.png')
AM.queueDownload('./img/Marriott.png')

AM.downloadAll(function() {
    var canvas = document.getElementById('gameWorld')
    var ctx = canvas.getContext('2d')
    var gameEngine = new GameEngine()
    let camera = new Camera(gameEngine)
    gameEngine.init(ctx)
    gameEngine.start()

    gameEngine.addEntity(
        new Map(gameEngine, AM.getAsset('./img/DungeonColor3@64x64.png'))
    )

    var player = new PlayerCharacter(gameEngine, AM.getAsset('./img/mikeschar.png'))
    gameEngine.setCamera(camera)
    gameEngine.camera.setFollowedEntity(player)
    gameEngine.addEntity(player)
    gameEngine.addEntity(camera)


    var marriott = new Marriott(gameEngine, AM.getAsset('./img/Marriott.png'))
    // gameEngine.setCamera(camera)
    // gameEngine.camera.setFollowedEntity(player)
    gameEngine.addEntity(marriott)
    // gameEngine.addEntity(camera)
    // marriott.following(player)
    player.follow(marriott)
    console.log('All Done!')
})
