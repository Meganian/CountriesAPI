import { useContext } from 'react';
import Navbar from './Navbar'
import Container from '@mui/material/Container';
import { ThemeContext } from '../context/ThemeContext'


const Layout = ({ children }) => {
  const theme = useContext(ThemeContext)

  const toggleTheme = () => {
    theme.setIsLightTheme((prevLightTheme) => !prevLightTheme)
  }
 
  const themeStyle = {
    backgroundColor: theme.isLightTheme ? 'hsl(207, 26%, 17%)' : 'hsl(0, 0%, 98%)',
    color: theme.isLightTheme ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)',    
  }
  
  return ( 
    <div style={themeStyle}>
      <Navbar toggleTheme={toggleTheme} mode={theme.isLightTheme}/>
      <main>
        <Container maxWidth="lg">
          {children}
        </Container>
      </main>
    </div> 
  );
}
 
export default Layout;

