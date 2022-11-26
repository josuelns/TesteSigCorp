import { PokemonModel } from '@/data/models/pokemon'
import { PokemonResponseModel } from '@/domain/models/pokemon'

export interface GetPokemon {
  get: (params: GetPokemon.Params) => Promise<GetPokemon.Model>
}

export namespace GetPokemon {
  export type Params = Partial<PokemonModel>
  export type Model = PokemonResponseModel
}
