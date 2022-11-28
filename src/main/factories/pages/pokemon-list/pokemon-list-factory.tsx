import React, { useEffect } from 'react'
import { PokemonList } from '@/presentation/pages/pokemon-list'
import { RootState, AppDispatch, getPokemonRequest } from '@/main/store'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const MakePokemonList: React.FC = () => {
  const dispatch = useAppDispatch()
  const getPokemonsState = useAppSelector(state => state.getPokemon)

  useEffect(() => {
    const teste = dispatch(getPokemonRequest())
    console.log(teste)
  }, [])

  return (
    <PokemonList
      getPokemon={() => dispatch(getPokemonRequest()) }
      getPokemonState={getPokemonsState}
    />
  )
}
