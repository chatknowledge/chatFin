import React, { useState, useContext } from 'react'
import './index.css'
import { GlobalContext } from '../globalContext'

import backgroundUpSVG from '../../assets/background-up.svg';
import backgroundBottomSVG from '../../assets/background-bottom.svg';

const Index = props => {
  const gctx = useContext(GlobalContext)
  const [pageIndex, setpageIndex] = gctx.pageIndex
  return (
  <div className="cpnt_pages">
    <img className="background-up-image" src={ backgroundUpSVG } />
    <img className="background-bottom-image" src={ backgroundBottomSVG } />
    {props.children[pageIndex] || ''}
  </div>
  );
}

export default Index
