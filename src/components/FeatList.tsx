import React from 'react';
import { Abilities, Attributes, Item } from '../utils/5etypes';
import uselessFeats from '../data/feats/useless-feats';
import { getCharacterClasses } from '../utils/dnd';


function processFeats(items: Item[], abilities: Abilities, attributes: Attributes, showAllFeats?: boolean) {


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


  return relevantItems;
}



type Props = {
  items: Item[];
  abilities: Abilities;
  attributes: Attributes;
}

export default function FeatList({items, abilities, attributes}: Props) {


  const processedFeats = processFeats(items, abilities, attributes);

  return <>
    <div className="flex flex-col flex-wrap w-full">
      {
        processedFeats.map((item: Item) => <>
          <div className="w-[30%]">
            <div className="text-primary">{item.name}</div>
            <div dangerouslySetInnerHTML={{__html: item.system.description.value}}></div>
          </div>
        </>)
      }
    </div>

  </>
}
