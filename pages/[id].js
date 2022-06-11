import Image from 'next/image'
import styles from '../styles/CountryDetails.module.css'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'
import { fetchData } from './fetchData'

export const getStaticPaths = async () => {

  const data = await fetchData('https://restcountries.com/v3.1/all')

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

  var handleError = function (err) {
    console.warn(err);
    return new Response(JSON.stringify({
        code: 400,
        message: 'Stupid network Error'
    }));
  };

  const res = await fetch(`https://restcountries.com/v3.1/name/${id}`).catch(error => {
    console.warn(err);
    return new Response(JSON.stringify({
        code: 400,
        message: 'Stupid network Error'
    }));
});
  const data = await res.json()
 
  return {
    props: { country: data }
  }
}

const CountryDetails = ({ country }) => {
  const router = useRouter()
  const img = country[0] && country[0].cca2.toLowerCase()  

    const language = country[0].currencies && Object.keys(country[0].languages)
              .map((v,idx)=> idx+2 == country[0].languages.length ? v : v + ', ')
    const cur = country[0].currencies && Object.keys(country[0].currencies).map( val => <span key={uuidv4()}>{val.name}</span> )




  return ( 
    <>
      <Box>
        <Button 
          variant="outlined" 
          startIcon={<MdOutlineKeyboardBackspace />}
          onClick={() => router.back()}
          >    
          Back
        </Button>  
      </Box>


      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box
          sx={{
            width:'50%',
            height: 300,

          }}
        >
          <div className={styles.flag} style={{width: '100%', height: '100%', position: 'relative'}}>
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
          <Box sx={{ width:'50%', p:2  }}> 
            <Typography gutterBottom variant="h4" component="div">
              {country[0].name.common}
            </Typography>
          </Box>
          <Stack direction={{ xs: 'column', md: 'row' }}>
            <Box sx={{ width:'50%', p:2  }}>                   
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
            <Box sx={{ width:'50%', p:2 }}>
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
            <Typography gutterBottom variant="body2" component="span">
              Border Countries:
            </Typography>
            {country.dataCodes && country.dataCodes.map(border => {
              const name = border.name.common
              return (
                <Button 
                  key={border.fifa}
                  variant="outlined" 
                  size="small"
                  sx={{marginRight:1 }}
                  onClick={() => router.push(`/${name}`)}
                  >    
                  {name}
                </Button> )
            })}
          </Box>
        </Box>
      </Stack>
    </>
   );
}
 
export default CountryDetails;