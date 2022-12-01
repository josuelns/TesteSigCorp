import { combineReducers } from 'redux'
import { GetPokemonReducer } from './pokemon/get-pokemon'
import { favoritePokemonReducer } from './pokemon/favorite-pokemon'

const rootReducer = combineReducers({
  getPokemon: GetPokemonReducer,
  favoritePokemon: favoritePokemonReducer
})

export default rootReducer
