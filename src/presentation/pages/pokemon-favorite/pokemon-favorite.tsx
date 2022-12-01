import React from 'react'

import { LayoutMain } from '@/presentation/layout/layout-main'
import { Footer } from '@/presentation/components/combinations/footer'
import { Navbar } from '@/presentation/components/combinations/navbar/navbar'
import { SearchByType } from '@/presentation/components/combinations/search-by-type'
import { PaginationFavorite } from '@/presentation/components/modules/pagination-favorite'

const PokemonFavoritePage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // const Search = () => {
  //   return <SearchByType />
  // }
  // // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // const Content = () => {
  //   // return <PaginationPokemon name='oi' />
  //   return <>oi</>
  // }

  return (
    <>
      <LayoutMain
        Header={Navbar}
        Search={SearchByType}
        Content={PaginationFavorite}
        Footer={Footer}
      />
    </>
  )
}

export default PokemonFavoritePage
