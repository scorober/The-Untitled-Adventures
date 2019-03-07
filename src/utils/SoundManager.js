var files = {
    MUSIC1: "./assets/sounds/music1.wav",
    MUSIC2: "./assets/sounds/music2.mp3",
    ALARM: "./assets/sounds/alarm.wav",
    FIRECAST: "./assets/sounds/fire_cast.wav",
    FIREIMPACT: "./assets/sounds/fire_impact.wav",
    ARROWCAST: "./assets/sounds/arrow_cast.wav",
    ARROWCAST1: "./assets/sounds/arrow_cast1.wav",
    ARROWCAST2: "./assets/sounds/arrow_cast2.wav",
    ARROWIMPACT: "./assets/sounds/arrow_impact.wav",
    ENERGYCAST: "./assets/sounds/energy_cast.wav",
    ENERGYIMPACT: "./assets/sounds/energy_impact.wav",
    PUNCH: "./assets/sounds/punch.wav",
    PUNCH1: "./assets/sounds/punch1.wav",
    PUNCH2: "./assets/sounds/punch2.wav",
    LIGHTNINGCAST: "./assets/sounds/punch.wav",
    BEEP: "./assets/sounds/beep.wav",
    BEEP1: "./assets/sounds/beep_01.wav",
    BEEP2: "./assets/sounds/beep_02.wav",
    BEEP3: "./assets/sounds/beep_03.wav",
    COLLECT: "./assets/sounds/collect.wav",
    COLLECT1: "./assets/sounds/collect1.wav",
    GROWL: "./assets/sounds/growl.wav",
    DOOR: "./assets/sounds/door.wav",
    DOOR1: "./assets/sounds/door1.wav",
    COMPLETE: "./assets/sounds/complete.mp3",
    SLASH1: "./assets/sounds/slash1.wav",
    SLASH2: "./assets/sounds/slash2.mp3",
    SLASH3: "./assets/sounds/slash3.mp3",
    SPELL: "./assets/sounds/spell.wav",
    SPELL1: "./assets/sounds/spell1.wav",
    SPELLCHARGE: "./assets/sounds/spellcharge.wav",
    SPELLCHARGE1: "./assets/sounds/spellcharge1.wav",
    WOOSH: "./assets/sounds/woosh.wav",
    SLAM: "./assets/sounds/slam.wav",
    SLAM1: "./assets/sounds/slam1.wav",
    ROBOT: "./assets/sounds/robot.wav"
};
let sounds = {};

function initSounds() {
    let s = Object.values(files);
    for (let t = 0; t < s.length; t++) {
        let i = s[t],
            e = new Audio;
        e.src = i, sounds[i] = e
    }
}

function SoundManager() {
    this.archAtk = null, this.playerAtk = null, this.mageAtk = null, this.knightAtk = null, this.chiefAtk = null, this.robotAtk = null, this.isSoundsInit = !1, this.lastSlash = 0, this.lastPunch = 0, this.sc = 0, this.ec = 0, this.cache = sounds, this.files = files, this.PLAY = {}, this.PLAY.sm = this, this.SET = {}, this.SET.sm = this, this.init()
}

