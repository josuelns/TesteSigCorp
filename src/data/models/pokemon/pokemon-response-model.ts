import { PokemonModel } from './pokemon-model'
import { HttpStatusCode } from '@/data/protocols/http-response'

export type PokemonResponseModel = {
  data: PokemonModel[]
  statusCode: HttpStatusCode
  error: Error[]
}
