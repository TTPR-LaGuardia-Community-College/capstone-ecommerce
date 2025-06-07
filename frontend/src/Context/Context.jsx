import { createContext, useState } from "react";

export const Context = createContext()

const ContextProvider = ({ children }) => {

    const [cart, setCart ] = useState([])

    return (
        <Context.Provider value={{cart, setCart}} >
            {children}
        </Context.Provider>
    )
}
export default ContextProvider