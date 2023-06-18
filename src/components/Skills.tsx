import React from 'react';
import { getSkillModifier } from '../utils/dnd';
import { classNames } from '../utils/helpers';
import './Skills.css';

const skillList = [
  {key: 'acr', label: 'Acrobatics'},
  {key: 'ani', label: 'Animal handling'},
  {key: 'arc', label: 'Arcana'},
  {key: 'ath', label: 'Athletics'},
  {key: 'dec', label: 'Deception'},
  {key: 'his', label: 'History'},
  {key: 'ins', label: 'Insight'},
  {key: 'itm', label: 'Intimidation'},
  {key: 'inv', label: 'Investigation'},
  {key: 'med', label: 'Medicine'},
  {key: 'nat', label: 'Nature'},
  {key: 'prc', label: 'Perception'},
  {key: 'rel', label: 'Religion'},
  {key: 'slt', label: 'Sleight of Hand'},
  {key: 'ste', label: 'Stealth'},
  {key: 'sur', label: 'Survival'}
];

const proficiencyLevelClass: {[x: string]: string} = {
  '0': 'text-grey',
  '1': 'text-black',
  '2': 'text-primary'
};

const proficiencyLevelMarkerClass: {[x: string]: string} = {
  '0': 'outline-grey',
  '1': 'outline-black bg-black',
  '2': 'outline-primary bg-primary'
}

type Props = {
  abilities: any;
  skills: any;
  proficiency: number;
}
export default function Skills({abilities, skills, proficiency}: Props) {

  return <>
    <div className="flex flex-col ml-4 text-[0.8em]">

      <div  className="flex flex-row w-full px-[1em] mb-[0.75em]">
        <div className="prof-box h-[2.5em] w-[2.5em] text-center leading-none flex flex-row justify-center items-center">+{proficiency}&nbsp;</div>
        <div className="flex-grow uppercase font-serif font-bold text-primary text-[0.8em] flex items-center mb-[1px]">
          <div className="prof-label w-full text-center pt-[0.125em]">Prof. bonus</div>
        </div>
      </div>

      <div className="text-center text-primary font-bold font-serif font-bold uppercase">Skills</div>
      {skillList.map((skill) => <>
        <div className={classNames([
          "flex flex-row py-[0.25em]",
          proficiencyLevelClass[`${skills[skill.key].value as string}`]
        ])}>
          <div className="w-[1em] flex flex-row align-center justify-center relative ml-[1em] mr-[0.5em]">
            <div className={classNames([
              "proficiency-marker",
              proficiencyLevelMarkerClass[`${skills[skill.key].value as string}`]
            ])}>
            </div>
          </div>
          <div className="px-[0.25em] w-[2.5em] font-bold text-right text-[1.005em]">{getSkillModifier(abilities, skills, skill.key, proficiency, true)}</div>
          <div className="">{skill.label} <span className="opacity-50 text-[0.8em] capitalize pl-1">({skills[skill.key].ability})</span></div>
        </div>
      </>)}

      <div className="text-center text-primary font-bold font-serif font-bold uppercase mt-[1em] mb-[0.5em]">Passives</div>
      <div className="uppercase text-[0.8em] text-grey flex flex-row flex-wrap gap-x-[0.5em] mx-[0.5em] justify-center items-center ">
        <div>Perception: <b className="text-black/75">{10 + (getSkillModifier(abilities, skills, 'prc', proficiency) as number)}</b></div>
        <div>Investigation: <b className="text-black/75">{10 + (getSkillModifier(abilities, skills, 'inv', proficiency) as number)}</b></div>
        <div>Insight: <b className="text-black/75">{10 + (getSkillModifier(abilities, skills, 'ins', proficiency) as number)}</b></div>
      </div>
    </div>
  </>
}
