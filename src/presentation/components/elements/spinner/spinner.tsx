import * as React from 'react'
import Container from '@mui/material/Container'
import { CircularProgress } from '@mui/material'

type Props = {}

export const Spinner: React.FC<Props> = (props) => {
  return (
    <>
      <Container sx={{ py: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }} maxWidth="md" {...props}>
        <CircularProgress />
      </Container>
    </>
  )
}
