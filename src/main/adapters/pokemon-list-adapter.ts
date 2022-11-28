import { makeLocalStorageAdapter } from '@/main/factories/cache'
import { PokemonModel } from '@/domain/models/pokemon'

export const setPokemonListAdapter = (pokemons: PokemonModel[]): void => {
  makeLocalStorageAdapter().set('pokemons', pokemons)
}

export const getPokemonListAdapter = (): PokemonModel[] => {
  return makeLocalStorageAdapter().get('pokemons')
}
