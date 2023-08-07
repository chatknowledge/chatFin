import React, { useContext } from 'react'
import './index.css'
import { GlobalContext } from '../globalContext'

const Index = () => {
    const gctx = useContext(GlobalContext)
    const [pageIndex, setpageIndex] = gctx.pageIndex
    return (
        <div className="cpnt_header">
            <div className="logo">logo</div>
            <div className="tabbar">
                <div className="tab" onClick={() => setpageIndex(0)}>
                    chat
                </div>
                <div className="tab" onClick={() => setpageIndex(1)}>
                    pdf
                </div>
            </div>
            <div className="space" style={{ flex: 1 }}></div>
            <div className="login">login</div>
        </div>
    )
}

export default Index
