import React, { useContext } from 'react'
import './index.css'
import { GlobalContext } from '../globalContext'

const Index = () => {
    const gctx = useContext(GlobalContext)
    const [pageIndex, setpageIndex] = gctx.pageIndex
    return (
        <div className="cpnt_header">
            <div className="logo">ChatFinance</div>
            <div className="tabbar">
                <div className={"tab" + (pageIndex === 0 ? " active" : "")} onClick={() => setpageIndex(0)}>
                    对话
                </div>
                <div className={"tab" + (pageIndex === 1 ? " active" : "")} onClick={() => setpageIndex(1)}>
                    研报分析
                </div>
            </div>
            <div className="space" style={{ flex: 1 }}></div>
            <div className="login">登录</div>
        </div>
    )
}

export default Index
