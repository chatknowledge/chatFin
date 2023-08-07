import React, { useState, useContext } from 'react'
import './index.css'
import { GlobalContext } from '../globalContext'

const Index = props => {
    const gctx = useContext(GlobalContext)
    const [pageIndex, setpageIndex] = gctx.pageIndex
    return <div className="cpnt_pages">{props.children[pageIndex] || ''}</div>
}

export default Index
