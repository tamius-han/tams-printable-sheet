import React from 'react';
import { Abilities, Attributes, Item } from '../utils/5etypes';
import uselessFeats from '../data/feats/useless-feats';
import { getCharacterClasses } from '../utils/dnd';
import { addShortFeats, getBonusActions } from '../data/feats/short-desc';
import './FeatList.css';
import { classNames } from '../utils/helpers';

function processFeats(items: Item[], abilities: Abilities, attributes: Attributes, showAllFeats?: boolean) {


  const bonusActionGrants = getBonusActions(items);

  const relevantItems = items.filter((x: Item) => {
    // hide non-feats
    if (x.type !== 'feat') {
      return false;
    }

    // if showAllFeats argument is passed, we don't hide any feats
    if (showAllFeats) {
      return true;
    }

    // hide race feats that certain module doles out
    if (x.flags?.plutonium?.page === 'races.html') {
      return false;
    }

    // check if feat is considered an useless feat on base of race or background
    if (uselessFeats.other.includes(x.name)) {
      return false;
    }

    // check if feat is considered an useless feat on base of class
    const charClasses = getCharacterClasses(items);
    for (const c of charClasses) {
      if (uselessFeats[c.classId].includes(x.name)) {
        return false;
      }
    }

    return true;
  });

  // process features by type

  // add data from shortFeats, unless showAllFeats is set in which case don't
  if (!showAllFeats) {
    addShortFeats(relevantItems);
    console.log('added short feats to relevant items:;', relevantItems);
  }

  // insert bonus actions at the start of the list, if they exist:
  if (bonusActionGrants.length) {
    relevantItems.splice(
      0,
      0,
      {
        name: 'Bonus actions',
        system: {} as any,
        tpsShort: {
          desc: bonusActionGrants.join(', ')
        }
      } as any
    );
  }

  return relevantItems;
}



type Props = {
  items: Item[];
  abilities: Abilities;
  attributes: Attributes;
  showAllFeats?: boolean;
}

export default function FeatList({items, abilities, attributes, showAllFeats}: Props) {


  const processedFeats = processFeats(items, abilities, attributes, showAllFeats);

  return <>
    <div className="w-full text-center font-serif uppercase font-bold text-primary mb-[0.5em]">
      Feats
    </div>
    <div className="feat-cols w-full h-full text-[0.9em]">
      {
        processedFeats.map((item: Item) => <>
          <div className="mb-[1em] inline-block feat w-full">
            <div
              className={classNames([
                "relative",
                "text-black/75 feat-title",
                "pr-[0.25em] pt-[0.25em] pl-[0.75em] ",
                "text-bold font-serif uppercase font-bold leading-none",
                "bg-primary-light border border-primary-dark border-x-0"
              ])}
            >{item.name}</div>
            <div className="text-black/75 text-[0.9em] pr-[0.5em] py-[0.5em] pl-[0.75em] bg-primary-light/25 overflow-x-auto" dangerouslySetInnerHTML={{__html: item.tpsShort?.desc ?? item.system.description.value}}></div>
          </div>
        </>)
      }
    </div>

  </>
}
