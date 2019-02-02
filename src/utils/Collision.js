import Vector from './Vector.js'

export class CollisionLayer{

    constructor() {

        this.collidables = []
        this.collidableLayer = [[]] //2d array. Probably don't need after changes...

    }
    addCollidable(e){

        //TODO: Check collidables for UUID to ensure it doesn't exist
        this.collidables.push(e)

    }



    collidesUUID(x,y){
        if(this.collides(x,y)) {
            return this.collidableLayer[x][y]
        }
    }

    getEntity(x,y){
        //Use collides func as helper to tell if space is occupied
        if(this.collides(x,y)){
            return this.collidables[this.collidableLayer[x][y]]
        }
    }

    getCollidableArray(entity){

        var hb = entity.hitbox

        if(!hb){return null}

        //Returns a filtered array with all collidables that are within range
        return this.collidables.filter(e =>
            (e.UUID !== entity.UUID) && (hb.location.distance(e.hitbox.location) <= (hb.radius + e.hitbox.radius)) === true
        )

    }

}

//TODO: Implement other shapes like box? Can be used together.
export class HitCircle{

    constructor(radius, x, y){
        this.radius = radius
        this.location = new Vector(x, y)
    }

    /**
     * Updates the hitbox coords with new x/y value
     * @param x
     * @param y
     */
    update(x, y){
        this.location.x = x
        this.location.y = y
    }
}
