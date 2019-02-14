
export const ASSET_PATHS = {
    MikesChar: './assets/img/scotts-char.png',
    Mage: './assets/img/mage.png',
    Archer: './assets/img/archer.png',
    Robot: './assets/img/robot-full.png',
    Dungeon: './assets/img/dungeonColor3@64x64.png',
    Marriott: './assets/img/marriott.png',
    Teleport: './assets/img/teleport.png',
    Background: './assets/img/background.jpg',
    Effect32: './assets/img/effects_y32.png',
    TitleAnimation: './assets/img/animated_title_bg.png',
    Spawner: './assets/img/vending.png',

    ScottsChar: './assets/img/scotts-char.png',
    Fireball: './assets/img/fireball.png',
    Skeleton: './assets/img/skeleton_base.png',
    MageEffects: './assets/img/mageEffects.png',
    MapEffects: './assets/img/mapEffects.png',
    ArcherEffects: './assets/img/archerEffects.png',
    Lightning: './assets/img/lightning.png',
    Freeze: './assets/img/freeze.png',
}

export const STATES = {
    Moving: Symbol(),
    Pathfinding: Symbol(),
    Following: Symbol(),
    Collidable: Symbol(),
    HasTarget: Symbol(),
    Frozen: Symbol(),
    RemoveFromWorld: Symbol(),
    Aggressive: Symbol(),
    Cooling: Symbol(),
}

export const ANIMATIONS = {
    /** PlayerCharacter animations */
    SpellcastNorth: Symbol(),
    SpellcastWest: Symbol(),
    SpellcastSouth: Symbol(),
    SpellcastEast: Symbol(),
    ThrustNorth: Symbol(),
    ThrustWest: Symbol(),
    ThrustSouth: Symbol(),
    ThrustEast: Symbol(),
    WalkNorth: Symbol(),
    WalkWest: Symbol(),
    WalkSouth: Symbol(),
    WalkEast: Symbol(),
    SlashNorth: Symbol(),
    SlashWest: Symbol(),
    SlashSouth: Symbol(),
    SlashEast: Symbol(),
    StandNorth: Symbol(),
    StandWest: Symbol(),
    StandSouth: Symbol(),
    StandEast: Symbol(),
    ShootNorth: Symbol(),
    ShootWest: Symbol(),
    ShootSouth: Symbol(),
    ShootEast: Symbol(),
    DeathSouth: Symbol(),
    OversizeNorth: Symbol(),
    OversizeWest: Symbol(),
    OversizeSouth: Symbol(),
    OversizeEast: Symbol(),

    /** NPC animations */
    AttackWest: Symbol(),
    AttackEast: Symbol(),
    AttackNorth: Symbol(),
    AttackSouth: Symbol(),

    /** Marriott-specific animations */
    SitDownWest: Symbol(),
    SitDownEast: Symbol(),
    StandUpWest: Symbol(),
    StandUpEast: Symbol(),

    /** Mage-specific animations */
    PowerupWest: Symbol(),
    PowerupEast: Symbol(),

    /** Spawner specific */
    Crashed: Symbol(),
    Static: Symbol(),

    /** Spell/effect specific animations. */
    Fire: Symbol(),
    Projectile: Symbol(),
    Impact: Symbol(),
    Boost: Symbol(),
    Initial: Symbol(),
    Effect0: Symbol(),
    Effect1: Symbol(),
    Effect2: Symbol()
}

export const ANIMATION_RATES = {
    /** PlayerCharacter rates */
    Walk: Symbol(),
    Stand: Symbol(),
    Death: Symbol(),
    Spellcast: Symbol(),
    Thrust: Symbol(),
    Slash: Symbol(),
    Shoot: Symbol(),
    OversizeSlash: Symbol(),
    OversizeThrust: Symbol(),

    /** Marriott-specific rates */
    Sit: Symbol(),

    /** Mage-specific rate */
    Powerup: Symbol(),

    /** Effect specific rates */
    Boost: Symbol(),
    Projectile: Symbol(),
    Impact: Symbol(),

    /** Spawner specific rate */
    Console: Symbol()
}

