import { combineReducers } from 'redux'
import { GetPokemonReducer } from './pokemon/get-pokemon'

const rootReducer = combineReducers({
  getPokemon: GetPokemonReducer
})

export default rootReducer
