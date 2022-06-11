import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CustomSelect = ({ onUpdateRegion }) => {
  const [region, setRegion] = useState('');

  const handleChange = (e) => { 
    const value = e.target.value      
    setRegion(value)   
    onUpdateRegion(value,'region'); 
  };

  
  return ( 
    <>
    <Box sx={{ minWidth: '220px' }}>
      <FormControl fullWidth>
        <InputLabel id="region-select-label">Region</InputLabel>
        <Select
          labelId="region-select-label"
          id="region-select"
          value={region}
          label="Region"
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