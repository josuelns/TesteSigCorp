import {
  GetPokemon
} from '@/domain/usecases/pokemon'

export interface ApiClient<T> {
  getClient: () => Promise<T | undefined>
  getPokemon: () => Promise<GetPokemon.Model>
}
