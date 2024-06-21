import React from 'react';
import { Abilities, Attributes, Item } from './5etypes';
import { getMod } from './dnd';

export type WeaponProps = {
  item: Item;
  abilities: Abilities;
  attributes: Attributes;
}

export function getWeaponDamageBonus(item: Item, abilities: Abilities, attributes: Attributes) {
  let bonus = 0;

  let abilityMod;
  // ranged weapons
  if (item.system.weaponType.endsWith('R')) {
    abilityMod = 'dex';
  } else {
    abilityMod = 'str';
  }

  // finesse weapons can use either str or dex, we use bigger automatically
  if (item.system.properties.fin) {
    bonus += Math.max(getMod(abilities, 'str'), getMod(abilities, 'dex'));
  } else {
    bonus += getMod(abilities, abilityMod);
  }

  if (item.system.attunement) {
    if (item.system.attuned) {
      bonus += +item.system.attackBonus;
    }
  } else {
    bonus += +item.system.attackBonus;
  }

  return bonus;
}

/**
 * Gets weapon's attack bonus.
 * @param item
 * @param abilities
 * @param attributes
 */
export function getWeaponAttackBonus(item: Item, abilities: Abilities, attributes: Attributes) {
  let bonus = getWeaponDamageBonus(item, abilities, attributes)

  if (item.system.proficient) {
    bonus += +attributes.prof;
  }

  return bonus;
}

/**
 * Gets the damage dice for a given weapon. Does NOT handle versatile!
 * @param item
 * @param abilities
 * @param attributes
 */
export function getWeaponDamage(item: Item) {
  const damages = item.system.damage.parts.map((x: any[]) => ({d: x[0].split('+')[0].trim(), type: x[1]}));
  return damages;
}

/**
 * Whether weapon has range, reach, or any other special properties
 * @param item
 * @returns
 */
export function hasRangeOrProperties(item: Item) {
  if (item.system.range.value > 5) {
    return true;
  }
  for (const key in item.system.properties) {
    if ((item.system.properties as any)[key]) {
      return true;
    }
  }
  return false;
}

export function getWeaponProperties(item: Item) {
  const properties = [];

  if (item.system.properties.amm) {
    properties.push('ammunition');
  }
  if (item.system.properties.lgt) {
    properties.push('light');
  }
  if (item.system.properties.hwy) {
    properties.push('heavy');
  }
  if (item.system.properties.fin) {
    properties.push('finesse');
  }
  if (item.system.properties.fir) {
    properties.push('fir?');
  }
  if (item.system.properties.foc) {
    properties.push('foc?');
  }
  if (item.system.properties.rch) {
    properties.push('reach');
  }
  if (item.system.properties.rel) {
    properties.push('rel?');
  }
  if (item.system.properties.ret) {
    properties.push('ret?');
  }
  if (item.system.properties.spc) {
    properties.push('special');
  }
  if (item.system.properties.thr) {
    properties.push('thrown');
  }
  if (item.system.properties.two) {
    properties.push('two-handed');
  }
  if (item.system.properties.ver) {
    properties.push('versatile');
  }
  if (item.system.properties.lod) {
    properties.push('loading');
  }

  return properties.map((x: any) => <div>{x}</div>)
}

export function getRange(item: Item) {
  if (item.system.range.value > 5) {
    if (item.system.range.long) {
      return <div>
        Range: <span className="text-black">{item.system.range.value}</span><span className="text-black/50"> / {item.system.range.long}</span> <span>{item.system.range.units}</span>
      </div>
    } else {
      return <div>Reach: <span className="text-black">{item.system.range.value}</span> {item.system.range.value}</div>
    }
  }
  return <></>;
}

export function getDamageColor(type: string, secondary?: boolean) {
  switch (type) {
    case 'fire':
      return secondary ? 'bg-damage-bg-fire-secondary' : 'bg-damage-bg-fire';
    default:
      return 'bg-primary-light'
  }
}
