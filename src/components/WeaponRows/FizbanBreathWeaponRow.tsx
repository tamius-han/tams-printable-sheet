import React from 'react';
import { getProfMod, getValue, getPeriod } from '../../utils/dnd';
import { classNames } from '../../utils/helpers';
import { WeaponProps, getDamageColor, getWeaponDamage } from '../../utils/weapon-helpers';

export default function FizbanBreathWeaponRow({item, abilities, attributes}: WeaponProps) {

  return <>
    <tr className="text-center tracking-none leading-none">

    {/* name */}
    <td className="text-left" width="auto">
      <div className={classNames([
          "pl-[0.5em] pt-[0.365em] pb-[0.125em]",
          "row-decoration-diamond start border border-x-0 border-black row-decoration-diamond-transition-r bg-primary-light",
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
        ])
      }>
        {item.system.save.ability} {8 + getProfMod(abilities, item.system.save.ability, attributes)}
      </div>
    </td>

    {/* Damage */}
    <td colSpan={2}>
      <div className={
        classNames([
          "pt-[0.365em] pb-[0.125em] row-decoration-diamond mid border border-x-0 border-black",
          "relative row-decoration-diagonal-border-r bg-white",
        ])
      }>
        &nbsp;
      </div>
    </td>

    <td className="relative">
      <div className={
        classNames([
          "relative",
          "pt-[0.365em] pb-[0.125em] pr-2",
          "flex flex-row justify-end gap-1",
          "row-decoration-diamond end border border-x-0 border-black bg-white",
        ])}
      >
        <div>Uses:</div>
        <div className={classNames(["w-[2em] show-print"])}></div>
        <div className={classNames([
          "hide-print h-full min-w-[1.25em] text-right",
          "-mt-[0.365em] pt-[0.365em] -mb-[0.125em] pb-[0.125em] -mr-1 pr-1",
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
            'row-decoration-shard border border-x-0 border-black bg-grey-faint',
          ])}>
            {item.target.value} {item.target.units} {item.target.type}
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
            'row-decoration-shard border border-x-0 border-black bg-grey-faint',
          ])}>
            per {getPeriod(item)}
          </div>
        </div>
      </div>
    </td>
  </tr>
  <tr>
    <td colSpan={1} className="text-right pr-[1em]">
      <div className="h-full flex flex-row items-center justify-end">
        <div className="row-decoration-shard border border-x-0 border-black bg-primary-light mt-[0.125em] pt-[0.125em] pr-[1em] uppercase">Pick option:</div>
      </div>
    </td>
    <td colSpan={4} className="relative text-[0.6rem]">
      <div className="flex flex-col justify-center">
        {item.effects?.options?.map((x: any) => <>
          <div className={classNames([
            'px-[0.5em] pt-[0.25em]',
            "row-decoration-shard border border-x-0 border-black bg-white mt-[0.125em] uppercase"
          ])}>
            {x}
          </div>
        </>)}
      </div>
    </td>
  </tr>
  <tr><td><div className="h-[0.5em]"></div></td></tr>

  </>;
}
