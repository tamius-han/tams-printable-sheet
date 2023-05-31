export type Item5e = {
  type: 'weapon' | 'class' | 'subclass' | 'feat',
  attunement: number,
  attuned: boolean,
  equipped: boolean,
  proficient: boolean,
  ability?: ability,  // but is not always present!
  weaponType: 'simpleR' | 'martialR' | 'simpleM' | 'martialM' | string,
  attackBonus: number,
  damage: {
    parts: string[][],
    versatile?: string,
  },
  range: {
    value: number,
    long?: number,
    units?: string
  }
  properties: {
    amm?: boolean, // ammunition
    lgt?: boolean, // light — something to do with 2 weapon fighting
    hwy?: boolean, // heavy
    fin?: boolean, // finesse — use dex or str for attack and damage rolls
    fir?: boolean, //
    foc?: boolean, //
    rch?: boolean, // reach
    rel?: boolean, //
    ret?: boolean, //
    spc?: boolean, // special
    thr?: boolean, // thrown
    two?: boolean, // two-handed
    ver?: boolean, // versatile
    lod?: boolean, // loading - attacks once per turn
  }


  [x: string]: any, // catch-all
};

export type Item = {
  system: Item5e;

  [x: string]: any, // catch-all
}

export type Ability = {
  value: number,      // score
  proficient: number, // save proficiency
  bonuses: {
    check?: number | string,
    save?: number | string
  }
}

export type ability = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
export type Abilities = {
  str: Ability,
  dex: Ability,
  con: Ability,
  wis: Ability,
  int: Ability,
  cha: Ability
}

export type Attributes = {
  // NOTE:
  // ac, init are present in character.system.attributes, but they are NOT populated
  // meaning they need to be calculated manually at runtime

  hp: {value: number, min: number, max: number, temp?: number, tempmax?: number},
  movement: {
    burrow: number,
    climb: number,
    fly: number,
    swim: number,
    walk: number,
    units: string,
    hover: boolean
  },
  attunement: { max: number }
  spellcasting: ability,
  senses: {
    darkvision: number,
    blindsight: number,
    truesight: number,
    tremorsense: number,
    units: string,
    special: string
  },
  death: { success: number, failure: number }, // death saves
  exhaustion: number,
  inspiration: boolean,
  prof: number,

  [x: string]: any // catch-all
}
