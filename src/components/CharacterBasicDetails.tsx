import React from 'react';
import './CharacterBasicDetails.css';

type Props = {
  name: string,
  characterDetails: any,
  items: any,
  level: number
}

export default function CharacterBasicDetails({name, characterDetails, items, level}: Props) {

  // get classes
  const characterClasses = items.filter((x: any) => x.type === 'class');
  const characterSubclasses = items.filter((x: any) => x.type === 'subclass');


  const displayCharacterClasses = characterClasses.map( (cclass: any) => ({
    name: cclass.name,
    subclass: characterSubclasses.find((x: any) => x.system.classIdentifier === cclass.system.identifier)?.name,
    levels: cclass.system.levels
  }));

  return <>
    <div className="flex flex-col w-full border-b mb-4 pb-2 border-grey">
      <div className="flex flex-row w-full">

        {/* Name, class, race column */}
        <div className="flex-grow">
          <div className="flex-grow text-[2.5em] font-serif italic text-primary leading-none tracking-none">
            { name.split("(")[0] }
          </div>

          <div className="text-grey text-light font-light">
            {displayCharacterClasses.map((x: any) => `${x.name}${x.subclass ? ` (${x.subclass})` : ''} — ${x.levels}`).join('; ')}
          </div>
          <div className="text-grey text-light font-light italic text-[0.8em]">
            {characterDetails.race}
          </div>
        </div>

        {/* XP BOX */}
        <div className="tracking-none leading-none flex flex-col items-end pt-[0.35rem]">
          <div className="xp-box w-[5em] py-1 flex flex-col items-end">
            <div className="">
              { characterDetails.xp.value}
            </div>
            <div className="text-[0.75rem] text-grey-light font-serif uppercase font-bold">XP</div>
          </div>
        </div>

        {/* LEVEL BOX */}
        <div className="w-[5rem] h-[5rem] text-center leading-none level-container ml-4">
          <div className="level-box text-[3em] font-light pt-1 -mb-1">
            { level }
          </div>
          <div className="level-label font-serif uppercase font-bold text-white text-[0.75em] pt-[0.30em] pb-[0.125em] tracking-none leading-none">
            Level
          </div>
        </div>
      </div>

    </div>
  </>
}
