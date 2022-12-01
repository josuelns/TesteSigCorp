import { GetPokemon } from '@/domain/usecases/pokemon'
import * as types from '@/main/store/types'

export function getPokemonRequest (params: GetPokemon.Params): {
  type: string
  payload: GetPokemon.Params
} {
  return {
    type: types.GET_POKEMON_REQUEST,
    payload: params
  }
}
export function getPokemonSuccess (response: GetPokemon.Model): {
  type: string
  payload: GetPokemon.Model
} {
  return {
    type: types.GET_POKEMON_SUCCESS,
    payload: response
  }
}
export function getPokemonFailure (response: GetPokemon.Model): {
  type: string
  payload: GetPokemon.Model
} {
  return {
    type: types.GET_POKEMON_FAILURE,
    payload: response
  }
}
