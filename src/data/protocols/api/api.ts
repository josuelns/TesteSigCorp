import {
  GetPokemon
} from '@/domain/usecases/pokemon'

export interface ApiClient<T> {
  getClient: () => Promise<T | undefined>
  getPokemon: (params: GetPokemon.Params) => Promise<GetPokemon.Model>
}
