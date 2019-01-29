import AssetManager from './src/AssetManager.js'
import GameEngine from './src/GameEngine.js'

const assetManager = new AssetManager()

assetManager.queueDownload('./assets/img/RobotUnicorn.png')
assetManager.queueDownload('./assets/img/mikeschar.png')
assetManager.queueDownload('./assets/img/mushroomdude.png')
assetManager.queueDownload('./assets/img/runningcat.png')
assetManager.queueDownload('./assets/img/background.jpg')
assetManager.queueDownload('./assets/img/DungeonColor3@64x64.png')

assetManager.downloadAll(function() {
    const canvas = document.getElementById('gameWorld')
    const ctx = canvas.getContext('2d')
    const gameEngine = new GameEngine()
    gameEngine.assetManager = assetManager
    gameEngine.init(ctx)
    gameEngine.start()
    console.log('Game started..')
})
