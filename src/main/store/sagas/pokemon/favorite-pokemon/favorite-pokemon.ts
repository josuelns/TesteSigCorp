import { all, call, put, takeLatest } from '@redux-saga/core/effects'
import { FavoritePokemon } from '@/domain/usecases/pokemon'
import { favoritePokemonFailure, favoritePokemonSuccess } from '@/main/store/actions/pokemon'
import * as types from '@/main/store/types/pokemon'
import {
  makeRemoteGetPokemon
} from '@/main/factories/usecases/pokemon'

let response: FavoritePokemon.Model

const favoritePokemonRequest = async (params: FavoritePokemon.Params): Promise<FavoritePokemon.Model> => {
  const GetPokemon = makeRemoteGetPokemon
  let data: any
  try {
    data = await GetPokemon.get({ ...params })
    response = data
    return data
  } catch (error) {
    console.log(error)
    return response
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function * favoritePokemonData (action: { type: string, payload: FavoritePokemon.Params }) {
  try {
    yield call(favoritePokemonRequest, action.payload)
    yield put(favoritePokemonSuccess(response))
  } catch (error) {
    yield put(favoritePokemonFailure(response))
  }
}

export const favoritePokemonSaga = all([takeLatest(types.FAVORITE_POKEMON_REQUEST, favoritePokemonData)])
