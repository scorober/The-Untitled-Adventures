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
export const ASSET_PATHS = {
    MikesChar: './assets/img/mikeschar.png',
    TitleBG: './assets/img/animated_title_bg.png',
}

export const STATES = {
    Moving: Symbol('Moving'),
    Following: Symbol('Following'),
    Collidable: Symbol('Collidable'),
    HasTarget: Symbol('HasTarget'),
    Frozen: Symbol('Frozen'),
    RemoveFromWorld: Symbol('RemoveFromWorld'),
    Aggressive: Symbol('Aggresive')
}

export const ANIMATIONS = {
    SpellcastNorth: Symbol('spellcastNorth'),
    SpellcastWest: Symbol('spellcastWest'),
    SpellcastSouth: Symbol('spellcastSouth'),
    SpellcastEast: Symbol('spellcastEast'),
    ThrustNorth: Symbol('thrustNorth'),
    ThrustWest: Symbol('thrustWest'),
    ThrustSouth: Symbol('thrustSouth'),
    ThrustEast: Symbol('thrustEast'),
    WalkNorth: Symbol('walkNorth'),
    WalkWest: Symbol('walkWest'),
    WalkSouth: Symbol('walkSouth'),
    WalkEast: Symbol('walkEast'),
    SlashNorth: Symbol('slashNorth'),
    SlashWest: Symbol('slashWest'),
    SlashSouth: Symbol('slashSouth'),
    SlashEast: Symbol('slashEast'),
    StandNorth: Symbol('standNorth'),
    StandWest: Symbol('standWest'),
    StandSouth: Symbol('standSouth'),
    StandEast: Symbol('standEast'),
    ShootNorth: Symbol('shootNorth'),
    ShootWest: Symbol('shootWest'),
    ShootSouth: Symbol('shootSouth'),
    ShootEast: Symbol('shootEast'),
    DeathSouth: Symbol('deathSouth')
}

export const DIRECTIONS = {
    North: Symbol('North'),
    West: Symbol('West'),
    South: Symbol('South'),
    East: Symbol('East'),
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
