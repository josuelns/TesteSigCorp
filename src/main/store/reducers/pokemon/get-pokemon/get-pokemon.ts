import { GetPokemon } from '@/domain/usecases/pokemon'
import * as types from '@/main/store/types'

export interface GetPokemonState {
  loading: boolean
  error: string
}

const initialState: GetPokemonState = {
  loading: false,
  error: ''
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const GetPokemonReducer = (
  state = initialState,
  action: {
    type: string
    payload: GetPokemon.Model
  }
) => {
  switch (action.type) {
    case types.GET_POKEMON_REQUEST:
      return {
        ...state,
        loading: true,
        params: action.payload,
        error: ''
      }
    case types.GET_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        params: action.payload,
        error: ''
      }
    case types.GET_POKEMON_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default: return state
  }
}
