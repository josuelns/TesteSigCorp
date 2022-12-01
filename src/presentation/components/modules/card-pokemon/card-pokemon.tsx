import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  ButtonGroup,
  Button,
  CardActions,
  Box,
  Modal
} from '@mui/material'
import * as React from 'react'

import { setPokemonListAdapter, getPokemonListAdapter } from '@/main/adapters'

import { PokemonModel } from '@/domain/models/pokemon'

type Props = {
  pokemon: PokemonModel
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

export const CardPokemon: React.FC<Props> = ({ pokemon }, props) => {
  const [favorite, setFavorite] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [modal, setmodal] = React.useState(false)
  const handleView = (): void => {
    setmodal(!modal)
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
      arr.push(...data, pokemon)
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
        ? (
        <Grid item xs={12} sm={6} md={4} {...props}>
          <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <CardMedia component="img" image={pokemon.picture} alt="random" />
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
              <Button size="small" onClick={handleView}>
                View
              </Button>
              {favorite
                ? (
                <Button size="small" onClick={handleRemoveFavorite}>
                  💖
                </Button>
                  )
                : null}
              {!favorite
                ? (
                <Button size="small" onClick={handleFavorite}>
                  🖤
                </Button>
                  )
                : null}
            </CardActions>
          </Card>
          <Modal
            open={modal}
            onClose={() => { handleView() }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx = { style }
          >
            <Box>
              <CardMedia component="img" image={pokemon.picture} alt="random" />
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {pokemon.name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
        </Grid>
          )
        : null}
    </>
  )
}
