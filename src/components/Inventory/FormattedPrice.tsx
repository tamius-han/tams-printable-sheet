import React from 'react';
import './FormattedPrice.css';

export default function FormattedPrice({price}: {price: number}) {

  const gp = Math.floor(price);
  const sp = Math.floor(( (price - gp) * 10) % 10);
  let cp = ( ((price * 10) - sp) * 10) % 100;

  // round if fraction is too insignificant
  if (gp && sp) {
    cp = Math.round(cp);
  }

  return <>
    {gp ? <span className="text-coin-gp shadow-1 txt-shadow">{gp} gp</span> : ''} {sp ? <span className="text-coin-sp">{sp} sp</span> : ''} {cp ? <span className="text-coin-cp">{cp} cp</span> : ''}
  </>
}
