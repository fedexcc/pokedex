import axios from 'axios';
import '../App.css';
import { useEffect, useState } from 'react';
import { Container, Paper, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';




function Card() {

    const [pokemon, setPokemon] = useState([])

    const useStyles = makeStyles(theme => ({
        paper: {
            width: 240
        },
        div: {
            padding: 20,
            display: 'flex',
            alignItems: 'center'
        },
        logo: {
            height: 60,
            marginLeft: 30,
            marginRight: 'auto'
        },
        footer: {
            bottom: 0,
            position: 'fixed',
            width: '100%'
        },
        card: {
            maxWidth: 350,
            background: 'linear-gradient(45deg, #AE64F3 20%, #0C00FF 90%)'
        },
        imagePoke: {
            height: 250
        }
    }))

    const classes = useStyles()

    const loadData = async () => {
        await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')
        .then(async res => {
          for (let i=0; i < res.data.results.length; i++){
            await axios.get(res.data.results[i].url)
            .then(results => {
              setPokemon(prevArray => [...prevArray, results.data])
            })
          }
        })
      }

    useEffect(() => {
        loadData()
    }, [])


    return (
            <Container maxWidth='false' component={Paper} elevattion={4} className={classes.container}>
			<Grid container spacing={2}>
            {pokemon.map((pkmn, index) => ( 
                <Grid key={index} item xs={12} sm={2}>
                <div key={index} style={{display: 'flex', justifyContent: 'center', backgroundImage: 'url(http://www.pngmart.com/files/2/Pokeball-PNG-Image.png)', backgroundSize: '250px 250px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', padding: 5, border: '5px solid black', flexWrap: 'wrap', borderRadius: '50%', width: "60%"}}>
                    <h1 style={{textTransform: 'uppercase', background: 'black', color: 'white', position: 'absolute', marginTop: 165, fontSize: 17}}>{pkmn.name}</h1>
                    <img src={pkmn?.sprites?.other["official-artwork"]?.front_default} style={{width: 182}}/>
                </div>
                </Grid>
            ))}
            </Grid></Container>
    );
}

export default Card;
