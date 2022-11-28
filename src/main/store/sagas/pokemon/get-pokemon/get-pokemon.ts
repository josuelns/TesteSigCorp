import { all, call, put, takeLatest } from '@redux-saga/core/effects'
import { GetPokemon } from '@/domain/usecases/pokemon'
import { getPokemonFailure, getPokemonSuccess } from '@/main/store/actions/pokemon'
import * as types from '@/main/store/types/pokemon'
import {
  makeRemoteGetPokemon
} from '@/main/factories/usecases/pokemon'

let response: GetPokemon.Model

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getPokemonRequest = async () => {
  const GetPokemon = makeRemoteGetPokemon
  let data: any
  try {
    data = await GetPokemon.get()
    console.log('saga', data)
    response = data
    return data
  } catch (error) {
    console.log(error)
    return response
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function * getPokemonData () {
  try {
    yield call(getPokemonRequest)
    yield put(getPokemonSuccess(response))
  } catch (error) {
    yield put(getPokemonFailure(response))
  }
}

export const getPokemonSaga = all([takeLatest(types.GET_POKEMON_REQUEST, getPokemonData)])
