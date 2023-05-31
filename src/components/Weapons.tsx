import React from 'react';
import { getMod, getSigned } from '../utils/dnd';
import { Abilities, Attributes, Item } from '../utils/5etypes';



function getWeaponDamageBonus(item: Item, abilities: Abilities, attributes: Attributes) {
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
      bonus += item.system.attackBonus;
    }
  } else {
    bonus += item.system.attackBonus;
  }

  return bonus;
}

/**
 * Gets weapon's attack bonus.
 * @param item
 * @param abilities
 * @param attributes
 */
function getWeaponAttackBonus(item: Item, abilities: Abilities, attributes: Attributes) {
  let bonus = getWeaponDamageBonus(item, abilities, attributes)

  if (item.system.proficient) {
    bonus += attributes.prof;
  }

  return bonus;
}

/**
 * Gets the damage dice for a given weapon. Does NOT handle versatile!
 * @param item
 * @param abilities
 * @param attributes
 */
function getWeaponDamage(item: Item) {
  const damages = item.system.damage.parts.map((x: any[]) => ({d: x[0].split('+')[0].trim(), type: x[1]}));
  return damages;
}


function getWeaponProperties(item: Item) {
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

function getRange(item: Item) {
  if (item.system.range.value > 5) {
    if (item.system.range.long) {
      return <div>
        Range: <span className="text-grey">{item.system.range.value}</span><span className="text-grey-light"> / {item.system.range.long}</span> <span>{item.system.range.units}</span>
      </div>
    } else {
      return <div>Reach: <span className="text-grey">{item.system.range.value}</span> {item.system.range.value}</div>
    }
  }
  return <></>;
}

type Props = {
  items: Item[];
  abilities: Abilities;
  attributes: Attributes;
}

export default function Weapons({items, abilities, attributes}: Props) {

  const weaponsAvailable = items.filter((x: any) => x.type === 'weapon');


  return <>

    <div className="mt-8 mb-4 font-serif font-bold text-primary uppercase text-center">
      Attacks
    </div>

    <table className="mx-4">
      <thead>
        <tr className="border-b border-b-grey-light mb-2">
          <th>Name</th>
          <th>+ATK</th>
          <th>+DMG</th>
          <th>DMG type</th>

        </tr>
      </thead>
      <tbody>
      {
        weaponsAvailable.map( (x: Item) =>
          <>
            {/* main row */}
            <tr className="text-center">
              <td className="text-left pt-2">{x.name}</td>
              <td className="pt-2">{getSigned(getWeaponAttackBonus(x, abilities, attributes))}</td>
              <td className="pt-2">{getSigned(getWeaponDamageBonus(x, abilities, attributes))}</td>
              <td rowSpan={2} className="flex flex-col pt-2">{
                getWeaponDamage(x).map((x: any) => <>
                  <div className="leading-none flex flex-row items-center">
                    {x.d} <span className="ml-2 text-grey-light uppercase text-[0.6em]">{x.type}</span>
                  </div>
                </>)
              }</td>
            </tr>
            <tr>
              <td colSpan={3} className="text-[0.6rem] relative h-[0.6rem]">
                <div className="absolute -top-[0.125rem] left-0 pl-[0.125rem] text-grey-light uppercase leading-none flex flex-row gap-1 italic comma-separated">
                  <>{getRange(x)}</>
                  <>{getWeaponProperties(x)}</>
                </div>
              </td>
            </tr>
          </>
        )
      }
      </tbody>
    </table>

  </>
}
