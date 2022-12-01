import React from 'react'

import { LayoutMain } from '@/presentation/layout/layout-main'
import { Footer } from '@/presentation/components/combinations/footer'
import { Navbar } from '@/presentation/components/combinations/navbar/navbar'
import { SearchByType } from '@/presentation/components/combinations/search-by-type'
import { PaginationPokemon } from '@/presentation/components/modules/pagination-pokemon'

type Props = {}

const PokemonListPage: React.FC<Props> = () => {
  return (
    <>
      <LayoutMain
        Header={Navbar}
        Search={SearchByType}
        Content={PaginationPokemon}
        Footer={Footer}
      />
    </>
  )
}

export default PokemonListPage
