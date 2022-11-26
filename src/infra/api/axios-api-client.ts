import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { ApiClient } from '@/data/protocols/api'
import {
  GetPokemon
} from '@/domain/usecases/pokemon'
import { PokemonResponseModel } from '@/domain/models/pokemon'
import { PokemonModel } from '@/data/models/pokemon'
import { HttpStatusCode } from '@/data/protocols/http-response'

export class AxiosApiClient implements ApiClient<AxiosInstance> {
  async getClient (): Promise<AxiosInstance> {
    try {
      const instance = axios.create({
        baseURL: 'https://pokeapi.co/api/v2/',
        timeout: 1000
      })
      return instance
    } catch (error) {
      console.log(error)
    }
  }

  async getPokemon (params: GetPokemon.Params): Promise<PokemonResponseModel> {
    console.log(params)
    const dataFetch = async (): Promise<PokemonResponseModel> => {
      const instance = await this.getClient()
      let axiosResponse: AxiosResponse
      const error: Error[] = []
      try {
        axiosResponse = await instance.get('pokemon')
      } catch (error) {
        axiosResponse = error.response
        error.push(error)
      }
      return {
        data: axiosResponse.data as PokemonModel[],
        statusCode: axiosResponse.status as HttpStatusCode,
        error: error
      }
    }

    return dataFetch()
  }
}
