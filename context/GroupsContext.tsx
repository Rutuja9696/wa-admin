"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Group {
    id: string;
    name: string;
    members: number;
    last_active: string;
    created_at: string;
}

interface GroupsContextType {
    groups: Group[];
    setGroups: ( groups: Group[] ) => void;
}

const GroupsContext = createContext<GroupsContextType | undefined>( undefined );

export const GroupsProvider = ( {
    children,
    initialGroups,
}: {
    children: ReactNode;
    initialGroups: Group[];
} ) => {
    const [ groups, setGroups ] = useState<Group[]>( initialGroups );

    return (
        <GroupsContext.Provider value={ { groups, setGroups } }>
            { children }
        </GroupsContext.Provider>
    );
};

export const useGroups = () => {
    const context = useContext( GroupsContext );
    if ( !context ) throw new Error( "useGroups must be used inside GroupsProvider" );
    return context;
};