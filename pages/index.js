import { useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import CountriesCard from './CounntriesCard'
import Grid from '@mui/material/Grid'
import CustomSelect from './CustomSelect'
import CustomInput from './CustomInput'
import { fetchData } from '../helpers/fetchData'

export const getStaticProps = async() => {

  const data = await fetchData('https://restcountries.com/v3.1/all')

  return {
    props: {
      countriesData: data
    }
  }
}

export default function Home({ countriesData }) {
  const [countries, setCountries] = useState(countriesData);
  
  const onUpdateCountry = (searchString) => {
    const country = countriesData.filter(country =>{
      return country.name.common.toLowerCase().includes(searchString.toLowerCase())
    })
    setCountries(country)
  }

 const onUpdateRegion = (searchString, comp) => {
    const regio = countriesData.filter(country => {
      return country[comp].toLowerCase().includes(searchString.toLowerCase())
    })
    setCountries(regio)
  }
       
  return (
    <>
      <Head>
          <title>Countries</title>
          <meta name="keywords" content="Countries" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="Countries API" />
      </Head>
      <Grid container spacing={{ xs: 2, md: 3 }} style={{ padding:'24px 0' }}>
        <Grid item xs={12} sm={12} md={6} >
          <CustomInput onUpdateCountry={onUpdateCountry}/>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CustomSelect onUpdateRegion={onUpdateRegion}/>
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 2, md: 3 }} >
        {countries && countries.map(country => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca2}>
            <Link href={'/'+ country.name.common}>
                <a>
                  <CountriesCard 
                  img={country.flags.png} 
                  name={country.name.common}
                  population={country.population.toLocaleString("en-US")}
                  region={country.region}
                  capital={country.capital} />            
                </a>
              </Link>  
          </Grid>

          ))}
      </Grid>
    </>
  )
}
