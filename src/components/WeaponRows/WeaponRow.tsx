import React from 'react';
import { getSigned } from '../../utils/dnd';
import { classNames } from '../../utils/helpers';
import { WeaponProps, getRange, getWeaponAttackBonus, getWeaponDamage, getWeaponDamageBonus, getWeaponProperties, hasRangeOrProperties } from '../../utils/weapon-helpers';
import WeaponDamageItem from './WeaponDamageItem';

function WeaponDamageItems({item, abilities, attributes}: WeaponProps) {
  return <>

    {/* hidden - ensures the height of the row */}
    <div className="pt-[0.365em] pb-[0.125em] flex flex-col opacity-0">
      {
        getWeaponDamage(item).map((x: any) => <>
          <WeaponDamageItem roll={x.d} type={x.type} />
            {/* <div className="leading-none flex flex-row items-center">
              {x.d} <span className="ml-[0.5em] text-grey-light uppercase text-[0.6em]">{x.type}</span>
            </div> */}
        </>)
      }
    </div>

    {/* ensures constant decoration */}
    <div className="absolute top-0 left-0 w-full">
      <div className="pt-[0.365em] pb-[0.125em] relative row-decoration-diamond end border border-x-0 border-black bg-white">&nbsp;</div>
    </div>

    {/* actually displays damage rolls + types */}
    <div className="absolute h-full top-0 left-0 pt-[0.365em] pb-[0.125em] flex flex-col">
      {
        getWeaponDamage(item).map((x: any) => <>
          <WeaponDamageItem roll={x.d} type={x.type} />
            {/* <div className="leading-none flex flex-row items-center">
              <div>

              </div>
              <div className="text-decoration-diamond">{x.d}</div><span className="ml-[0.5em] text-grey uppercase text-[0.6em]">{x.type}</span>
            </div> */}
        </>)
      }
    </div>
  </>
}

export default function WeaponRow({item, abilities, attributes}: WeaponProps) {
  return <>
    {/* main row */}
    <tr className="text-center tracking-none leading-none">
      <td className="text-left" width="auto">
        <div className="pl-[0.5em] pt-[0.365em] pb-[0.125em] row-decoration-diamond start border border-x-0 border-black bg-primary-light row-decoration-diamond-transition-r">{item.name}</div>
      </td>
      <td className="min-w-[3em] pl-[0.125em]">
        <div className=" pt-[0.365em] pb-[0.125em] row-decoration-diamond mid border border-x-0 border-black row-decoration-diamond-transition-l">{getSigned(getWeaponAttackBonus(item, abilities, attributes))}</div>
      </td>
      <td className=" min-w-[3em]">
        <div className=" pt-[0.365em] pb-[0.125em] row-decoration-diamond mid border border-x-0 border-black bg-white">{getSigned(getWeaponDamageBonus(item, abilities, attributes))}</div>
      </td>
      <td rowSpan={2} colSpan={2} className="relative min-w-[2em]">
        <WeaponDamageItems item={item} abilities={abilities} attributes={attributes} />
      </td>
    </tr>

    {/* sub row */}
    <tr>
      <td colSpan={3} className="text-[0.8em] relative h-[0.8em]">
        <div className={classNames([
          "absolute -top-[0.25em] left-0 pl-[0.125em]",
          hasRangeOrProperties(item) ? '' : 'opacity-0'
        ])}>
          <div className="relative w-full z-10 px-[1em]">
            <div className={classNames([
              'text-black/75 uppercase leading-none flex flex-row gap-[0.25em] italic comma-separated',
              'px-[0.5em] pt-[0.25em]',
              'row-decoration-shard border border-x-0 border-black bg-grey-faint'
            ])}>
              <>{getRange(item)}</>
              <>{getWeaponProperties(item)}</>
            </div>
          </div>
        </div>
      </td>
    </tr>
    <tr><td><div className="h-[0.5em]"></div></td></tr>
  </>
}
