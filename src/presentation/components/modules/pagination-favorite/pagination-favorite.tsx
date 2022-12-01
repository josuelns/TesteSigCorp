import * as React from 'react'
import Container from '@mui/material/Container'
import { useState } from 'react'
import { Grid } from '@mui/material'
import { CardPokemon } from '../card-pokemon'
import { Spinner } from '../../elements/spinner'

import { getPokemonListAdapter } from '@/main/adapters'
type Props = {}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// const useAppDispatch = () => useDispatch<AppDispatch>()
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const PaginationFavorite: React.FC<Props> = (props) => {
  // const dispatch = useAppDispatch()
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(false)
  // const getPokemonsState = useAppSelector(state => state.getPokemon)
  // const { loading } = useAppSelector(state => state.getPokemon)
  // const [page, setPage] = React.useState(1)
  // const [rowsPerPage, setRowsPerPage] = React.useState(25)
  // const [typesSelected, setTypesSelected] = useState([])

  React.useEffect(() => {
    setLoading(true)
    const data: any = getPokemonListAdapter()
    if (data) {
      setPokemons(data)
    }
    setLoading(false)
  }, [getPokemonListAdapter()])

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // const handleChangePage = (
  //   event: React.MouseEvent<HTMLButtonElement> | null,
  //   newPage: number
  // ) => {
  //   setPage(newPage)
  // }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10))
  //   setPage(0)
  // }

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
      {/* <Container sx={{ py: 4 }} maxWidth="md">
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
      </Container> */}
    </>
  )
}
