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
    IsHovered: Symbol(),
    IsCombat: Symbol(),
    IsAttacking: Symbol(),
    Opened: Symbol(),
    Upgraded: Symbol(),
    Cleared: Symbol(),
    Pacified: Symbol(),
    Swarm: Symbol()
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
    AttackWest: Symbol('AttackWest'),
    AttackEast: Symbol('AttackEast'),
    AttackNorth: Symbol('AttackNorth'),
    AttackSouth: Symbol('AttackSouth'),

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
    North: Symbol('north'),
    West: Symbol('west'),
    South: Symbol('south'),
    East: Symbol('east'),

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
    Rug: [
        [110, 111, 112],
        [126, 127, 128],
        [142, 143, 144]
    ],
    StairsN: [
        [155, 156, 157],
        [171, 172, 173]
    ],
    ShieldN: [
        [51]
    ],
    ShieldS: [
        [67]
    ],
    ShieldW: [
        [53]
    ],
    ShieldE: [
        [52]
    ],
    ChestOpen: [
        [225],
        [241]
    ],
    ChestClosed: [
        [247]
    ],

    //TOP
    Door0: [
        [1, 1, 1, 1],
        [145, 1, 1, 147]
    ],
    Door0Top: [
        [129, 130, 130, 131]
    ],
    Lock0: [
        [193, 194, 194, 195]
    ],
    //LEFT exit to room on the right
    Door90: [
        [0, 133],
        [1, 1],
        [1, 1],
        [0, 165]
    ],
    Door90Top: [
        [132, 0],
        [148, 0],
        [148, 0],
        [164, 0]
    ],
    Lock90: [
        [180],
        [196],
        [196],
        [212]
    ],
    //BOTTOM
    Door180: [
        [161, 0, 0, 163],
        [177, 0, 0, 179]
    ],
    Door180Top: [
        [0, 0, 0, 0],
        [0, 178, 178, 0]
    ],
    Lock180: [
        [209, 210, 210, 211]
    ],
    //RIGHT exit to room on the left
    Door270: [
        [134, 0],
        [1, 1],
        [1, 1],
        [166, 167]
    ],
    Door270Top: [
        [0, 135],
        [0, 151],
        [0, 151],
        [0, 0]
    ],
    Lock270: [
        [181],
        [197],
        [197],
        [213]
    ],

    DoorPathH: [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]
    ],
    DoorPathV: [
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1]
    ],



    WallWest: [49, 50],
    WallEast: [54, 55],
    WallNorth: [
        [19],
        [35]
    ],
    WallSouth: [
        [99],
        [115]
    ],
    Pit: [
        [158, 159, 160],
        [174, 175, 176],
        [206, 207, 208]
    ],
    ICornerNW: [
        [17, 18],
        [33, 34]
    ],
    ICornerNE: [
        [22, 23],
        [38, 39]
    ],
    ICornerSW: [
        [97, 98],
        [113, 114]
    ],
    ICornerSE: [
        [102, 103],
        [118, 119]
    ]
}


