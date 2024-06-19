import React from 'react';
import { Abilities, Attributes, Item } from '../utils/5etypes';
import uselessFeats from '../data/feats/useless-feats';
import { getCharacterClasses } from '../utils/dnd';
import { addShortFeats, getBonusActions } from '../data/feats/short-desc';
import './FeatList.css';
import { classNames } from '../utils/helpers';

function processSpells(items: Item[], spellLevel: number) {
  const relevantItems = items.filter((x: Item) => {
    // hide non-spells
    if (x.type !== 'spell' || x.system.level !== spellLevel) {
      return false;
    }

    return true;
  });

  return relevantItems;
}



type Props = {
  items: Item[];
  spellLevel: number,
  abilities: Abilities;
  attributes: Attributes;
}

export default function SpellList({items, spellLevel, abilities, attributes}: Props) {

  const processedFeats = processSpells(items, spellLevel);

  return <>
   <div className="w-full text-center font-serif uppercase font-bold text-primary mb-[0.5em]">
      Level {spellLevel}
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
                "bg-[#bbccff] border border-[#2233aa] border-x-0"
              ])}
            >
              {item.name}
            </div>
            <div className="bg-[#bbccff]/50 border border-[#4466bb] border-t-0 border-x-0 text-[#202848] text-[0.9em] pr-[0.5em] py-[0.25em] pl-[0.75em]">
              <b>Cost:</b>&nbsp;<i className="opacity-75">{item.system.activation.cost}&nbsp;{item.system.activation.type}</i><wbr/>&nbsp;&nbsp;&nbsp;&nbsp;<wbr/>
              <b>Duration:</b>&nbsp;<i className="opacity-75">{item.system.duration.value ? `${item.system.duration.value}\u00a0` : ''}{item.system.duration.units}</i><wbr/>&nbsp;&nbsp;&nbsp;&nbsp;<wbr/>
              <b>Range:</b>&nbsp;<i className="opacity-75">{item.system.range.value ? `${item.system.range.value}\u00a0` : ''}{item.system.range.units}</i><wbr/>&nbsp;&nbsp;&nbsp;&nbsp;<wbr/>
              <b>Target:</b>&nbsp;<i className="opacity-75">{item.system.target.value ? `${item.system.target.value}\u00a0` : ''}{item.system.target.units}{item.system.target.type ? `\u00a0${item.system.target.type}` : ''}</i><wbr/>&nbsp;&nbsp;&nbsp;&nbsp;<wbr/>

              {/* ritual - sometimes present */}
              { item.system.components.ritual ? <span>(rit.)</span> : ''}<wbr/>&nbsp;&nbsp;<wbr/>

              {/* VSM - always present */}
              <span>
                { item.system.components.vocal ? 'V' : ''}
                { item.system.components.somatic ? 'S' : ''}
                { item.system.components.material ? 'M' : ''}
              </span><wbr/>&nbsp;<wbr/>
                {/* Cost - sometimes present */}
                {
                  item.system.materials.value ?
                    `— ${item.system.materials.value} (${item.system.materials.consumed ? 'consumed' : 'not consumed'})`: ''
                }
            </div>
            <div className="text-black/75 text-[0.9em] pr-[0.5em] py-[0.5em] pl-[0.75em] bg-[#bbccff]/25 overflow-x-auto" dangerouslySetInnerHTML={{__html: item.tpsShort?.desc ?? item.system.description.value}}></div>
          </div>
        </>)
      }
    </div>

  </>
}
