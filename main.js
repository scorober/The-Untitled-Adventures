import AssetManager from './src/utils/AssetManager.js'
import GameEngine from './src/GameEngine.js'
// import PlayerCharacter from './src/entities/PlayerCharacter.js'
// import Map from './src/world/Map.js'
// import Camera from './src/world/Camera.js'

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

    //let camera = new Camera(gameEngine) //TODO: define this by scene? Not all scenes will need this and it will probably change between scenes.
    gameEngine.init(ctx)
    gameEngine.start()

    // ALL CODE THAT WAS HERE HAS BEEN ADDED TO firstlevel_scene.js


    //gameEngine.addEntity(
    //    new Map(gameEngine, AM.getAsset('./img/DungeonColor3@64x64.png'))
    //)

    //var player = new PlayerCharacter(gameEngine, AM.getAsset('./img/mikeschar.png'))
    //gameEngine.setCamera(camera)
    //gameEngine.camera.setFollowedEntity(player)
    //gameEngine.addEntity(player)
    //gameEngine.addEntity(camera)

    console.log('All Done!')
})
