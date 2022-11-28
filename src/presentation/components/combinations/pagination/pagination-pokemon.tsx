import * as React from 'react'
import Container from '@mui/material/Container'
import { useState } from 'react'
import { Grid, TablePagination } from '@mui/material'
import { CardPokemon } from '../card-pokemon'
import { Spinner } from '../../elements/spinner'

type Props = {
  list: any[]
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
    if (props.list) {
      setPokemons(props.list)
    }
    console.log('ta aqui cego',props.list)
    setLoading(false)
  }, [props.list])

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
