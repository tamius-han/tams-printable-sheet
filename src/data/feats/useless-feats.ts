// list of feats that only clutter up the character sheet. Feats that result only in languages gained
// or skills increased can be handled by adding languages, resistances, etc. to the language, resistance, etc. list
const uselessFeats: {[characterClass: string]: string[]} = {
  'other': [  // not a class, but ok
    'Draconic Resistance',
    'Languages',
    'Nimble Escape',    // build a 'bonus action' section instead
    'Breath Weapon',    // appears under weapons
  ],
  'rogue': [
    'Cunning Action', // not useless, but we consolidate things that give bonus actions under a single banner
    'Fast Hands',
  ]
}

export default uselessFeats;
