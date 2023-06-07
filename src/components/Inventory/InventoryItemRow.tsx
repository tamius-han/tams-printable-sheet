import React from 'react';
import { Item } from '../../utils/5etypes';
import FormattedPrice from './FormattedPrice';


type Props = {
  item: Item;
}

export default function InventoryItemRow({item}: Props) {

  return <>
    <tr className="alternate-primary tracking-none leading-none">
      <td className="px-[0.5em] pr-[0.5em] pt-[0.4em] w-[2.5em] text-right text-[0.8em] opacity-50 py-[0.32em]">{item.system.quantity > 1 ? item.system.quantity : ''}</td>
      <td className=" py-[0.32em] small-caps">{item.name}</td>
      <td className=" py-[0.32em] w-[5em] text-right" >
        {item.system.quantity === 1 ?
          <>{item.system.weight} lb.</>
          : <>{item.system.weight * item.system.quantity} lb. <span className="text-[0.8em] opacity-50"><br/>{item.system.weight} lb.</span></>
        }
      </td>
      <td className=" py-[0.32em] w-[8em] text-right pr-[1em]">
        {item.system.quantity === 1 ?
          <FormattedPrice price={item.system.price} />
          : <><FormattedPrice price={item.system.price * item.system.quantity} /> <span className="text-[0.8em] opacity-50"><br/><FormattedPrice price={item.system.price} /></span></>
        }
      </td>
    </tr>
  </>
}
