import { ApiClient } from '@/data/protocols/api'
import { GetPokemon } from '@/domain/usecases/pokemon'

export class RemoteGetPokemon implements GetPokemon {
  constructor (
    private readonly ApiClient: ApiClient<unknown>
  ) {}

  async get (params: GetPokemon.Params): Promise<GetPokemon.Model> {
    return await this.ApiClient.getPokemon(params)
  }
}
