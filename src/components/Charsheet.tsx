import React from 'react';
import './Charsheet.css';
import Abilities from './Abilities';
import Skills from './Skills';
import CharacterBasicDetails from './CharacterBasicDetails';
import HPACInit from './HPACInit';
import Weapons from './Weapons';
import FeatList from './FeatList';
import ItemList from './ItemList';
import { getCarry, getMod, getProfMod, mapArmorProficiencies, mapLanguages, mapToolProficiencies, mapWeaponProficiencies } from '../utils/dnd';
import { Item } from '../utils/5etypes';
import SpellList from './SpellList';

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

  // correct proficiency bonus for multiclasss:
  const realProficiency = 1 + Math.ceil(levels / 4);
  character.system.attributes.prof = realProficiency;

  const darkvision = {
    racial: character?.system?.attributes.senses.darkvision,
    class: character.items.find((x: Item) => /Devil's Sight/.test(x.name)) ? 60 : 0,
    items: character.items.find((x: Item) => x.name.startsWith("Goggles of Night")) ? 60 : 0,
  }

  const spellcastingData = {
    attackBonus: character.system.attributes.spellcasting ?
      ( getProfMod(character.system.abilities, character.system.attributes.spellcasting, character.system.attributes))
      : undefined,
    spellSave: character.system.attributes.spellcasting ?
      ( getProfMod(character.system.abilities, character.system.attributes.spellcasting, character.system.attributes) + 8)
      : undefined
  }

  console.log('items?', character.items);

  const resistances = [
    ...character.items.reduce(
      (acc: string[], x: Item) => {
        if (x.name.toLowerCase() === 'draconic resistance') {
          try {
            const match = x.system.description.value.match(/\b([a-zA-Z]+) damage/);
            if (match) {
              acc.push(match[1]);
            }
          } catch (e) {
            console.warn('Problem determining resistances. Regex didn\'t work, prolly.');
          }
        }

        return acc;
      },
      [] as string[]
    )
  ] as string[];

  return <>

    {/* First page */}
    <div className="charsheet flex flex-col p-8 font-sans font-normal">

      {/* NAME AND SHIT — top of sheet, full width*/}
      <div>
        <CharacterBasicDetails
          abilities={character.system.abilities}
          attributes={character.system.attributes}
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

        <div className="grow flex flex-col px-[2em]">

          {/* proficiencies and shit */}
          <div className="flex flex-row gap-[1em]">

            {/* Movement */}
            <div className="text-[0.8em]">
              <div className="text-primary uppercase font-bold font-serif">Movement</div>
              <div className="text-black/75 leading-none">
                {
                  Object.keys(character?.system?.attributes.movement ?? {}).map((key: string) => {
                    let d = 0;
                    switch (key) {
                      case 'burrow':
                      case 'fly':
                      case 'swim':
                      case 'walk':
                        d = character.system.attributes.movement[key];
                        break;
                      case 'climb':
                        if (character.items.find((x: Item) => x.name === 'Second-Story Work')) {
                          d = character.system.attributes.movement.walk;
                        } else {
                          d = character.system.attributes.movement[key];
                        }
                        break;
                      default:
                        return <></>
                    }
                    return d ? <><span className="capitalize text-[0.8em]">{key}:</span> <i>{d} {character.system.attributes.movement.units}.</i> </> : <></>
                  })
                }
              </div>
            </div>

            {/* Senses */}
            <div className="text-[0.8em]">
              <div className="text-primary uppercase font-bold font-serif">Senses</div>
              <div className="text-black/75 leading-none">
                {

                  ( (darkvision.racial + darkvision.class + darkvision.items) > 0 ) ?
                    <>
                      <span className="capitalize text-[0.8em]">darkvision:</span> <i>{
                        (darkvision.racial + darkvision.class + darkvision.items)
                      }ft.</i>
                      <span className="capitalize text-[0.6em] opacity-75"><br/>{darkvision.racial} race + {darkvision.class} class + {darkvision.items} items</span>
                    </>
                    : /* no darkvision at all */
                    <></>
                }
              </div>
            </div>

            {/* Languages */}
            <div className="text-[0.8em]">
              <div className="text-primary uppercase font-bold font-serif">Languages</div>
              <div className="text-black/75 leading-none">
                <span className=" capitalize text-[0.8em]">
                  {
                    [
                      ...mapLanguages(character.system.traits.languages.value),
                      ...(character.system.traits.languages.custom ? [character.system.traits.languages.custom ] : [])
                    ].join(' · ')
                  }
                </span>
              </div>
            </div>
          </div>

          {/* second row of proficiencies */}
          <div className="flex flex-row gap-[1em] mt-[0.25em]">

            {/* Armor proficiencies */}
            <div className="text-[0.8em]">
              <div className="text-primary uppercase font-bold font-serif">Armor</div>
              <div className="text-black/75 leading-none capitalize text-[0.8em]">
                {
                  [
                    ...mapArmorProficiencies(character.system.traits.armorProf.value),
                    ...(character.system.traits.armorProf.custom ? [character.system.traits.armorProf.custom ] : [])
                  ].join(' · ')
                }
              </div>
            </div>

            {/* Weapon proficiencies */}
            <div className="text-[0.8em]">
              <div className="text-primary uppercase font-bold font-serif">Weapons</div>
              <div className="text-black/75 leading-none capitalize text-[0.8em]">
                {
                  [
                    ...mapWeaponProficiencies(character.system.traits.weaponProf.value),
                    ...(character.system.traits.weaponProf.custom ? [character.system.traits.weaponProf.custom ] : [])
                  ].join(' · ')
                }
              </div>
            </div>

            {/* Tool proficiencies */}
            <div className="text-[0.8em]">
              <div className="text-primary uppercase font-bold font-serif">Tools</div>
              <div className="text-black/75 leading-none capitalize text-[0.8em]">
                {
                  [
                    ...mapToolProficiencies(character.system.traits.toolProf.value),
                    ...(character.system.traits.toolProf.custom ? [character.system.traits.toolProf.custom ] : [])
                  ].join(' · ')
                }
              </div>
            </div>
          </div>

          {/* Resistances n shit */}
          { resistances && resistances.length ?
            <div className="flex flex-row gap-[1em] mt-[0.25em]">
              <div className="text-[0.8em] flex flex-row gap-[1em] items-baseline">
                <div className="text-primary uppercase font-bold font-serif">Resistances</div>
                <div className="text-black/75 leading-none capitalize text-[0.8em]">{ resistances.join(' · ') }</div>
              </div>
            </div> : <></>
          }

          <Weapons
            abilities={character.system.abilities}
            attributes={character.system.attributes}
            items={character.items}
            levels={classLevels}
          />
        </div>
      </div>

      {/* FEATS */}
      <div className="h-[40dvh] text-[0.8em]">
        <FeatList
          items={character.items}
          abilities={character.system.abilities}
          attributes={character.system.attributes}
        />
      </div>
    </div>

    {/* First and a halfth-page - spells (if exist) */}
    { character.system.spells.spell1.max !== 0 ? // TODO: NOTE: PROLLY DOESN'T WORK FOR WARLOCKS
      <>
        <div className="charsheet flex flex-col p-8 font-sans font-normal">
          <div className="text-[2.5em] italic font-serif text-primary">{character.name}</div>
          <div className="flex flex-row justify-between -mt-2 mb-4">
            <div className="text-grey text-light font-light text-[1.5em]">Spellcasting</div>
            <div className="flex flex-col text-[#202848] text-light text-[0.8em]">
              <div className="flex flex-row gap-4 justify-between">
                <div className="opacity-75">Attack bonus:</div> <b>{spellcastingData.attackBonus}</b>
              </div>
              <div className="flex flex-row gap-4 justify-between">
                <div className="opacity-75">Spell save DC:</div> <b>{spellcastingData.spellSave}</b>
              </div>
            </div>
          </div>

          {
            character.items.find( (x: any) => x.type === 'spell' && x.system.level === 0 ) ? <>
              <div className="text-[0.78em]">
                <SpellList
                    items={character.items}
                    spellLevel={0}
                    abilities={character.system.abilities}
                    attributes={character.system.attributes}
                ></SpellList>
              </div>
            </> : <></>
          }

          { character.system.spells.spell1.max ?
            <div className="text-[0.78em]">
              <SpellList
                  items={character.items}
                  spellLevel={1}
                  abilities={character.system.abilities}
                  attributes={character.system.attributes}
              ></SpellList>
            </div> : <></>
          }
        </div>
      </> : <></>
    }

    {/* Second page - BIO */}
    <div className="charsheet flex flex-col p-8 font-sans font-normal">
      <div className="text-[3em] italic font-serif text-primary mb-[0.5em]">{character.name}</div>

      {/* Race, class(es), background, alignment */}
      <div className="flex flex-row gap-[1.5em] text-[0.9em]">
        <div className="flex flex-row gap-[0.5em] items-baseline">
          <div className="font-serif uppercase text-primary">Race</div>
          <div className="text-black/75 text-[0.8em]">{character.system.details.race}</div>
        </div>

        <div className="flex flex-row gap-[0.5em] items-baseline">
          <div className="font-serif uppercase text-primary">Class</div>
          <div className="text-black/75 text-[0.8em]">{classLevels.map((x: any) => `${x.name} ${x.levels}`).join(' · ')}</div>
        </div>

        <div className="flex flex-row gap-[0.5em] items-baseline">
          <div className="font-serif uppercase text-primary">Background</div>
          <div className="text-black/75 text-[0.8em]">{character.items.find((x: Item) => x.type === 'background')?.name}</div>
        </div>

        <div className="flex flex-row gap-[0.5em] items-baseline">
          <div className="font-serif uppercase text-primary">Alignment</div>
          <div className="text-black/75 text-[0.8em]">{character.system.details.alignment}</div>
        </div>
      </div>

      {/* Appearance, traits, etc. */}
      <div className="flex flex-row gap-[2em] text-[0.9em] mt-[1em] w-full">
        <div className="w-1/3">
          <div className="font-serif uppercase text-primary">Details</div>
          <div className="text-black/75 text-[0.8em]">
            <div><b>Gender:</b> {character.system.details.gender}</div>
            <div><b>Age:</b> {character.system.details.age}</div>
            <div><b>Height:</b> {character.system.details.height}</div>
            <div><b>Weight:</b> {character.system.details.weight}</div>
            <div><b>Skin:</b> {character.system.details.skin}</div>
            <div><b>Hair:</b> {character.system.details.skin}</div>

            {/* <div dangerouslySetInnerHTML={{__html: character.system.details.appearance}}></div> */}
          </div>
        </div>

        <div className="w-1/3">
          <div className="font-serif uppercase text-primary">Traits</div>
          <div className="text-black/75 text-[0.8em]" dangerouslySetInnerHTML={{__html: character.system.details.trait}}></div>
          <div className="font-serif uppercase text-primary mt-[1em]">Flaws</div>
          <div className="text-black/75 text-[0.8em]" dangerouslySetInnerHTML={{__html: character.system.details.flaw}}></div>
        </div>

        <div className="w-1/3">
          <div className="font-serif uppercase text-primary">Ideals</div>
          <div className="text-black/75 text-[0.8em]" dangerouslySetInnerHTML={{__html: character.system.details.ideal}}></div>
          <div className="font-serif uppercase text-primary mt-[1em]">Bonds</div>
          <div className="text-black/75 text-[0.8em]" dangerouslySetInnerHTML={{__html: character.system.details.bond}}></div>
        </div>
      </div>

      <div className="flex flex-row gap-[2em] text-[0.9em] mt-[2em] w-full">
        <div className="w-1/2">
          <div className="font-serif uppercase text-primary mb-4 font-bold text-center">Biography</div>
          <div className="text-black/75 text-[0.8em]" dangerouslySetInnerHTML={{__html: character.system.details.biography.value}}></div>
        </div>
        <div className="w-1/2">
          <div className="font-serif uppercase text-primary mb-4 font-bold text-center">Appearance</div>
          <img src="/drake_croft_placeholder-transparent.png" alt="chatgpt doesnt do goblin drawings" />
          <div className="mt-4">
          <div className="text-black/75 text-[0.8em]" dangerouslySetInnerHTML={{__html: character.system.details.appearance}}></div>
          </div>
        </div>
      </div>
    </div>

    {/* THIRD PAGE - ITEMS */}
    <div className="charsheet flex flex-col p-8 font-sans font-normal">
      <ItemList items={character.items} currency={character.system.currency} maxCarry={getCarry(character.system.abilities)} />
    </div>

    {/* ALL the feats */}
    <div className="charsheet2 flex flex-col p-8 font-sans font-normal h-full">
      <h1 className="text-[3rem] text-center tracking-none">FULL LIST OF FEATS</h1>
      <h1 className="text-[2rem] text-center">with unabridged descriptions</h1>
      <div className="grow shrink text-[0.8em]">
        <FeatList
          items={character.items}
          abilities={character.system.abilities}
          attributes={character.system.attributes}
          showAllFeats={true}
        />
      </div>
    </div>
  </>;
}
