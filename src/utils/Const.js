
export const ASSET_PATHS = {
    MikesChar: './assets/img/mikeschar.png',
    Mage: './assets/img/mage.png',
    Archer: './assets/img/archer.png',
    Robot: './assets/img/robot-full.png',
    Dungeon: './assets/img/dungeonColor3@64x64.png',
    Marriott: './assets/img/marriott.png',
    Teleport: './assets/img/teleport.png',
    Background: './assets/img/background.jpg',
    Effect32: './assets/img/effects_y32.png',
    TitleAnimation: './assets/img/animated_title_bg.png'
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
    Cooling: Symbol
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

    /** Marriott-specific animations */
    SitDownWest: Symbol(),
    SitDownEast: Symbol(),
    StandUpWest: Symbol(),
    StandUpEast: Symbol(),

    /** Mage-specific animations */
    Impact: Symbol(),
    PowerupWest: Symbol(),
    PowerupEast: Symbol(),
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

    /** Marriott-specific rates */
    Sit: Symbol(),

    /** Mob-specific rates */
    Impact: Symbol(),
    Powerup: Symbol()
}

export const DIRECTIONS = {
    North: Symbol(),
    West: Symbol(),
    South: Symbol(),
    East: Symbol(),
}

export const SPELLS = {
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
