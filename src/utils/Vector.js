//Inspired by: https://github.com/maxkueng/victor
//most formulas belong to him. Code rewritten to ES6

export default class Vector {

    constructor(x, y){
        this.x = x
        this.y = y
        this.magnitude = Math.sqrt(this.lengthSq())
    }

    static vectorFromEntity(e){

        return new Vector(e.x, e.y)
    }

    addX(vector){
        this.x += vector.x
        return this
    }

    addY(vector){
        this.y += vector.y
        return this
    }

    add(vector){
        this.x += vector.x
        this.y += vector.y
        return this
    }

    /**
     * Adds the given scalar to both vector axis of the vector
     * @param scalar The scalar scale the vector
     * @returns {Vector}
     */
    addScalar(scalar){
        this.x += scalar
        this.y += scalar
        return this
    }

    addScalarX (scalar) {
        this.x += scalar
        return this
    }

    addScalarY (scalar) {
        this.y += scalar
        return this
    }

    subtractX (vector) {
        this.x -= vector.x
        return this
    }

    subtractY (v) {
        this.y -= v.y
        return this
    }

    subtract (v) {
        this.x -= v.x
        this.y -= v.y
        return this
    }

    subtractScalar (scalar) {
        this.x -= scalar
        this.y -= scalar
        return this
    }

    subtractScalarX (scalar) {
        this.x -= scalar
        return this
    }

    subtractScalarY (scalar) {
        this.y -= scalar
        return this
    }

    distance(vector){
        return Math.sqrt(this.distanceSq(vector))
    }

    distanceSq(vector){
        const dx = this.distanceX(vector), dy = this.distanceY(vector)
        return (dx*dx) + (dy*dy)
    }

    distanceX(vector){
        return this.x - vector.x
    }

    distanceY(vector){
        return this.y - vector.y
    }

    lengthSq(){
        return this.x * this.x + this.y * this.y
    }

    /**
     * If the absolute vector axis is greater than `max`, multiplies the axis by `factor`
     *
     * ### Examples:
     *     var vec = new Victor(100, 50);
     *
     *     vec.limit(80, 0.9);
     *     vec.toString();
     *     // => x:90, y:50
     *
     * @param {Number} max The maximum value for both x and y axis
     * @param {Number} factor Factor by which the axis are to be multiplied with
     * @return {Vector} `this` for chaining capabilities
     * @api public
     */
    limit(max, factor) {
        if (Math.abs(this.x) > max){ this.x *= factor }
        if (Math.abs(this.y) > max){ this.y *= factor }
        return this
    }

    /** static helper methods that can be called by any class. */
    static radian2degrees(radian){
        return radian * degrees
    }

    static degrees2radian(deg){
        return deg / degrees
    }

    //if no vector sent in, function is applied to this vector
    static vectorLength(v = this){
        return Math.sqrt(v.lengthSq())
    }




}
const degrees = 180 / Math.PI