function soundevent(s, t, i, e) {
    this.first = s, this.timeout1 = t || 0, this.hasSecond = !1, null != i && (this.second = i, this.timeout2 = e || 0, this.hasSecond = !0), this.play = function () {
        null != s && playsound(this.first, this.timeout1), this.hasSecond && playsound(this.second, this.timeout2)
    }
}
async function playsound(s, t) {
    setTimeout(function () {
        s.play()
    }, t)
}
initSounds(), SoundManager.prototype.FIRECAST = function () {
    this.cache[this.files.FIRECAST].play()
}, SoundManager.prototype.setvol = function (s, t) {
    s.volume = t
}, SoundManager.prototype.FIREIMPACT = function () {
    this.cache[this.files.FIREIMPACT].play()
}, SoundManager.prototype.OPENDOOR = function () {
    first = this.cache[this.files.DOOR], second = this.cache[this.files.COMPLETE], playsound(first, 0), playsound(second, 1e3)
}, SoundManager.prototype.ARROWCAST = function () {
    this.cache[this.files.ARROWCAST].play()
}, SoundManager.prototype.ARROWIMPACT = function () {
    this.cache[this.files.ARROWIMPACT].play()
}, SoundManager.prototype.ENERGYCAST = function () {
    this.cache[this.files.ENERGYCAST].play()
}, SoundManager.prototype.ENERGYIMPACT = function () {
    this.cache[this.files.ENERGYIMPACT].play()
}, SoundManager.prototype.LIGHTNINGCAST = function () {
    this.cache[this.files.LIGHTNINGCAST].play()
}, SoundManager.prototype.PUNCH = function () {
    this.cache[this.files.PUNCH].play()
}, SoundManager.prototype.PUNCH = function (s) { }, SoundManager.prototype.RANDPUNCH = function () { }, SoundManager.prototype.RANDSLASH = function () { }, SoundManager.prototype.BEEP = function () {
    this.cache[this.files.BEEP].play()
}, SoundManager.prototype.BEEP = function (s) {
    1 === s ? this.cache[this.files.BEEP1].play() : 2 === s ? this.cache[this.files.BEEP2].play() : 3 === s ? this.cache[this.files.BEEP3].play() : this.cache[this.files.BEEP].play()
}, SoundManager.prototype.setmusic = function (s) {
    1 === s ? this.playingSong = this.cache[this.files.MUSIC1] : 2 === s && (this.playingSong = this.cache[this.files.MUSIC2])
}, SoundManager.prototype.isFin = function () {
    return this.files.length === this.sc + this.ec
}, SoundManager.prototype.playMusic = function (s) {
    1 === s ? this.playingSong = this.cache[this.files.MUSIC1] : 2 === s && (this.playingSong = this.cache[this.files.MUSIC2]), this.playingSong.play()
}, SoundManager.prototype.stopMusic = function () {
    this.playingSong.pause(), this.playingSong.currentTime = 0
}, SoundManager.prototype.load = function (s) { }, SoundManager.prototype.playImpact = function (s) {
    s.includes("PLAYER") ? this.RANDSLASH() : s.includes("ARCHER") ? this.ARROWIMPACT() : s.includes("WOLF") ? this.cache[this.files.GROWL].play() : s.includes("MAGE") ? this.cache[this.files.SPELL1].play() : s.includes("KNIGHT")
}, SoundManager.prototype.playAttack = function (s) {
    this.isSoundsInit || this.init();
    s.includes("PLAYER") || s.includes("WAR") ? this.playerAtk.play() : s.includes("ARCHER") ? this.archAtk.play() : s.includes("WOLF") ? this.RANDPUNCH() : s.includes("CHIEF") ? this.chiefAtk.play() : s.includes("MAGE") ? this.mageAtk.play() : s.includes("KNIGHT") ? this.knightAtk.play() : s.includes("ROBOT") && this.robotAtk.play()
}, SoundManager.prototype.spawnSound = function () {
    this.cache[this.files.ALARM].play()
}, SoundManager.prototype.init = function () {
    this.isSoundsInit = !0, this.cache[this.files.MUSIC1].volume = .8, this.cache[this.files.MUSIC2].volume = .7, this.cache[this.files.WOOSH].v = 1, this.archAtk = new soundevent(this.cache[this.files.ARROWCAST2], 550, this.cache[this.files.ARROWIMPACT], 1500), this.knightAtk = new soundevent(this.cache[this.files.WOOSH], 300, this.cache[this.files.SLAM], 1350), this.robotAtk = new soundevent(this.cache[this.files.ROBOT], 100, this.cache[this.files.SLAM1], 1100), this.mageAtk = new soundevent(this.cache[this.files.SPELLCHARGE1], 75, this.cache[this.files.SPELL1], 1100), this.playerAtk = new soundevent(this.cache[this.files.SLASH1], 250, null, 0), this.chiefAtk = new soundevent(this.cache[this.files.SPELL], 50, null, 0)
};