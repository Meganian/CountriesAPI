import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CountriesCard = ({ img, name, population, region, capital }) => {
  return ( 
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="220"
          image={img}
          alt={name}
        />
        <CardContent>
          <Box sx={{ m: 2 }}>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2">
              <strong>Population:</strong> {population}
            </Typography>
            <Typography variant="body2">
              <strong>Region:</strong> {region}
            </Typography>
            <Typography variant="body2" gutterBottom component="div">
              <strong>Capital:</strong> {capital}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </> 
  );
}
 
export default CountriesCard;