export const DIRECTIONS = {
    North: Symbol(),
    West: Symbol(),
    South: Symbol(),
    East: Symbol(),

    /** Map specific directions */
    NorthWest: Symbol(),
    NorthEast: Symbol(),
    SouthWest: Symbol(),
    SouthEast: Symbol(),
}

export const EFFECTS = {
    Explosion: Symbol(),
    Fireball: Symbol(),
    Mage: Symbol()
}

export const KEYS = {
    ArrowUp: 'ArrowUp',
    ArrowDown: 'ArrowDown',
    ArrowLeft: 'ArrowLeft',
    ArrowRight: 'ArrowRight',
    Escape: 'Escape',
    Numrow0: 'Digit0',
    Numrow1: 'Digit1',
    Numrow2: 'Digit2',
    Numrow3: 'Digit3',
    Numrow4: 'Digit4',
    Numrow5: 'Digit5',
    Numrow6: 'Digit6',
    Numrow7: 'Digit7',
    Numrow8: 'Digit8',
    Numrow9: 'Digit9',
    Minus: 'Minus',
    Equal: 'Equal',
    Backspace: 'Backspace',
    Tab: 'Tab',
    KeyQ: 'KeyQ',
    KeyW: 'KeyW',
    KeyE: 'KeyE',
    KeyR: 'KeyR',
    KeyT: 'KeyT',
    KeyY: 'KeyY',
    KeyU: 'KeyU',
    KeyI: 'KeyI',
    KeyO: 'KeyO',
    KeyP: 'KeyP',
    BracketLeft: 'BracketLeft',
    BracketRight: 'BracketRight',
    Enter: 'Enter',
    ControlLeft: 'ControlLeft',
    KeyA: 'KeyA',
    KeyS: 'KeyS',
    KeyD: 'KeyD',
    KeyF: 'KeyF',
    KeyG: 'KeyG',
    KeyH: 'KeyH',
    KeyJ: 'KeyJ',
    KeyK: 'KeyK',
    KeyL: 'KeyL',
    Semicolon: 'Semicolon',
    Quote: 'Quote',
    Backquote: 'Backquote',
    ShiftLeft: 'ShiftLeft',
    Backslash: 'Backslash',
    KeyZ: 'KeyZ',
    KeyX: 'KeyX',
    KeyC: 'KeyC',
    KeyV: 'KeyV',
    KeyB: 'KeyB',
    KeyN: 'KeyN',
    KeyM: 'KeyM',
    Comma: 'Comma',
    Period: 'Period',
    Slash: 'Slash',
    ShiftRight: 'ShiftRight',
    NumpadMultiply: 'NumpadMultiply',
    AltLeft: 'AltLeft',
    Space: 'Space',
    CapsLock: 'CapsLock',
    F1: 'F1',
    F2: 'F2',
    F3: 'F3',
    F4: 'F4',
    F5: 'F5',
    F6: 'F6',
    F7: 'F7',
    F8: 'F8',
    F9: 'F9',
    F10: 'F10',
    Pause: 'Pause',
    ScrollLock: 'ScrollLock',
    Numpad7: 'Numpad7',
    Numpad8: 'Numpad8',
    Numpad9: 'Numpad9',
    NumpadSubtract: 'NumpadSubtract',
    Numpad4: 'Numpad4',
    Numpad5: 'Numpad5',
    Numpad6: 'Numpad6',
    NumpadAdd: 'NumpadAdd',
    Numpad1: 'Numpad1',
    Numpad2: 'Numpad2',
    Numpad3: 'Numpad3',
    Numpad0: 'Numpad0',
    NumpadDecimal: 'NumpadDecimal',
}

export const SPAWNERS = {
    Mage: {
        mage: .60,
        archer: .10,
        robot: .30
    },
    Archer: {
        mage: .10,
        archer: .60,
        robot: .30
    },
    Robot: {
        mage: 20,
        archer: 15,
        robot: 65
    }
}

