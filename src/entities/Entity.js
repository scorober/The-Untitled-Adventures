import {create_UUID} from '../utils/Random.js'
import {STATES} from '../utils/Const.js'
import {HitCircle} from '../utils/Collision.js'
import Vector from '../utils/Vector.js'

export default class Entity {
    constructor(game, x, y, size = 64, height = 1, width = 1) { //size, h and w are set to 1 if no values are passed in. Set to 1 instead of 0 to prevent errors?
        this.game = game
        this.x = x
        this.y = y
        this.removeFromWorld = false
        this.width = width
        this.height = height
        this.size = size
        this.UUID = create_UUID() //UUID for identifying this entity instance.
    }

    update() { } // eslint-disable-line no-unused-vars

    draw() {
        if (this.game.showOutlines && this.radius) {
            this.game.ctx.beginPath()
            this.game.ctx.strokeStyle = 'green'
            this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            this.game.ctx.stroke()
            this.game.ctx.closePath()
        }
    }

    rotateAndCache(image, angle) {
        const offscreenCanvas = document.createElement('canvas')
        const size = Math.max(image.width, image.height)
        offscreenCanvas.width = size
        offscreenCanvas.height = size
        const offscreenCtx = offscreenCanvas.getContext('2d')
        offscreenCtx.save()
        offscreenCtx.translate(size / 2, size / 2)
        offscreenCtx.rotate(angle)
        offscreenCtx.translate(0, 0)
        offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2))
        offscreenCtx.restore()
        return offscreenCanvas
    }

    setCollidable(){
        this.states[STATES.Collidable] = true
        this.hitbox = new HitCircle(this.size, this.x, this.y)
        this.game.sceneManager.addCollidableEntity(this)
    }

    tryMove(x,y){

        var vector = this.checkCollision(new Vector(x, y))

        this.x = vector.x
        this.y = vector.y
    }

    checkCollision(v){
        if(this.states[STATES.Collidable]){ //get all collidable entities

            var collidableEntities = this.game.sceneManager.collisionLayer.getCollidableArray(this)

            if(null === collidableEntities || collidableEntities.length < 1){return v} //no collision, return the requested vector
            else{

                for(let i = 0; i < collidableEntities.length; i++ ){

                    var e = collidableEntities[i]
                    var minDist = e.hitbox.radius + this.hitbox.radius

                    minDist *= minDist

                    var check = (((v.x + e.x)*(v.x + e.x)) + ((v.y + e.y)*(v.y + e.y)))

                    console.log('MIN DIST:', minDist)
                    console.log('check:', check)

                    if( minDist < check ){

                        console.log(' COLLIDED!  ')
                        return v
                    }
                }


            }



        }
        return v
    }
}

