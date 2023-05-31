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
    <div className="score-list py-4">
      {
        abilityList.map(
          ability => <>
            <div key={ability} className="score-box text-center pt-1 pb-2 mb-2">
              <div className={classNames([
                "score flex flex-col leading-none",
                abilities[ability].proficient ? 'proficient' : ''
              ])}>
                <div className="text-[2rem] font-light">
                  {abilities[ability].value}
                </div>
                <div className="uppercase font-bold text-primary font-serif flex flex-row justify-center">
                  <div className="score-name pt-[0.25rem] pb-[0.03rem] px-2 w-[90%]">
                    {ability}
                  </div>
                </div>
              </div>
              <div className="flex flex-row text-[0.8rem] tracking-none pt-[0.25rem]">
                <div className="px-1 pt-[0.2rem] text-center">
                  ☑️ {getMod(abilities, ability)}
                </div>
                <div className={classNames([
                  "px-1 pt-[0.2rem] text-center",
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
