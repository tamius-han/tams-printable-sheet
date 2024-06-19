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
      diceFormula: ((classLevels: number) => Math.ceil(classLevels / 2))
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
  },
  'Sharpshooter': {
    tpsShort: {
      desc: 'No disadvantage at long range. Ignore half-cover and 3/4-cover. Before making an attack, you can take -5 on attack for +10 on damage roll.'
    }
  },
  'Favored Enemy': {
    tpsShort: {
      desc: 'You have advantage on Survival checks to track selected type of creature, as well as on Intelligence checks to recall information about them.<br/>________________________________'
    }
  },
  'Favored Foe': {
    tpsShort: {
      desc: 'When you hit a creature, you can mark it favourite enemy for 1 minute (or until you lose concentration). Every hit (including first) deals extra damage.<br/>Uses: ___/___ (max: prof)<br/>Extra dmg: 1d4; 1d6 @lv6; 1d8 @lv14',
    }
  },
  'Spellcasting': {
    tpsShort: {
      desc: '<small>(hardcoded for a certain ranger)</small><br/><b>Spell save DC: 12</b><br/><b>Spell attack: +4</b>'
    }
  },
  'Drake Companion': {
    tpsShort: {
      desc: 'As an action, you can magically summon a drake. It takes its turn immediately after you. It can move and use reactions on its own. It can only take <i>Dodge</i> action, unless you take a bonus action to command it to do something else.<br/>If you\'re incapacitated, drake can take any action.<br/>Can be used 1/long rest for free; further summons cost 1 lv1 spell slot.'
    }
  },
  'Primal Awareness': {
    tpsShort: {
      desc: 'Once per long rest, you can cast <i>Speak with Animals</i> for free.'
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
