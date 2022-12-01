import { PaginationModel } from '@/domain/models/pagination'
import { PokemonResponseModel } from '@/domain/models/pokemon'

export interface FavoritePokemon {
  get: (params: FavoritePokemon.Params) => Promise<FavoritePokemon.Model>
}

export namespace FavoritePokemon {
  export type Params = Partial<PaginationModel>

  export type Model = (PokemonResponseModel & PaginationModel)
}
