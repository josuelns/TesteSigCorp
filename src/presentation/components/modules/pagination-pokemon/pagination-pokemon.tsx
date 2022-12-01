import * as React from 'react'
import Container from '@mui/material/Container'
import { useState } from 'react'
import { Grid, TablePagination } from '@mui/material'
import { CardPokemon } from '../card-pokemon'
import { Spinner } from '../../elements/spinner'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, getPokemonRequest, RootState } from '@/main/store'

type Props = {}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const PaginationPokemon: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const [pokemons, setPokemons] = useState([])
  const getPokemonsState = useAppSelector(state => state.getPokemon)
  const { loading } = useAppSelector(state => state.getPokemon)
  const [page, setPage] = React.useState(1)
  const [rowsPerPage, setRowsPerPage] = React.useState(25)
  const [typesSelected, setTypesSelected] = useState([])

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    dispatch(getPokemonRequest({
      current_page: page,
      page_size: rowsPerPage,
      filter_type: typesSelected
    }))
  }, [page,rowsPerPage])

  React.useEffect(() => {
    const data: any = getPokemonsState
    if (data.params.data && data.params.data.length > 0) {
      setPokemons(data.params.data)
    }
    setTypesSelected(getPokemonsState.params.filter_type)
  }, [getPokemonsState])

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
            count={-1}
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
