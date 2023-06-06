import React from 'react';
import { Abilities, Attributes, Item } from '../utils/5etypes';
import { addShortFeats } from '../data/feats/short-desc';
import BreathWeaponRow from './WeaponRows/BreathWeapon';
import FizbanBreathWeaponRow from './WeaponRows/FizbanBreathWeaponRow';
import WeaponRow from './WeaponRows/WeaponRow';
import ClassSkill from './WeaponRows/ClassSkill';

type Props = {
  items: Item[];
  abilities: Abilities;
  attributes: Attributes;
  levels: any,
}

export default function Weapons({items, abilities, attributes, levels}: Props) {

  const weaponsAvailable = items.filter((x: any) => x.type === 'weapon');

  const racialWeapons = items.filter((x: Item) => {
    if (x.type === 'feat') {
      // add things that show up under racial weapons here
      return ['Breath Weapon', 'Metallic Breath Weapon'].includes(x.name);
    }
    return false;
  });

  const classSkills = items.filter((x: Item) => {
    if (x.type === 'feat') {
      // add class feats that deal damage
      return ['Sneak Attack'].includes(x.name);
    }
    return false;
  });

  addShortFeats(racialWeapons);
  addShortFeats(classSkills)


  return <>
    <div className="text-[0.8em] w-full">
      {/* Normal attacks (weapons) */}
      <table border={0} cellPadding={0} cellSpacing={0} className="mx-[1em] text-[0.85em] w-full">
        <thead>
          <tr>
            <td colSpan={9}>
              <div className="mt-[2em] mb-[0em] font-serif font-bold text-primary uppercase text-center">
                Attacks
              </div>
            </td>
          </tr>
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
              <WeaponRow item={x} abilities={abilities} attributes={attributes} />
            </>
          )
        }

        {/* OTHER SOURCES */}
        <tr>
          <td colSpan={9}>
            <div className="mt-[0.5em] mb-[0em] font-serif font-bold text-primary uppercase text-center">
              Damage from skills
            </div>
          </td>
        </tr>
        {
          classSkills.map( (x: Item) =>
            <>
              <ClassSkill item={x} abilities={abilities} attributes={attributes} levels={levels}/>
            </>
          )
        }

      </table>
    </div>

  </>
}
