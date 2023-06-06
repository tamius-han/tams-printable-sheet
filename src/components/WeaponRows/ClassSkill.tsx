import React from 'react';
import { classNames } from '../../utils/helpers';
import { WeaponProps, getWeaponDamage } from '../../utils/weapon-helpers';

export default function ClassSkill({item, abilities, attributes, levels}: WeaponProps & {levels: any}) {


  if (item.tpsExtras?.diceFormula) {
    const classLevel = levels.find((x: any) => x.id === item.tpsExtras.classIdentifier)?.levels;

    if (classLevel) {
      item.tpsExtras.displayD = `${item.tpsExtras.diceFormula(classLevel)}${item.tpsExtras.d}`;
    } else {
      item.tpsExtras.displayD = item.tpsExtras.d;
    }
  } else if (item.tpsExtras?.d) {
    item.tpsExtras.displayD = item.tpsExtras.d;
  }

  return <>
    <tr className="text-center tracking-none leading-none">

      {/* name */}
      <td className="text-left" width="auto">
        <div className={classNames([
            "pl-[0.5em] pt-[0.365em] pb-[0.125em]",
            "row-decoration-diamond start border border-x-0 border-black row-decoration-diamond-transition-r",
            "bg-[#bbccff]"
          ])}
        >
          {item.name}
        </div>
      </td>

      {/* save */}
      <td className="uppercase pl-[0.125em]">
        <div className={
          classNames([
            "pt-[0.365em] pb-[0.125em] row-decoration-diamond mid border border-x-0 border-black row-decoration-diamond-transition-l",
            "bg-[#dde0ff]"
          ])
        }>
          &nbsp;
        </div>
      </td>

      {/* Damage */}
      <td colSpan={2}>
        <div className={
          classNames([
            "pt-[0.365em] pb-[0.125em] row-decoration-diamond mid border border-x-0 border-black",
            "relative row-decoration-diagonal-border-r",
            "bg-[#dde0ff]"
          ])
        }> {item.d}
          {
            item.tpsExtras?.displayD ?? getWeaponDamage(item).map((x: any) => <>
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
            "bg-[#bbccff]"
          ])}
        >
          {(item as any).tpsExtras?.uses}
        </div>
      </td>
    </tr>
    {/* sub row */}

    <tr>
      <td colSpan={4} className="text-[0.8em] relative h-[0.8em]">
        <div className={classNames([
          "absolute -top-[0.3em] left-0 pl-[0.125em]",
          item.tpsExtras?.when ? '' : 'opacity-0'
        ])}>
          <div className="relative w-full z-10 px-4">
            <div className={classNames([
              'text-black/75 uppercase leading-none flex flex-row gap-1 italic comma-separated',
              'px-[0.5em] pt-[0.3em]',
              'row-decoration-shard border border-x-0 border-black',
              "bg-[#dde0ff]"
            ])}>
              <b>when:</b> {item.tpsExtras?.when}
            </div>
          </div>
        </div>
      </td>
      <td className="relative text-[0.8em] h-[0.8em]">
      </td>
    </tr>
    <tr><td><div className="h-[0.5em]"></div></td></tr>
  </>;
}
