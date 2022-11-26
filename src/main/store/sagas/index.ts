import { all } from 'redux-saga/effects'

import { getPokemonSaga } from './pokemon/get-pokemon'

export default function * rootSaga (): Generator<any> {
  return yield all([
    getPokemonSaga
  ])
}
