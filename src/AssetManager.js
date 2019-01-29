export default class AssetManager {
    constructor() {
        this.successCount = 0
        this.errorCount = 0
        this.cache = []
        this.downloadQueue = []
    }

    queueDownload(path) {
        this.downloadQueue.push(path)
    }

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount
    }

    downloadAll(callback) {
        for (let i = 0; i < this.downloadQueue.length; i += 1) {
            const img = document.createElement('img')
            const path = this.downloadQueue[i]
            img.addEventListener('load', () => {
                this.successCount++
                if (this.isDone()) callback()
            })
            img.addEventListener('error', () => {
                this.errorCount++
                if (this.isDone()) callback()
            })
            img.src = path
            this.cache[path] = img
        }
    }

    getAsset(path) {
        return this.cache[path]
    }
}
