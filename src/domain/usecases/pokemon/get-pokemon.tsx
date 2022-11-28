import { PokemonResponseModel } from '@/domain/models/pokemon'

export interface GetPokemon {
  get: () => Promise<GetPokemon.Model>
}

export namespace GetPokemon {
  export type Model = PokemonResponseModel
}
