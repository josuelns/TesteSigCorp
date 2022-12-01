import { FavoritePokemon } from '@/domain/usecases/pokemon'
import * as types from '@/main/store/types'

export interface FavoritePokemonState {
  params: FavoritePokemon.Params
  loading: boolean
  error: string
}

const initialState: FavoritePokemonState = {
  params: {},
  loading: false,
  error: ''
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const favoritePokemonReducer = (
  state = initialState,
  action: {
    type: string
    payload: FavoritePokemon.Model
  }
) => {
  switch (action.type) {
    case types.FAVORITE_POKEMON_REQUEST:
      return {
        ...state,
        loading: true,
        params: action.payload,
        error: ''
      }
    case types.FAVORITE_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        params: action.payload,
        error: ''
      }
    case types.FAVORITE_POKEMON_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default: return state
  }
}
