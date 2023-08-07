import React, { useState, createContext } from 'react'

export const GlobalContext = createContext()

export const GlobalProvider = props => {
    const [isLogin, setIsLogin] = useState(false)
    const [pageIndex, setpageIndex] = useState(0)
    return (
        <GlobalContext.Provider
            value={{
                isLogin: [isLogin, setIsLogin],
                pageIndex: [pageIndex, setpageIndex]
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    )
}
