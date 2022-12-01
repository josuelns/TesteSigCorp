import { makeLocalStorageAdapter } from '@/main/factories/cache'
import { PokemonModel } from '@/domain/models/pokemon'

export const setPokemonListAdapter = (pokemon: PokemonModel[]): void => {
  makeLocalStorageAdapter().set('pokemons', pokemon)
}

export const getPokemonListAdapter = (): PokemonModel[] => {
  return makeLocalStorageAdapter().get('pokemons')
}
