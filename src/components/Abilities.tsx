import React from 'react';
import { getMod, getSave } from '../utils/dnd';
import { classNames } from '../utils/helpers';
import './Abilities.css';

type Props = {
  abilities: any;
  proficiency: number;
}

const abilityList = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

export default function Abilities({abilities, proficiency}: Props) {



  return <>
    <div className="score-list py-[1em] text-[0.85em]">
      {
        abilityList.map(
          ability => <>
            <div key={ability} className="score-box text-center pt-[0.125em] pb-[0.5em] mb-[0.5em]">
              <div className={classNames([
                "score flex flex-col leading-none",
                abilities[ability].proficient ? 'proficient' : ''
              ])}>
                <div className="text-[2em] font-light">
                  {abilities[ability].value}
                </div>
                <div className="uppercase font-bold text-primary font-serif flex flex-row justify-center">
                  <div className="score-name pt-[0.25em] pb-[0.03em] px-2 w-[90%]">
                    {ability}
                  </div>
                </div>
              </div>
              <div className="flex flex-row text-[0.8em] tracking-none pt-[0.25em]">
                <div className="px-[0.25em] pt-[0.2em] text-center">
                  ☑️ {getMod(abilities, ability)}
                </div>
                <div className={classNames([
                  "px-[0.125em] pt-[0.2em] text-center",
                  abilities[ability].proficient ? "bg-primary/25 font-bold" : ''
                ])}>
                  💾 {getSave(abilities, ability, proficiency)}
                </div>
              </div>
            </div>
          </>
        )
      }
    </div>
  </>
}
