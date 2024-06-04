import { createContext, useState, useContext } from "react";


export const CreateThemeContext = createContext("");

export const ThemeContextProvider = ({children}) => {
    const [lightTheme,setLightTheme] = useState(true);
   
    return (
        <CreateThemeContext.Provider value = {{lightTheme,setLightTheme}}>{children}</CreateThemeContext.Provider>
    )
}

export const useThemeContext = () => {
   return useContext(CreateThemeContext);
}



