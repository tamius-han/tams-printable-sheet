import React from 'react';
import { getMod, getSigned, getProfMod, getValue } from '../utils/dnd';
import { Abilities, Attributes, Item } from '../utils/5etypes';
import { classNames } from '../utils/helpers';



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

/**
 * Whether weapon has range, reach, or any other special properties
 * @param item
 * @returns
 */
function hasRangeOrProperties(item: Item) {
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
        Range: <span className="text-black">{item.system.range.value}</span><span className="text-black/50"> / {item.system.range.long}</span> <span>{item.system.range.units}</span>
      </div>
    } else {
      return <div>Reach: <span className="text-black">{item.system.range.value}</span> {item.system.range.value}</div>
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

  const racialWeapons = items.filter((x: Item) => {
    if (x.type === 'feat') {
      // add things that show up under racial weapons here
      return ['Breath Weapon'].includes(x.name);
    }
    return false;
  })


  return <>

    {/* Normal attacks (weapons) */}
    <div className="mt-8 mb-4 font-serif font-bold text-primary uppercase text-center">
      Attacks
    </div>

    <table border={0} cellPadding={0} cellSpacing={0}  className="mx-4 text-[0.85rem]">
      <thead>
        <tr className="mb-[0.125em] uppercase text-[0.75em]">
          <th>Name</th>
          <th>+ATK</th>
          <th>+DMG</th>
          <th>DMG type</th>

        </tr>
      </thead>
      {
        weaponsAvailable.map( (x: Item) =>
          <>
            {/* main row */}
            <tr className="text-center tracking-none leading-none">
              <td className="text-left">
                <div className="pl-[0.5em] pt-[0.365em] pb-[0.125em] row-decoration-diamond start border border-x-0 border-black bg-primary-light row-decoration-diamond-transition-r">{x.name}</div>
              </td>
              <td className="">
                <div className=" pt-[0.365em] pb-[0.125em] row-decoration-diamond mid border border-x-0 border-black row-decoration-diamond-transition-l">{getSigned(getWeaponAttackBonus(x, abilities, attributes))}</div>
              </td>
              <td className="">
                <div className=" pt-[0.365em] pb-[0.125em] row-decoration-diamond mid border border-x-0 border-black bg-white">{getSigned(getWeaponDamageBonus(x, abilities, attributes))}</div>
              </td>
              <td rowSpan={2} className="relative">
                <div className=" pt-[0.365em] pb-[0.125em] flex flex-col opacity-0">
                  {
                    getWeaponDamage(x).map((x: any) => <>
                        <div className="leading-none flex flex-row items-center">
                          {x.d} <span className="ml-2 text-grey-light uppercase text-[0.6em]">{x.type}</span>
                        </div>
                    </>)
                  }
                </div>
                <div className="absolute top-0 left-0 w-full">
                  <div className="pt-[0.365em] pb-[0.125em] relative row-decoration-diamond end border border-x-0 border-black bg-white">&nbsp;</div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="text-[0.6rem] relative h-[0.6rem]">
                <div className={classNames([
                  "absolute -top-[0.25rem] left-0 pl-[0.125em]",
                  hasRangeOrProperties(x) ? '' : 'opacity-0'
                ])}>
                  <div className="relative w-full z-10 px-4">
                    <div className={classNames([
                      'text-black/75 uppercase leading-none flex flex-row gap-1 italic comma-separated',
                      'px-[0.5em] pt-[0.25em]',
                      'row-decoration-shard border border-x-0 border-black bg-grey-faint'
                    ])}>
                      <>{getRange(x)}</>
                      <>{getWeaponProperties(x)}</>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr><td><div className="h-[0.5em]"></div></td></tr>
          </>
        )
      }
    </table>

    {/* Racial */}
    {
      racialWeapons.map((x: Item) => <>
        {
          x.name !== 'Breath Weapon' ? '' : <>
            {/* Container */}
            <div className="w-full">

              {/* Main content */}
              <div className={classNames([
                "flex flex-row w-full mx-4 gap-8",
                'row-decoration-diamond',
                'bg-primary',
                'border border-x-0 border-black'
              ])}>
                <div className={classNames([
                  'flex-col flex-grow-1',
                  'relative'
                ])}>
                  {x.name} - {x.system.damage.parts[0][1]}
                  <div className={classNames([
                    'absolute -bottom-[1rem] left-0'
                  ])}>
                    {x.system.target.value} {x.system.target.units} {x.system.target.type}
                  </div>
                </div>
                <div>
                  💾 {x.system.save.ability} {8 + getProfMod(abilities, x.system.save.scaling, attributes)}
                </div>
                <div>
                  {x.system.damage.parts[0][0]}
                </div>
                <div className="flex flex-row flex-grow-1 gap-2">
                  <div className="">Uses:</div>
                  <div className="w-[2rem] show-print"></div>
                  <div className="hide-print" contentEditable>{x.system.uses.value}</div>
                  <div>/ {getValue(x.system.uses.max, abilities, attributes)}</div>
                </div>

              </div>
            </div>
          </>
        }
      </>)
    }
  </>
}
