import {createContext, PropsWithChildren, useContext} from "react";


export const  StoreContext = createContext(undefined)

export function useStoreContext(){
    const context = useContext(StoreContext);
    if (context===undefined){
        throw Error('Ops - we do not seem to be inside this provider');
    }
    return context;
}

export function  StoreProvider({children}:PropsWithChildren<any>){
   return (
       <StoreContext.Provider value={undefined}>
           {children}
       </StoreContext.Provider>
   )
}