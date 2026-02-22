"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface TabContextType {
    selectedTab: string;
    setSelectedTab: ( tab: string ) => void;
}

const TabContext = createContext<TabContextType | undefined>( undefined );

export const TabProvider = ( { children }: { children: ReactNode } ) => {
    const [ selectedTab, setSelectedTab ] = useState( "Groups" );

    return (
        <TabContext.Provider value={ { selectedTab, setSelectedTab } }>
            { children }
        </TabContext.Provider>
    );
};

export const useTab = () => {
    const context = useContext( TabContext );
    if ( !context ) throw new Error( "useTab must be used within TabProvider" );
    return context;
};