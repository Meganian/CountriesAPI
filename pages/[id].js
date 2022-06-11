import Image from 'next/image'
import { useContext } from 'react';
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'
import { fetchData } from '../helpers/fetchData'
import { ThemeContext } from '../context/ThemeContext'

export const getStaticPaths = async () => {

  //const data = await fetchData('https://restcountries.com/v3.1/all')
  const res = await fetch('https://restcountries.com/v3.1/all')
  const data = await res.json()
  
  const paths = data.map(ctr => {
    return {
      params: { id: ctr.name.common.toString() }
    }
  })

  return{
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id;

  const data = await fetchData(`https://restcountries.com/v3.1/name/${id}`)

  let codes = await data[0].borders?.map(borderCoun => borderCoun).join()

  const resc = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codes}`)
  const dataCodes = await resc.json()

  let mergedData = {...data, dataCodes }

  return {
    props: { country: {...data, dataCodes } }
  }
}

const CountryDetails = ({ country }) => {
  const router = useRouter()
  const theme = useContext(ThemeContext)

  const themeStyle = {
    backgroundColor: theme.isLightTheme ?  'hsl(209, 23%, 22%)':'hsl(0, 0%, 98%)',
    color: theme.isLightTheme ?  'hsl(0, 0%, 100%)' : 'hsl(209, 23%, 22%)',
    borderColor: 'hsl(209, 23%, 22%)',
    textTransform : 'capitalize',
    fontSize: '0.6325rem'

  }
  console.log('theme from details', country)

  const img = country[0] && country[0].cca2.toLowerCase()  

  const language = country[0].currencies && Object.keys(country[0].languages)
              .map((v,idx) =>  v + ', ')
  const cur = country[0].currencies && Object.keys(country[0].currencies).map( val => <span key={uuidv4()}>{val.name}</span> )


  return ( 
    <Box >
      <Box sx={{ margin: '44px 0 34px'}}>
        <Button 
          variant="outlined" 
          startIcon={<MdOutlineKeyboardBackspace />}
          style={themeStyle}
          onClick={() => router.back()}
          >    
          Back
        </Button>  
      </Box>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box sx={{ width:'100%', height: 300 }} >
          <div style={{width: '100%', height: '100%', position: 'relative'}}>
            <Image
              alt="Mountains"
              src={`https://flagcdn.com/w320/${img}.png`}
              quality={100}
              layout='fill'
              objectFit='contain'
            />
          </div>
        </Box>
        <Box>
          <Box sx={{ width:'100%', p:2  }}> 
            <Typography gutterBottom variant="h4" component="div">
              {country[0].name.common}
            </Typography>
          </Box>
          <Stack direction={{ xs: 'column', md: 'row' }}>
            <Box sx={{ width:'100%', p:2  }}>                   
              <Typography variant="body2">
                <strong>Native Name:</strong> {country[0].name.common}
              </Typography>
              <Typography variant="body2">
                <strong>Population:</strong> {country[0].population.toLocaleString('En-en')}
              </Typography>
              <Typography variant="body2">
                <strong>Region:</strong> {country[0].region}
              </Typography>
              <Typography variant="body2">
                <strong>Sub Region:</strong> {country[0].subregion}
              </Typography>
              <Typography variant="body2">
                <strong>Capital:</strong> {country[0].capital}
              </Typography>           
            </Box>
            <Box sx={{ width:'100%', p:2 }}>
              <Typography variant="body2">
                <strong>Top Level Domain:</strong> {country[0].tld}
              </Typography>
              <Typography variant="body2">
                <strong>Currencies:</strong> {cur}               
              </Typography>
              <Typography variant="body2">
                <strong>Languages:</strong> {language}
              </Typography>
            </Box>       
          </Stack>
          <Box sx={{ p:2  }}>
            <Typography gutterBottom variant="body2" component="span" sx={{ pr:2  }}>
              Border Countries:
            </Typography>
            {country[0].borders && country.dataCodes.map(border => {
              const name = border.name.common
              return (
                <Button 
                  key={border.fifa}
                  variant="outlined" 
                  size="small"
                  sx={{marginRight:1, marginBottom:'2px' }}
                  onClick={() => router.push(`/${name}`)}
                  style={themeStyle}
                  >    
                  {name}
                </Button> )
            })}
          </Box>
        </Box>
      </Stack>
    </Box>
   );
}
 
export default CountryDetails;