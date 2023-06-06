import { Item } from '../../utils/5etypes';

const ShortFeats: any = {
  'Metallic Breath Weapon': {
    effects: {
      type: 'or',
      options: ['20ft knockback + knocked prone', 'incapacitated until my next turn']
    },
    target: {
      value: 15,
      units: 'ft',
      type: 'cone'
    }
  },
  'Sneak Attack': {
    tpsExtras: {
      when: 'adv. || ally within 5ft',
      uses: '1 / attack',
      d: 'd6',
      classIdentifier: 'rogue',
      diceFormula: ((classLevels: number) => Math.floor(classLevels / 2))
    }
  },
  'Historical Knowledge': {
    tpsShort: {
      desc: 'When entering a ruin or dungeon, you can correctly ascertain which known race built it. You can determine value of art/objects older than a century.'
    }
  },
  'Thieves\' Cant': {
    tpsShort: {
      desc: 'Adds encryption to a real language, takes 4x as long to communicate compared to plaintext. Know secret signs and symbols that communicate short, simple messages (if it tweets, it fits).'
    }
  },
  'Uncanny Dodge': {
    tpsShort: {
      desc: '<b>Reaction.</b> Halve damage from an attack. <i>Must see attacker.</i>'
    }
  },
  'Steady Aim': {
    tpsShort: {
      desc: '<b>Bonus action.</b> Trade all your movement for advantage on next attack roll.'
    }
  },
  'Second-Story Work': {
    tpsShort: {
      desc: 'Climbing doesn\'t cost extra movement.<br/>Running jump distance increases for +dex mod.'
    }
  }
};

const BonusActionGrants: any = {
  'Cunning Action': [
    'Dash', 'Disengage', 'Hide'
  ],
  'Fast Hands': [
    'Sleight of Hand', 'Use Thieves\' tools', 'Use an Object'
  ]
}

export default ShortFeats;

export function addShortFeats(feats: Item[]) {
  for (const f in feats) {
    if (ShortFeats[feats[f].name]) {
      feats[f] = {...feats[f], ...ShortFeats[feats[f].name]}
    }
  }
}

export function getBonusActions(feats: Item[]) {
  const bonusActions = [];

  for (const f in feats) {
    const bag = BonusActionGrants[feats[f].name]
    if (bag) {
      bonusActions.push(...bag);
    }
  }

  return bonusActions;
}
