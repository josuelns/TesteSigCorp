import { PaginationModel } from '@/domain/models/pagination'
import { PokemonResponseModel } from '@/domain/models/pokemon'

export interface GetPokemon {
  get: (params: GetPokemon.Params) => Promise<GetPokemon.Model>
}

export namespace GetPokemon {
  export type Params = Partial<PaginationModel>

  export type Model = (PokemonResponseModel & PaginationModel)
}
