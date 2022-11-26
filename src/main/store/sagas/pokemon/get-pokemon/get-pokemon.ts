import { all, call, put, takeLatest } from '@redux-saga/core/effects'
import { GetPokemon } from '@/domain/usecases/pokemon'
import { getPokemonFailure, getPokemonSuccess } from '@/main/store/actions/pokemon'
import * as types from '@/main/store/types/pokemon'
import {
  makeRemoteGetPokemon
} from '@/main/factories/usecases/pokemon'

let response: GetPokemon.Model

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getPokemonRequest = async (params: GetPokemon.Params) => {
  const GetPokemon = makeRemoteGetPokemon

  try {
    const data = await GetPokemon.get({ ...params })
    response = data
    return data
  } catch (error) {
    console.log(error)
    return response
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function * getPokemonData (action: { type: string, payload: GetPokemon.Params }) {
  try {
    yield call(getPokemonRequest, action.payload)
    yield put(getPokemonSuccess(response))
  } catch (error) {
    yield put(getPokemonFailure(response))
  }
}

export const getPokemonSaga = all([takeLatest(types.GET_POKEMON_REQUEST, getPokemonData)])
