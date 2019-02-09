import AssetManager from './src/AssetManager.js'
import GameEngine from './src/GameEngine.js'
import { ASSET_PATHS } from './src/utils/Const.js'

const assetManager = new AssetManager()

assetManager.queueDownload(ASSET_PATHS.MikesChar)
assetManager.queueDownload(ASSET_PATHS.Background)
assetManager.queueDownload(ASSET_PATHS.Dungeon)
assetManager.queueDownload(ASSET_PATHS.Mage)
assetManager.queueDownload(ASSET_PATHS.Marriott)
assetManager.queueDownload(ASSET_PATHS.Archer)
assetManager.queueDownload(ASSET_PATHS.Robot)
assetManager.queueDownload(ASSET_PATHS.Teleport)
assetManager.queueDownload(ASSET_PATHS.Effect32)
assetManager.queueDownload(ASSET_PATHS.TitleAnimation)
assetManager.queueDownload(ASSET_PATHS.ScottsChar)
assetManager.queueDownload(ASSET_PATHS.Fireball)

assetManager.downloadAll(function () {
    const canvas = document.getElementById('gameWorld')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')
    const gameEngine = new GameEngine()
    window.addEventListener('resize', () => {
        gameEngine.resizeCanvas(window.innerWidth, window.innerHeight)
    })
    gameEngine.assetManager = assetManager
    gameEngine.init(ctx)
    gameEngine.start()
    // eslint-disable-next-line no-console
    console.log('Game started..')
})