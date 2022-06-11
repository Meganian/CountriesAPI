import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ThemeContext } from '../context/ThemeContext'

const CustomSelect = ({ onUpdateRegion }) => {
  const [region, setRegion] = useState('');
  const theme = useContext(ThemeContext)
  
  const themeStyle = {
    backgroundColor: theme.isLightTheme ?  'hsl(209, 23%, 22%)':'hsl(0, 0%, 98%)',
    color: theme.isLightTheme ?  'hsl(0, 0%, 100%)' : 'hsl(209, 23%, 22%)',
    borderColor: 'hsl(209, 23%, 22%)',
    textTransform : 'capitalize'
  }

  const handleChange = (e) => { 
    const value = e.target.value      
    setRegion(value)   
    onUpdateRegion(value,'region'); 
  };

  
  return ( 
    <>
    <Box sx={{ minWidth: '220px' }}>
      <FormControl fullWidth>
        <InputLabel id="region-select-label" style={themeStyle}>Region</InputLabel>
        <Select
          labelId="region-select-label"
          id="region-select"
          value={region}
          label="Region"
          style={themeStyle}
          onChange={handleChange}
        >
          <MenuItem value='Africa'>Africa</MenuItem>
          <MenuItem value='America'>America</MenuItem>
          <MenuItem value='Asia'>Asia</MenuItem>
          <MenuItem value='Europe'>Europe</MenuItem>
          <MenuItem value='Oceania'>Oceania</MenuItem>        
        </Select>
      </FormControl>
    </Box>
    </> 
  );
}
 
export default CustomSelect;