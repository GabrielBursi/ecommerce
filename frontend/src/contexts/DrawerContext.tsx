import { createContext, useState, useCallback } from "react";
import { ChildrenProp } from "../types";

interface DrawerContextData {
    isDrawerOpen: boolean,
    toggleDrawer: () => void,
    drawerOptions: DrawerOptions[],
    toggleDrawerOptions: (newDrawerOptions: DrawerOptions[]) => void
}

interface DrawerOptions {
    icon: string,
    path: string,
    label: string
}

const DrawerContext = createContext({} as DrawerContextData)

function DrawerContextProvider({ children }: ChildrenProp) {

    const [isDrawerOpen, setOpenDrawer] = useState(false);
    const [drawerOptions, setDrawerOptions] = useState<DrawerOptions[]>([]);

    const toggleDrawer = useCallback(() => {
        setOpenDrawer(oldDrawer => !oldDrawer);
    }, [])

    const toggleDrawerOptions = useCallback((newDrawerOptions: DrawerOptions[]) => {
        setDrawerOptions(newDrawerOptions);
    }, [])

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawer, drawerOptions, toggleDrawerOptions }}>
            {children}
        </DrawerContext.Provider>
    );
}

export {
    DrawerContext,
    DrawerContextProvider
}