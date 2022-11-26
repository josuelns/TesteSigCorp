import { GetPokemon } from '@/domain/usecases/pokemon'
import { RemoteGetPokemon } from '@/data/usecases/pokemon'
import { makeAxiosInstanceClient } from '@/main/factories/api'

export const makeRemoteGetPokemon: GetPokemon = new RemoteGetPokemon(makeAxiosInstanceClient)
