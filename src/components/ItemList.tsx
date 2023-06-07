import React from 'react';
import { Item } from '../utils/5etypes';
import FormattedPrice from './Inventory/FormattedPrice';
import InventoryItemRow from './Inventory/InventoryItemRow';
import './ItemList.css';

type Props = {
  items: Item[],
  currency: {pp: number, gp: number, ep: number, sp: number, cp: number},
  maxCarry: number,
};

type CategorizedItems = {
  weapons: Item[],
  equipment: Item[],
  containers: Item[],
  consumables: Item[],
  loot: Item[],
  tools: Item[],
  other: Item[],
}

export default function ItemList({items, currency, maxCarry}: Props) {


  const categorizedItems: CategorizedItems = items.reduce(
    (acc: CategorizedItems, item: Item) => {
      switch (item.type) {
        // we don't add the following types of items:
        case 'feat':
        case 'class':
        case 'subclass':
        case 'background':
          break;

        // we add the other types of items
        case 'weapon':
          acc.weapons.push(item);
          break;
        case 'equipment':
          acc.equipment.push(item);
          break;
        case 'backpack':
          acc.containers.push(item);
          break;
        case 'consumable':
          acc.consumables.push(item);
          break;
        case 'loot':
          acc.loot.push(item);
          break;
        case 'tool':
          acc.tools.push(item);
          break;
        default:
          acc.other.push(item);
      }

      return acc;
    },
    {
      weapons: [],
      equipment: [],
      containers: [],
      consumables: [],
      loot: [],
      tools: [],
      other: []
    }
  );

  const equipmentStatus = items.reduce(
    (acc: any, item: Item) => {
      switch (item.type) {
        case 'feat':
        case 'class':
        case 'subclass':
        case 'background':
          return acc;
        default:
          acc.price += (item.system.price * item.system.quantity);
          acc.weight += Math.max((item.system.weight * item.system.quantity), 0);  // don't account for negative weighs
          acc.carryCap += Math.max(-(item.system.weight * item.system.quantity), 0);  // increase carry cap for animals
          return acc;
      };
    },
    {price: 0, weight: 0, carryCap: 0}
  );

  console.log('currency gp', currency);
  const currencygp = currency.pp * 10 + currency.gp + currency.ep / 2 + currency.sp / 10 + currency.cp / 100;

  return <>

    <div className="h-[99%] flex flex-col">
      <div className="font-serif text-primary uppercase text-[1.5em] w-full text-center">
        Inventory
      </div>
      <div className="flex flex-row gap-[3em] w-full my-[1em]">
        <div className="w-1/2">
          <div><span className="font-serif small-caps">Equipment value: &nbsp;</span> <FormattedPrice price={equipmentStatus.price} /></div>
          <div><span className="font-serif small-caps">Bank: &nbsp;</span>  <FormattedPrice price={currencygp} /></div>
        </div>
        <div className="w-1/2">
          <div><span className="font-serif small-caps">Carry: &nbsp;</span> <span className="text-primary">{equipmentStatus.weight} lb.</span></div>
          <div><span className="font-serif small-caps">Cap: &nbsp;</span> <span className="text-primary-dark">{equipmentStatus.carryCap + maxCarry} lb. <span className="opacity-75">({maxCarry} lb. char, {equipmentStatus.carryCap} lb. outsourced)</span></span></div>
        </div>
      </div>


      <div className="text-[0.8em] item-cols flex-grow-1 flex-shrink-1 max-h-[90%]">
        <div className="w-full inline-block">
          <div className="font-serif uppercase text-center w-full text-primary-dark font-bold">All weapons</div>
          <table className="w-full mb-[1em]">
            {
              categorizedItems.weapons.map((item: Item) => <>
                <InventoryItemRow item={item} />
              </>)
            }
          </table>
        </div>

        <div className="w-full inline-block">
          <div className="font-serif uppercase text-center w-full text-primary-dark font-bold">All equipment</div>
          <table className="w-full mb-[1em]">
            {
              categorizedItems.equipment.map((item: Item) => <>
                <InventoryItemRow item={item} />
              </>)
            }
          </table>
        </div>

        <div className="w-full inline-block">
          <div className="font-serif uppercase text-center w-full text-primary-dark font-bold">Consumables</div>
          <table className="w-full mb-[1em]">
            {
              categorizedItems.consumables.map((item: Item) => <>
                <InventoryItemRow item={item} />
              </>)
            }
          </table>
        </div>

        <div className="w-full inline-block">
          <div className="font-serif uppercase text-center w-full text-primary-dark font-bold">Tools</div>
          <table className="w-full mb-[1em]">
            {
              categorizedItems.tools.map((item: Item) => <>
                <InventoryItemRow item={item} />
              </>)
            }
          </table>
        </div>

        <div className="w-full inline-block">
          <div className="font-serif uppercase text-center w-full text-primary-dark font-bold">Dockerhub</div>
          <table className="w-full mb-[1em]">
            {
              categorizedItems.containers.map((item: Item) => <>
                <InventoryItemRow item={item} />
              </>)
            }
          </table>
        </div>

        <div className="w-full inline-block">
          <div className="font-serif uppercase text-center w-full text-primary-dark font-bold">Loot</div>
          <table className="w-full mb-[1em]">
            {
              categorizedItems.loot.map((item: Item) => <>
                <InventoryItemRow item={item} />
              </>)
            }
          </table>
        </div>

        <div className="w-full inline-block">
          <div className="font-serif uppercase text-center w-full text-primary-dark font-bold">Other</div>
          <table className="w-full mb-[1em]">
            {
              categorizedItems.other.map((item: Item) => <>
                <InventoryItemRow item={item} />
              </>)
            }
          </table>
        </div>
      </div>
    </div>
  </>
}
