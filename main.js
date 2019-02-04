import AssetManager from './src/AssetManager.js'
import GameEngine from './src/GameEngine.js'
import { ASSET_PATHS } from './src/utils/Const.js'

const assetManager = new AssetManager()

assetManager.queueDownload(ASSET_PATHS.MikesChar)
assetManager.queueDownload(ASSET_PATHS.BG1)
assetManager.queueDownload(ASSET_PATHS.Dungeon1_64x64)
assetManager.queueDownload(ASSET_PATHS.MageFull)
assetManager.queueDownload(ASSET_PATHS.Mariott)
assetManager.queueDownload(ASSET_PATHS.TitleBG)

assetManager.downloadAll(function() {
    const canvas = document.getElementById('gameWorld')
    const ctx = canvas.getContext('2d')
    const gameEngine = new GameEngine()
    gameEngine.assetManager = assetManager
    gameEngine.init(ctx)
    gameEngine.start()
    console.log('Game started..')
})
