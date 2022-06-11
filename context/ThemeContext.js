import { createContext, useState } from 'react'
import React from 'react'

export const ThemeContext = createContext();

export const ThemeContextProvider = ({children}) =>{
  const [isLightTheme, setIsLightTheme] = useState(false)
  const [light, setLight] = useState({
    text: 'hsl(200, 15%, 8%)', 
    ui: 'hsl(0, 0%, 100%)', 
    bg: 'hsl(0, 0%, 98%)'})
  const [dark, setDark] = useState({
    text: 'hsl(0, 0%, 100%)', 
    ui: 'hsl(209, 23%, 22%)', 
    bg: 'hsl(207, 26%, 17%)'})

  return(
    <ThemeContext.Provider value={{
      isLightTheme,
      setIsLightTheme,
      light: light,
      dark: dark
    }}>
      {children}
    </ThemeContext.Provider>
  )
}
