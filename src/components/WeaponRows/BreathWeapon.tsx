import React from 'react';
import { getProfMod, getValue, getPeriod } from '../../utils/dnd';
import { classNames } from '../../utils/helpers';
import { WeaponProps, getDamageColor, getWeaponDamage } from '../../utils/weapon-helpers';

export default function BreathWeaponRow({item, abilities, attributes}: WeaponProps) {

  return <>
    <tr className="text-center tracking-none leading-none">

    {/* name */}
    <td className="text-left" width="auto">
      <div className={classNames([
          "pl-[0.5em] pt-[0.365em] pb-[0.125em]",
          "row-decoration-diamond start border border-x-0 border-black row-decoration-diamond-transition-r",
          getDamageColor(item.system.damage.parts[0][1])
        ])}
      >
        {item.name}
      </div>
    </td>

    {/* save */}
    <td className="uppercase">
      <div className={
        classNames([
          "pt-[0.365em] pb-[0.125em] row-decoration-diamond mid border border-x-0 border-black row-decoration-diamond-transition-l",
          getDamageColor(item.system.damage.parts[0][1], true)
        ])
      }>
        {item.system.save.ability} {8 + getProfMod(abilities, item.system.save.scaling, attributes)}
      </div>
    </td>

    {/* Damage */}
    <td colSpan={2}>
      <div className={
        classNames([
          "pt-[0.365em] pb-[0.125em] row-decoration-diamond mid border border-x-0 border-black",
          "relative row-decoration-diagonal-border-r",
          getDamageColor(item.system.damage.parts[0][1], true)
        ])
      }>
        {
          getWeaponDamage(item).map((x: any) => <>
              <div className="leading-none flex flex-row items-center justify-center">
                {x.d} <span className="ml-2 text-grey-light uppercase text-[0.6em]">{x.type}</span>
              </div>
          </>)
        }
      </div>
    </td>

    <td className="relative">
      <div className={
        classNames([
          "relative",
          "pt-[0.365em] pb-[0.125em] pr-2",
          "flex flex-row justify-end gap-1",
          "row-decoration-diamond end border border-x-0 border-black",
          getDamageColor(item.system.damage.parts[0][1])
        ])}
      >
        <div>Uses:</div>
        <div className={classNames(["w-[2em] show-print", getDamageColor(item.system.damage.parts[0][1], true)])}></div>
        <div className={classNames([
          "hide-print h-full min-w-[1.25em] text-right",
          "-mt-[0.365em] pt-[0.365em] -mb-[0.125em] pb-[0.125em] -mr-1 pr-1",
          getDamageColor(item.system.damage.parts[0][1], true)
          ])}
        >
          <div contentEditable>{item.system.uses.value}</div>
        </div>
        <div>/ {getValue(item.system.uses.max, abilities, attributes)}</div>
      </div>
    </td>
  </tr>
  {/* sub row */}

  <tr>
    <td colSpan={4} className="text-[0.6rem] relative h-[0.6rem]">
      <div className={classNames([
        "absolute -top-[0.25rem] left-0 pl-[0.125em]"
      ])}>
        <div className="relative w-full z-10 px-4">
          <div className={classNames([
            'text-black/75 uppercase leading-none flex flex-row gap-1 italic comma-separated',
            'px-[0.5em] pt-[0.25em]',
            'row-decoration-shard border border-x-0 border-black',
            getDamageColor(item.system.damage.parts[0][1], true)
          ])}>
            {item.system.target.value} {item.system.target.units} {item.system.target.type}
          </div>
        </div>
      </div>
    </td>
    <td className="relative text-[0.6rem] h-[0.6rem]">
      <div className={classNames([
        "absolute -top-[0.25rem] right-0 pr-[0.125em]"
      ])}>
        <div className="relative w-full z-10 px-4">
          <div className={classNames([
            'text-black/75 uppercase leading-none flex flex-row gap-1 italic comma-separated',
            'px-[0.5em] pt-[0.25em]',
            'row-decoration-shard border border-x-0 border-black',
            getDamageColor(item.system.damage.parts[0][1], true)
          ])}>
            per {getPeriod(item)}
          </div>
        </div>
      </div>
    </td>
  </tr>
  <tr><td><div className="h-[0.5em]"></div></td></tr>

  </>;
}
