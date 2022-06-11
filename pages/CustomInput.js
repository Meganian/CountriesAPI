import { useContext, useState, useTransition } from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { AiOutlineSearch } from 'react-icons/ai'
import { ThemeContext } from '../context/ThemeContext'

const CustomInput = ({ onUpdateCountry }) => {
  const [country, setCountry]= useState('')
  const theme = useContext(ThemeContext)
  
  const themeStyle = {
    backgroundColor: theme.isLightTheme ?  'hsl(209, 23%, 22%)':'hsl(0, 0%, 98%)',
    color: theme.isLightTheme ?  'hsl(0, 0%, 100%)' : 'hsl(209, 23%, 22%)',
    borderColor: 'hsl(209, 23%, 22%)',
    textTransform : 'capitalize'
  }

  /* New React18 feature, with useTransition we can set high priority for input text, 
  and low priority code work in the background. We make this for UX */
  const [isPending, startTransition] = useTransition()

  const handleChange= (e)=>{ 
    const value = e.target.value
    setCountry(value)
    startTransition(()=>{
      onUpdateCountry(value)
    }) 
  }
  return ( 
    <>
    <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment" style={themeStyle}>
          Search for a country...
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          value={country}
          onChange={handleChange}
          style={themeStyle}
          startAdornment={
            <InputAdornment position="start">
              <AiOutlineSearch />
            </InputAdornment>
          }
        />
      </FormControl></>
   );
}
 
export default CustomInput;