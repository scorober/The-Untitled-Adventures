export default class Random {
    constructor(seed) {
        this.m = 0x80000000
        this.a = 651354841
        this.c = 65235

        this.state = seed ? seed : Math.floor(Math.random * (this.m - 1));
          
    }

    nextInt() {
        return this.state = (this.a * this.state + this.c) % this.m;
    }

    int(min, max) {
        let rangeSize = max - min
        let rndFloat = this.nextInt() / this.m
        return min + Math.floor(rndFloat * rangeSize)
    
        // return this.rng.intBetween(min, max);
    }

    float(min=0, max=1) {
        return this.nextInt() / (this.m - 1)
        // return this.rng.floatBetween(min, max);
    }

    vec(min, max){
        //min and max are vectors [int, int];
        //returns [min[0]<=x<=max[0], min[1]<=y<=max[1]]
        return [this.int(min[0], max[0]), this.int(min[1], max[1])];
    }

    choose(items, remove=false) {

        let idx = this.int(0, items.length - 1);
        if (remove) {
            return items.splice(idx, 1)[0];
        } else {
            return items[idx];
        }


        // let idx = this.rng.intBetween(0, items.length - 1);
        // if (remove) {
        //     return items.splice(idx, 1)[0];
        // } else {
        //     return items[idx];
        // }
    }

    maybe(probability) {
        return this.float() <= probability;
    }
};