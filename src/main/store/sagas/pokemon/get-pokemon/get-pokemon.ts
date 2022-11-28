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
    console.log('cheguei')
    data = await GetPokemon.get()
    console.log('teste', data)
    response = data
    return response
  } catch (error) {
    console.log(error)
    return response
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function * getPokemonData (action: { type: string }) {
  try {
    const teste = yield call(getPokemonRequest)
    console.log('generation fn',teste)
    const teste2 = yield put(getPokemonSuccess(response))

    console.log('generation fn2', teste2)
  } catch (error) {
    yield put(getPokemonFailure(response))
  }
  console.log('saga', response)
}

export const getPokemonSaga = all([takeLatest(types.GET_POKEMON_REQUEST, getPokemonData)])
