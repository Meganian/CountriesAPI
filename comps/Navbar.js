import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { BsMoon } from 'react-icons/bs'
import { IoIosSunny } from 'react-icons/io'


const Navbar = ({toggleTheme, mode}) => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Where in the world?
          </Typography>
          <Button 
            color="inherit" 
            style={{ textTransform : "capitalize" }}
            onClick={toggleTheme}>
            {mode
            ? <IoIosSunny style={{ fontSize: "12px" , marginRight: "10px" }}/>
            : <BsMoon style={{ fontSize: "12px" , marginRight: "10px" }}/>
            }           
            {mode ? 'Light mode' : 'Dark mode'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>  
  )
}
 
export default Navbar;