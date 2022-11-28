import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  ButtonGroup,
  Button,
  CardActions
} from '@mui/material'
import * as React from 'react'
// todo
import { setPokemonListAdapter, getPokemonListAdapter } from '@/main/adapters'
import { PokemonModel } from '@/domain/models/pokemon'

type Props = {
  pokemon: {
    id: string
    name: string
    types: any[]
    sprites: any
  }
}

export const CardPokemon: React.FC<Props> = ({ pokemon }, props) => {
  const handleView = (): void => {
    console.log('handle view')
  }

  const handleFavorite = (): void => {
    const arr: unknown[] = []
    arr.push(getPokemonListAdapter())
    arr.push(pokemon)
    setPokemonListAdapter(arr as unknown as PokemonModel)
  }
  return (
    <>
      <Grid item xs={12} sm={6} md={4} {...props}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            component="img"
            image={pokemon.sprites.front_default}
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {pokemon.name}
            </Typography>
            <ButtonGroup fullWidth>
              {pokemon.types.map((item, key) => (
                <Button key={key} variant="outlined">
                  {item.type.name}
                </Button>
              ))}
            </ButtonGroup>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleView}>View</Button>
            <Button size="small" onClick={handleFavorite}>🖤</Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}
