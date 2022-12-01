import { FavoritePokemon } from '@/domain/usecases/pokemon'
import * as types from '@/main/store/types'

export function favoritePokemonRequest (params: FavoritePokemon.Params): {
  type: string
  payload: FavoritePokemon.Params
} {
  return {
    type: types.FAVORITE_POKEMON_REQUEST,
    payload: params
  }
}
export function favoritePokemonSuccess (response: FavoritePokemon.Model): {
  type: string
  payload: FavoritePokemon.Model
} {
  return {
    type: types.FAVORITE_POKEMON_SUCCESS,
    payload: response
  }
}
export function favoritePokemonFailure (response: FavoritePokemon.Model): {
  type: string
  payload: FavoritePokemon.Model
} {
  return {
    type: types.FAVORITE_POKEMON_FAILURE,
    payload: response
  }
}
