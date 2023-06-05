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
  }
};

export default ShortFeats;

export function addShortFeats(feats: Item[]) {
  for (const f in feats) {
    if (ShortFeats[feats[f].name]) {
      feats[f] = {...feats[f], ...ShortFeats[feats[f].name]}
    }
  }
}
