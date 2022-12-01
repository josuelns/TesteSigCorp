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

import { setPokemonListAdapter, getPokemonListAdapter } from '@/main/adapters'

import { PokemonModel } from '@/domain/models/pokemon'

type Props = {
  pokemon: PokemonModel
}

export const CardPokemon: React.FC<Props> = ({ pokemon }, props) => {
  const [favorite, setFavorite] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const handleView = (): void => {
    console.log('handle view')
  }

  const handleFavorite = (): void => {
    setLoading(true)
    setFavorite(true)
    const arr: PokemonModel[] = []
    const data = getPokemonListAdapter() ? getPokemonListAdapter() : []

    let check = false

    data.forEach((pokemonData): void => {
      if (pokemonData.id === pokemon.id) check = true
    })

    if (!check) {
      arr.push(...data,pokemon)
      setPokemonListAdapter(arr)
    }
    setLoading(false)
  }

  const handleRemoveFavorite = (): void => {
    setLoading(true)
    setFavorite(false)
    const data = getPokemonListAdapter() ? getPokemonListAdapter() : []

    const arr = data.filter((pokemonFilter) => {
      if (pokemonFilter.id === pokemon.id) return false
      return true
    })

    setPokemonListAdapter(arr)

    setLoading(false)
  }

  React.useEffect(() => {
    setLoading(true)
    const data = getPokemonListAdapter() ? getPokemonListAdapter() : []

    data.forEach((pokemonData): void => {
      if (pokemonData.id === pokemon.id) setFavorite(true)
    })

    setLoading(false)
  }, [])
  return (
    <>
      {!loading
        ? <Grid item xs={12} sm={6} md={4} {...props}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            component="img"
            image={pokemon.picture}
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
            {favorite ? <Button size="small" onClick={handleRemoveFavorite}>💖</Button> : null}
            {!favorite ? <Button size="small" onClick={handleFavorite}>🖤</Button> : null}
          </CardActions>
        </Card>
      </Grid>
        : null}
    </>
  )
}
