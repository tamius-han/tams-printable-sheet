import React from 'react';
import { getMod, getSigned } from '../utils/dnd';


type Props = {
  attributes: any,
  abilities: any,
  items: any
}

/**
 * HP, AC, Initiative panel.
 */
export default function HPACInit({attributes, abilities, items}: Props) {

  const updateMaxHp = (event: any) => {
    console.log('received input event', event.target.textContent);
  }
  const exitOnEnter = (event: any) => {
    if (event.key === 'Enter') {
      event.target.blur();
      event.stopPropagation();
    }
  }

  function getAc() {
    return items.reduce((acc: number, x: any) => {
      // every item with system.armor.value anything other than falsy will contribute to AC
      if ( x.system.equipped && x.system.armor?.value && x.type !== 'weapon') {
        acc += x.system.armor.value;
        if (x.system.armor.dex) {
          acc += Math.max(x.system.armor.dex, getMod(abilities, 'dex'))
        }
        if (x.system.armor.type === 'light') {
          acc += getMod(abilities, 'dex');
        }
      }

      return acc;
    }, 0);
  }

  /** NOTE: GET INIT DOES NOT ACCOUNT FOR ANY BONUSES WHATSOEVER. TODO */
  function getInit() {
    return getSigned(getMod(abilities, 'dex'));
  }

  function getHitDice() {
    const hitDice = items.reduce(
      (acc: any, x: any) => {

        if (x.type === 'class') {
          if (!acc[x.system.hitDice]) {
            acc[x.system.hitDice] = {d: x.system.hitDice, total: 0, available: 0}
          }

          acc[x.system.hitDice].total += +x.system.levels;
          acc[x.system.hitDice].available += (x.system.levels - x.system.hitDiceUsed);
        }

        return acc;
      },
      {}
    )

    // convert to array
    const hda = [];
    for (const key in hitDice) {
      // console.log('trying key:', key, hitDice[key]);
      hda.push(hitDice[key]);
    }

    // maybe sort at some point?
    // very low prio cos how often do you even multiclass?
    return hda;
  }

  const ac = getAc();
  const init = getInit();
  const hitDice = getHitDice();

  return <>
    <div className="flex flex-col">

      {/* HP, AC, init row */}
      <div className="flex flex-row gap-12 px-8 justify-center">

        {/* HP */}
        <div className="flex flex-col items-center justify-center">
          <div className="diamond-box w-[4rem] h-[4rem] text-[1.25rem] pr-[1px] font-light">
            <span className="show-print">{attributes.hp.max}</span>
            <span className="hide-print" contentEditable>{attributes.hp.value}</span>
          </div>
          <div className="diamond-bottom-label font-serif font-bold text-[0.8rem] uppercase text-nowrap">
            <span className="text-white text-nowrap">
              Max&nbsp;HP<span className="hide-print">:&nbsp;<span className="font-sans text-primary" contentEditable onInput={updateMaxHp} onKeyDown={exitOnEnter} onKeyUp={exitOnEnter}>{attributes.hp.max}</span></span>
            </span>
          </div>
        </div>

        {/* AC */}
        <div className="flex flex-col items-center justify-center">
          <div className="diamond-box w-[4rem] h-[4rem] text-[1.25rem] pr-[1px] font-light">
            {ac}
          </div>
          <div className="diamond-bottom-label font-serif font-bold text-[0.8rem] uppercase">
            AC
          </div>
        </div>

        {/* AC */}
        <div className="flex flex-col items-center justify-center">
          <div className="diamond-box w-[4rem] h-[4rem] text-[1.25rem] pr-[1px] font-light">
            {init}
          </div>
          <div className="diamond-bottom-label font-serif font-bold text-[0.8rem] uppercase">
            Init
          </div>
        </div>

        {/* Hit dice */}
        <div className="flex flex-col items-center justify-end">
          <div className="w-[4rem] pb-[1.25em] text-center">
            { hitDice.map(x => <>
              <div className="flex flex-row leading-none justify-center">
                <div className="font-serif italic text-grey mr-2 ">{x.d}:</div>
                <div className="hide-print">{x.available}/</div>
                <div>{x.total}</div>
              </div>
            </>)}
          </div>

          <div className="diamond-bottom-label font-serif font-bold text-[0.8rem] uppercase text-nowrap">
            Hit&nbsp;dice
          </div>
        </div>


      </div>


    </div>
  </>
}
