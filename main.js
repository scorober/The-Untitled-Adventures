import AssetManager from './AssetManager.js'
import GameEngine from './GameEngine.js'
<<<<<<< HEAD
import PlayerCharacter from './PlayerCharacter.js'
=======
import PlayableCharacter from './PlayerCharacter.js'
>>>>>>> 5884533a7e2f366c99b5941d3b289e2f4865545c
import Map from './Map.js'
import Camera from './Camera.js'

let AM = new AssetManager()

AM.queueDownload('./img/RobotUnicorn.png')
AM.queueDownload('./img/mikeschar.png')
AM.queueDownload('./img/mushroomdude.png')
AM.queueDownload('./img/runningcat.png')
AM.queueDownload('./img/background.jpg')
AM.queueDownload('./img/DungeonColor3@64x64.png')

AM.downloadAll(function() {
    var canvas = document.getElementById('gameWorld')
    var ctx = canvas.getContext('2d')
    var gameEngine = new GameEngine()
    let camera = new Camera(gameEngine)
    gameEngine.init(ctx, gameEngine.camera)
    gameEngine.start()

    // gameEngine.addEntity(
    //     new Background(gameEngine, AM.getAsset('./img/background.jpg'))
    // )

    gameEngine.addEntity(
        new Map(gameEngine, AM.getAsset('./img/DungeonColor3@64x64.png'))
    )

    var player = new PlayerCharacter(gameEngine, AM.getAsset('./img/mikeschar.png'))
    camera.setFollowedEntity(player)
    gameEngine.addEntity(player)

    gameEngine.addEntity(camera)
    gameEngine.camera = camera

    console.log('All Done!')
})
