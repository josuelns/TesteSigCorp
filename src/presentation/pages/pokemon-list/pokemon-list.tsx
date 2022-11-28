import React, { useEffect, useState } from 'react'

import { LayoutMain } from '@/presentation/layout/layout-main'
import { Footer } from '@/presentation/components/combinations/footer'
import { Navbar } from '@/presentation/components/combinations/navbar/navbar'
import { SearchByType } from '@/presentation/components/combinations/search-by-type'
import { PaginationPokemon } from '@/presentation/components/combinations/pagination'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, getPokemonRequest, RootState } from '@/main/store'

type Props = {}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const PokemonListPage: React.FC<Props> = () => {
  const dispatch = useAppDispatch()
  const [pokemons, setPokemons] = useState([])
  const getPokemonsState = useAppSelector(state => state.getPokemon)
  const { loading } = useAppSelector(state => state.getPokemon)

  useEffect(() => {
    dispatch(getPokemonRequest())
  }, [])

  useEffect(() => {
    const data: any = getPokemonsState
    if (data.params?.data.length > 0) {
      setPokemons(data.params?.data)
    }
  }, [getPokemonsState])

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const Search = () => {
    return <SearchByType />
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const Content = () => {
    return !loading ? <PaginationPokemon list={pokemons} /> : <></>
  }

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
