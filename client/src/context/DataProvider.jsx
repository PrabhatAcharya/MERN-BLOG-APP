import { createContext,useState } from "react";

export const DataContext = createContext(null);
const DataProvider=({children})=>{
    const [account,setAccountContext]=useState({username:'',name:''})
    return (
        <DataContext.Provider value={{
            account,
            setAccountContext,
        }}>
        {children}
        </DataContext.Provider>
    )
}
export default DataProvider;
