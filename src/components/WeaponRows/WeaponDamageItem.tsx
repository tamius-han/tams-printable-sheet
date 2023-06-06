import React from 'react';
import { classNames } from '../../utils/helpers';
import './WeaponDamageItem.css';

type Props = {
  roll: string,
  type: string,
  className?: string,
}

export default function WeaponDamageItem({roll, type, className = ''}: Props) {
  return <>
    <div className="w-full flex flex-row -mt-[0.125em]">
      <div className={classNames(["relative", className, "damage-item-diamond bg-white text-center", "border border-0 border-black"])}>
        <div className="-ml-[0.3em] relative w-[2em] z-10 text-center">
          <span className="opacity-0">{roll}</span>
          <div className="absolute left-0 top-0 w-[2em] h-full z-10 pt-[0.125em] text-center">{roll}</div>
        </div>
      </div>
      <div className={classNames([
        "relative z-2 px-[0.5em] ml-[0.5em] pl-[1em] h-[1.5em]",
        "damage-item-type",
        "border border-x-0 border-black bg-grey-faint",
        "uppercase text-grey text-[0.75em] leading-none tracking-none pt-[0.3em]"
      ])}>
        {type}
      </div>
    </div>
  </>
}
