import React from 'react';
import './Charsheet.css';
import Abilities from './Abilities';
import Skills from './Skills';
import CharacterBasicDetails from './CharacterBasicDetails';
import HPACInit from './HPACInit';
import Weapons from './Weapons';
import FeatList from './FeatList';

type Props = {
  character: any
}

export default function Charsheet({character} : Props) {

  const classLevels = character.items.filter((x: any) => x.type === 'class').map((x: any) => ({
    name: x.name,
    id: x.system.identifier,
    levels: x.system.levels
  }));
  const levels = classLevels.reduce((acc: number, x: any) => acc + x.levels, 0);

  return <>
    <div className="charsheet flex flex-col p-8 font-sans font-normal">

      {/* NAME AND SHIT — top of sheet, full width*/}
      <div>
        <CharacterBasicDetails
          name={character.name}
          characterDetails={character.system.details}
          items={character.items}
          level={levels}
        />
      </div>

      {/* Split the rest in a 1_2 fashion */}
      <div className="flex flex-row w-full">
        <Abilities
          abilities={character.system.abilities}
          proficiency={character.system.attributes.prof}
        />
        <Skills
          abilities={character.system.abilities}
          skills={character.system.skills}
          proficiency={character.system.attributes.prof}
        />

        <div className="grow flex flex-col">
          <HPACInit
            abilities={character.system.abilities}
            attributes={character.system.attributes}
            items={character.items}
          />
          <Weapons
            abilities={character.system.abilities}
            attributes={character.system.attributes}
            items={character.items}
            levels={classLevels}
          />
        </div>
      </div>

      {/* FEATS */}
      <div>
        <FeatList
          items={character.items}
          abilities={character.system.abilities}
          attributes={character.system.attributes}
        />
      </div>
    </div>
  </>;
}
