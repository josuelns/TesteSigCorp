import axios, { AxiosInstance } from 'axios'
import { ApiClient } from '@/data/protocols/api'
import { PokemonResponseModel } from '@/domain/models/pokemon'
import { PokemonModel } from '@/data/models/pokemon'
import { HttpStatusCode } from '@/data/protocols/http-response'

export class AxiosApiClient implements ApiClient<AxiosInstance> {
  async getClient (): Promise<AxiosInstance> {
    try {
      const instance = axios.create({
        baseURL: 'https://pokeapi.co/api/v2/',
        timeout: 100000
      })
      return instance
    } catch (error) {
      console.log(error)
    }
  }

  async getPokemon (): Promise<PokemonResponseModel> {
    const dataFetch = async (): Promise<PokemonResponseModel> => {
      const instance = await this.getClient()
      let axiosResponse = HttpStatusCode.ok
      const errorLog: Error[] = []
      let arrFilter = []
      const limit = 100000
      const offset = 0
      const filterType = ['rock']
      try {
        const pokemonsFetch = await instance.get(`pokemon?limit=${limit}&offset=${offset}`)
        console.log('to na meta',pokemonsFetch)

        const arr = []
        for (let i = 0; i < pokemonsFetch.data.results.length; i++) {
          const fetch = await instance.get(`pokemon/${pokemonsFetch.data.results[i].name as string}`)
          console.log(fetch.data)
          arr.push(fetch.data)
        }

        arrFilter = arr.filter((pokemonArr) => {
          if (filterType.length === 0) return true
          if (pokemonArr.types[0]?.type.name === filterType[0] && pokemonArr.types[1]?.type.name === filterType[1]) {
            return true
          }
          if (pokemonArr.types[1]?.type.name === filterType[0] && pokemonArr.types[0]?.type.name === filterType[1]) {
            return true
          }
          if (filterType.length === 1) {
            if (pokemonArr.types[0]?.type.name === filterType[0] || pokemonArr.types[1]?.type.name === filterType[0]) {
              return true
            } else {
              return false
            }
          } else {
            return false
          }
        })
      } catch (error) {
        axiosResponse = HttpStatusCode.serverError
        console.log('aqui a besteira', error)
        errorLog.push(error)
      }

      return {
        data: arrFilter as PokemonModel[],
        statusCode: axiosResponse,
        error: errorLog
      }
    }

    return dataFetch()
  }
}
