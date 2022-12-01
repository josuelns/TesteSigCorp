import { ApiClient } from '@/data/protocols/api'
import { FavoritePokemon } from '@/domain/usecases/pokemon'

export class RemoteFavoritePokemon implements FavoritePokemon {
  constructor (
    private readonly ApiClient: ApiClient<unknown>
  ) {}

  async get (params: FavoritePokemon.Params): Promise<FavoritePokemon.Model> {
    return await this.ApiClient.getPokemon(params)
  }
}