export const MAP_ITEMS = {
    Rug: [[110, 111, 112], [126, 127, 128], [142, 143, 144]],
    StairsN: [[155, 156, 157], [171, 172, 173]],
    ShieldN: [[51]],
    ShieldS: [[67]],
    ShieldW: [[53]],
    ShieldE: [[52]],
    ChestOpen: [[225], [241]],
    ChestClosed: [[247]],
    Door0: [[129, 0, 0, 131], [145, 146, 146, 147]],
    Door0Top:[[0, 130, 130, 0], [0, 0, 0, 0]],
    Door90: [[0, 133], [0, 149], [0, 149], [0, 165]],
    Door90Top: [[132, 0], [148, 0], [148, 0], [164, 0]],
    //Remove shadows from door hangs??
    Door180: [[161, 0, 0, 163], [177, 0, 0, 179]],
    Door180Top:[[0, 0, 0, 0], [0, 178, 178, 0]],
    Door270: [[134, 0], [150, 0], [150, 0], [166, 167]],
    Door270Top: [[0, 135], [0, 151], [0, 151], [0, 0]],
    Door90Lock: [[180], [196], [196], [2]],
    DoorRoofV: [[92], [92], [92], [92]],

    Lock0: [209, 210, 210, 211],
    Lock90: [[180], [196], [196], [212]],
    Lock180: [[193, 194, 194, 195]],
    Lock270: [[181], [196], [196], [213]],
    


    DoorPrintV: [[4, 4], [4, 4], [4, 4], [4,4]],
    DoorPrintH: [[4, 4, 4, 4], [4, 4, 4, 4]],
    DoorPathH: [[4, 4, 4, 4, 4], [4, 4, 4, 4, 4]],
    DoorPathV: [[4,4],[4,4],[4,4],[4,4],[4,4]],
    WallWest: [49, 50],
    WallEast: [54, 55],
    WallNorth: [[19], [35]],
    WallSouth: [[99], [115]],
    Pit: [[158, 159, 160], [174, 175, 176], [206, 207, 208]],
    ICornerNW: [[17, 18], [33, 34]],
    ICornerNE: [[22, 23], [38, 39]],
    ICornerSW: [[97, 98], [113, 114]],
    ICornerSE: [[102, 103], [118, 119]]
}


export const ROOMS ={
    Exit: 'exit',
    Treasure: 'treasure',
    Spawn: 'spawn',
    Boss: 'boss',
    Initial: 'initial',
    Any: 'any'

}


export const CTX_EVENTS = {
    LeftClick: 'click',
    RightClick: 'contextmenu',
    MouseMove: 'mousemove',
    MouseWheel: 'mousewheel',
    KeyDown: 'keydown',
    KeyUp: 'keyup',
    Load: 'load',
    Error: 'error'
}

export const TOP = 0
export const RIGHT = 90
export const BOTTOM = 180
export const LEFT = 270

export const FACING = [TOP, RIGHT, BOTTOM, LEFT]

export const FACING_TO_STRING = {
    [TOP]: 'top',
    [RIGHT]: 'right',
    [BOTTOM]: 'bottom',
    [LEFT]: 'left'
}

export const FACING_TO_MOD = {
    [TOP]: [0, -1],
    [RIGHT]: [1, 0],
    [BOTTOM]: [0, 1],
    [LEFT]: [-1, 0]
}

export const FACING_INVERSE = {
    [TOP]: BOTTOM,
    [RIGHT]: LEFT,
    [BOTTOM]: TOP,
    [LEFT]: RIGHT
}

export const FACING_MOD_RIGHT = {
    [TOP]: RIGHT,
    [RIGHT]: BOTTOM,
    [BOTTOM]: LEFT,
    [LEFT]: TOP
}

export const FACING_MOD_LEFT = {
    [TOP]: LEFT,
    [RIGHT]: TOP,
    [BOTTOM]: RIGHT,
    [LEFT]: BOTTOM
}