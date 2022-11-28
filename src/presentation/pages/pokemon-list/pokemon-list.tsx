import React, { useEffect } from 'react'

import { LayoutMain } from '@/presentation/layout/layout-main'
import { Footer } from '@/presentation/components/combinations/footer'
import { Navbar } from '@/presentation/components/combinations/navbar/navbar'
import { SearchByType } from '@/presentation/components/combinations/search-by-type'
import { PaginationPokemon } from '@/presentation/components/combinations/pagination'

type Props = {
  getPokemon: () => void
  getPokemonState: any
}

const PokemonListPage: React.FC<Props> = ({ getPokemon, getPokemonState }) => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const Search = () => {
    return <SearchByType />
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const Content = () => {
    return <PaginationPokemon name='oi' />
  }

  useEffect(() => {
    const fetch = getPokemon()
    console.log('valor',fetch)
    console.log('valor2', getPokemonState)
  }, [])

  return (
    <>
      <LayoutMain
        Header={Navbar}
        Search={Search}
        Content={Content}
        Footer={Footer}
      />
    </>
  )
}

export default PokemonListPage
