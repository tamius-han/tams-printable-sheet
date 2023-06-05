import React from 'react';
import { getSigned } from '../utils/dnd';
import { Abilities, Attributes, Item } from '../utils/5etypes';
import { classNames } from '../utils/helpers';
import { addShortFeats } from '../data/feats/short-desc';
import { getRange, getWeaponAttackBonus, getWeaponDamage, getWeaponDamageBonus, getWeaponProperties, hasRangeOrProperties } from '../utils/weapon-helpers';
import BreathWeaponRow from './WeaponRows/BreathWeapon';
import FizbanBreathWeaponRow from './WeaponRows/FizbanBreathWeaponRow';

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
      return ['Breath Weapon', 'Metallic Breath Weapon'].includes(x.name);
    }
    return false;
  });
  addShortFeats(racialWeapons);


  return <>

    {/* Normal attacks (weapons) */}
    <div className="mt-8 mb-4 font-serif font-bold text-primary uppercase text-center">
      Attacks
    </div>

    <table border={0} cellPadding={0} cellSpacing={0}  className="mx-4 text-[0.85rem]">
      <thead>
        <tr className="mb-[0.125em] uppercase text-[0.75em]">
          <th>Name</th>
          <th>+ATK/SAVE</th>
          <th colSpan={2}>+DMG</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      {/* Racial */}
      {
        racialWeapons.map((x: Item) => <>
          {
            !/Breath Weapon/.test(x.name) ? '' :
              x.name ===  'Breath Weapon' ? <>
                <BreathWeaponRow item={x} abilities={abilities} attributes={attributes} />
              </> : <>
                <FizbanBreathWeaponRow item={x} abilities={abilities} attributes={attributes} />
              </>
          }
        </>)
      }

      {/* NORMAL WEAPONS */}
      {
        weaponsAvailable.map( (x: Item) =>
          <>
            {/* main row */}
            <tr className="text-center tracking-none leading-none">
              <td className="text-left" width="auto">
                <div className="pl-[0.5em] pt-[0.365em] pb-[0.125em] row-decoration-diamond start border border-x-0 border-black bg-primary-light row-decoration-diamond-transition-r">{x.name}</div>
              </td>
              <td className=" min-w-[3em]">
                <div className=" pt-[0.365em] pb-[0.125em] row-decoration-diamond mid border border-x-0 border-black row-decoration-diamond-transition-l">{getSigned(getWeaponAttackBonus(x, abilities, attributes))}</div>
              </td>
              <td className=" min-w-[3em]">
                <div className=" pt-[0.365em] pb-[0.125em] row-decoration-diamond mid border border-x-0 border-black bg-white">{getSigned(getWeaponDamageBonus(x, abilities, attributes))}</div>
              </td>
              <td rowSpan={2} colSpan={2} className="relative min-w-[2em]">
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

            {/* sub row */}
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


  </>
}
