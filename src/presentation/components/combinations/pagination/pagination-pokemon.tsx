import * as React from 'react'
import Container from '@mui/material/Container'
import { useState } from 'react'
import { Grid, TablePagination } from '@mui/material'
import axios from 'axios'
import { CardPokemon } from '../card-pokemon'
import { Spinner } from '../../elements/spinner'

type Props = {
  name: string
}

export const PaginationPokemon: React.FC<Props> = (props) => {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = React.useState(1)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  React.useEffect(() => {
    setLoading(true)
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function getData () {
      const pokemonsFetch = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=99999')

      console.log(pokemonsFetch)
      const arr = []
      for (let i = 0; i < 200; i++) {
        const fetch = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonsFetch.data.results[i].name as string}`)
        arr.push(fetch.data)
      }
      const arrFilter = arr.filter((pokemonArr) => {
        console.log('arr',pokemonArr.types[0].type.name)

        if (pokemonArr.types[0]?.type.name === 'grass' && pokemonArr.types[1]?.type.name === 'poison') {
          return true
        }
        if (pokemonArr.types[1]?.type.name === 'grass' && pokemonArr.types[0]?.type.name === 'poison') {
          return true
        }
        if (pokemonArr.types[0]?.type.name === 'grass' || pokemonArr.types[1]?.type.name === 'poison') {
          return true
        } else {
          return false
        }
      })
      setPokemons(arrFilter)
      console.log(arrFilter)
      setLoading(false)
    }
    getData()
  }, [])

  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="md">
        {!loading
          ? (
          <Grid container columnSpacing={4} rowSpacing={4}>
            {pokemons.map((card) => (
              <CardPokemon key={card.id} pokemon={card} />
            ))}
          </Grid>
            )
          : <Spinner />}
      </Container>
      <Container sx={{ py: 4 }} maxWidth="md">
        {!loading && pokemons.length > 0
          ? (
          <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
            )
          : null}
      </Container>
    </>
  )
}