export const ROOMS = {
    Exit: 'exit',
    Treasure: 'treasure',
    Spawn: 'spawn',
    Boss: 'boss',
    Initial: 'initial',
    Any: 'any',
    Maze: 'maze',
    Corridor: 'corridor'

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

export const VERTICAL = Symbol()
export const HORIZONTAL = Symbol()

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


export const TILE_COLLISION = {
    0: 100,
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
    7: 10,
    8: 10,
    9: 10,
    10: 10,
    11: 10,
    12: 10,
    13: 1,
    14: 1,
    15: 1,
    16: 1,
    17: 100,
    18: 100,
    19: 100,
    20: 100,
    21: 100,
    22: 100,
    23: 100,
    24: 100,
    25: 10,
    26: 100,
    27: 100,
    28: 1,
    29: 1,
    30: 1,
    31: 100,
    32: 1,
    33: 100,
    34: 100,
    35: 100,
    36: 100,
    37: 100,
    38: 100,
    39: 100,
    40: 100,
    41: 100,
    42: 100,
    43: 100,
    44: 1,
    45: 1,
    46: 1,
    47: 1,
    48: 1,
    49: 100,
    50: 100,
    51: 10,
    52: 10,
    53: 10,
    54: 100,
    55: 100,
    56: 100,
    57: 100,
    58: 100,
    59: 100,
    60: 1,
    61: 1,
    62: 1,
    63: 1,
    64: 1,
    65: 100,
    66: 100,
    67: 10,
    68: 10,
    69: 10,
    70: 100,
    71: 100,
    72: 100,
    73: 100,
    74: 100,
    75: 100,
    76: 1,
    77: 1,
    78: 1,
    79: 100,
    80: 1,
    81: 100,
    82: 100,
    83: 50,
    84: 10,
    85: 10,
    86: 100,
    87: 100,
    88: 100,
    89: 100,
    90: 100,
    91: 100,
    92: 100,
    93: 1,
    94: 1,
    95: 1,
    96: 1,
    97: 100,
    98: 100,
    99: 100,
    100: 100,
    101: 100,
    102: 100,
    103: 100,
    104: 100,
    105: 100,
    106: 100,
    107: 100,
    108: 100,
    109: 1,
    110: 1,
    111: 1,
    112: 1,
    113: 100,
    114: 100,
    115: 100,
    116: 100,
    117: 100,
    118: 100,
    119: 100,
    120: 100,
    121: 100,
    122: 100,
    123: 100,
    124: 100,
    125: 100,
    126: 1,
    127: 1,
    128: 1,
    129: 100,
    130: 100,
    131: 100,
    132: 100,
    133: 100,
    134: 100,
    135: 100,
    136: 100,
    137: 100,
    138: 100,
    139: 100,
    140: 100,
    141: 100,
    142: 1,
    143: 1,
    144: 1,
    145: 100,
    146: 1,
    147: 100,
    148: 100,
    149: 1,
    150: 1,
    151: 100,
    152: 100,
    153: 100,
    154: 100,
    155: 1,
    156: 1,
    157: 1,
    158: 100,
    159: 100,
    160: 100,
    161: 100,
    162: 1,
    163: 100,
    164: 100,
    165: 100,
    166: 100,
    167: 100,
    168: 100,
    169: 1,
    170: 100,
    171: 1,
    172: 1,
    173: 1,
    174: 100,
    175: 100,
    176: 100,
    177: 100,
    178: 100,
    179: 100,
    180: 0,
    181: 0,
    182: 100,
    183: 0,
    184: 0,
    185: 0,
    186: 0,
    187: 1,
    188: 1,
    189: 1,
    190: 100,
    191: 100,
    192: 100,
    193: 0,
    194: 100,
    195: 0,
    196: 100,
    197: 100,
    198: 100,
    199: 100,
    200: 0,
    201: 0,
    202: 0,
    203: 1,
    204: 1,
    205: 1,
    206: 0,
    207: 0,
    208: 0,
    209: 0,
    210: 100,
    211: 0,
    212: 0,
    213: 0,
    214: 0,
    215: 100,
    216: 100,
    217: 0,
    218: 100,
    219: 1,
    220: 1,
    221: 1,
    222: 1,
    223: 0,
    224: 0,
    225: 1, //Make sure this is drawn in top layer!!
    226: 1, //Make sure this is drawn in top layer!!
    227: 1, //Make sure this is drawn in top layer!!
    228: 1,
    229: 100,
    230: 100,
    231: 0,
    232: 100,
    233: 100,
    234: 100,
    235: 1,
    236: 1,
    237: 1,
    238: 1,
    239: 0,
    240: 0,
    241: 100,
    242: 100,
    243: 100,
    244: 0,
    245: 100,
    246: 100,
    247: 100,
    248: 1,
    249: 1,
    250: 0,
    251: 1,
    252: 1,
    253: 1,
    254: 1,
    255: 0,
    256: 0
}

export const ROOM_TILES = {
    Treasure: {
        floor: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [2, 2, 1, 1, 1, 2, 1, 2, 2, 1, 1, 1, 1, 2, 1, 1],
            [1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2],
            [1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1],
            [1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2],
            [1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 1],
            [1, 1, 2, 2, 2, 2, 1, 1, 2, 1, 2, 2, 1, 1, 2, 2],
            [1, 2, 2, 2, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1],
            [1, 1, 2, 2, 2, 2, 2, 1, 1, 2, 1, 2, 1, 2, 2, 1],
            [1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 1]
        ],

        object0: [
            [83, 83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 83],
            [83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 31, 108, 0, 0, 108, 31, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 31, 110, 111, 111, 111, 111, 112, 31, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 126, 109, 127, 127, 127, 128, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 126, 127, 127, 109, 127, 128, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 31, 142, 143, 143, 143, 143, 144, 31, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 31, 0, 0, 0, 0, 31, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83]
        ],
        object1: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 247, 247, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        top: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 92, 0, 0, 92, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
    },
    Maze: { //14 x 14
        floor: [
            [1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [2, 2, 2, 1, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1],
            [1, 1, 158, 159, 159, 159, 159, 159, 159, 159, 159, 160, 1, 1],
            [2, 1, 190, 191, 191, 125, 124, 191, 191, 191, 191, 192, 2, 2],
            [2, 1, 1, 1, 2, 174, 176, 2, 2, 1, 1, 1, 2, 2],
            [1, 1, 1, 1, 1, 174, 176, 1, 2, 2, 1, 1, 2, 2],
            [1, 1, 1, 1, 1, 174, 176, 1, 2, 158, 160, 2, 1, 1],
            [1, 1, 1, 2, 2, 174, 176, 1, 2, 174, 176, 2, 2, 1],
            [1, 158, 159, 159, 159, 141, 176, 2, 1, 174, 176, 2, 1, 1],
            [1, 174, 124, 191, 191, 191, 192, 2, 1, 174, 176, 2, 1, 1],
            [1, 174, 176, 1, 2, 1, 1, 1, 2, 174, 176, 2, 1, 2],
            [1, 174, 176, 1, 2, 2, 1, 1, 1, 190, 192, 1, 1, 2],
            [1, 174, 176, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1],
            [1, 190, 192, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1]
        ],
        object0: [
            [79, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 79],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 79, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 79, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 79, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [79, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 79]
        ],
        object1: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 108, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 108, 0, 0],
            [0, 0, 0, 0, 108, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 108, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        top: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 92, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 92, 0, 0],
            [0, 0, 0, 0, 92, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 92, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    Corridor: {
        floor: [
            [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 158, 159, 159, 159, 159, 159, 159, 159, 160, 1, 2, 1, 158, 159, 159, 159, 159, 159, 159, 160, 2],
            [1, 190, 191, 191, 191, 191, 191, 191, 191, 192, 1, 2, 1, 190, 191, 191, 191, 191, 191, 191, 192, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2],
            [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 158, 159, 159, 159, 159, 159, 159, 159, 160, 1, 1, 1, 158, 159, 159, 159, 159, 159, 159, 160, 1],
            [1, 190, 191, 191, 191, 191, 191, 191, 191, 192, 1, 1, 1, 190, 191, 191, 191, 191, 191, 191, 192, 2],
            [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1, 1]
        ],
        object0: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 110, 111, 112, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 142, 143, 144, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 243, 1, 0, 83, 83, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 83, 0, 0, 83, 0, 0, 1, 243, 2, 0, 0, 0, 0, 0, 0, 0, 83, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 110, 111, 112, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 142, 143, 144, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        object1: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        top: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 227, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 227, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    },
    Initial: {
        floor: [
            [1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 1, 2, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
            [1, 2, 1, 2, 2, 2, 2, 1, 2, 2],
            [1, 2, 2, 1, 1, 1, 1, 2, 2, 1],
            [1, 2, 2, 1, 1, 1, 1, 2, 1, 1],
            [1, 2, 1, 1, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 1, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 2, 2, 2, 1, 2, 1, 2, 1],
            [1, 2, 2, 2, 2, 2, 1, 2, 1, 1],
            [1, 1, 2, 2, 1, 2, 2, 2, 2, 1],
            [1, 1, 2, 2, 1, 1, 2, 1, 2, 1],
            [1, 2, 2, 2, 2, 1, 2, 2, 2, 1]
        ],
        object0: [
            [62, 63, 63, 63, 63, 63, 63, 63, 63, 64],
            [78, 0, 0, 0, 0, 0, 0, 0, 0, 80],
            [78, 0, 0, 0, 0, 0, 0, 0, 0, 80],
            [78, 0, 0, 0, 0, 0, 0, 0, 0, 80],
            [78, 0, 0, 62, 63, 63, 64, 0, 0, 80],
            [78, 0, 0, 78, 79, 79, 80, 0, 0, 80],
            [78, 0, 0, 94, 95, 95, 96, 0, 0, 80],
            [78, 0, 0, 0, 0, 0, 0, 0, 0, 80],
            [78, 0, 0, 0, 0, 0, 0, 0, 0, 80],
            [78, 0, 0, 62, 63, 63, 64, 0, 0, 80],
            [78, 0, 0, 78, 31, 31, 80, 0, 0, 80],
            [78, 0, 0, 94, 95, 95, 96, 0, 0, 80],
            [78, 0, 0, 0, 0, 0, 0, 0, 0, 80],
            [94, 95, 95, 95, 95, 95, 95, 95, 95, 96]
        ],

        object1: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 108, 0, 0, 0, 0, 0, 0, 108, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 60, 95, 95, 61, 0, 0, 0],
            [0, 0, 0, 80, 0, 0, 78, 0, 0, 0],
            [0, 0, 0, 76, 63, 63, 77, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 60, 95, 95, 61, 0, 0, 0],
            [0, 0, 0, 80, 0, 0, 78, 0, 0, 0],
            [0, 0, 0, 76, 63, 63, 77, 0, 0, 0],
            [0, 108, 0, 0, 0, 0, 0, 0, 108, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        top: [
            [0, 92, 0, 0, 0, 0, 0, 0, 92, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 92, 0, 0, 0, 0, 0, 0, 92, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    }
}