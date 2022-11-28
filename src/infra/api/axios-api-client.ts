import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { ApiClient } from '@/data/protocols/api'
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

  async getPokemon (): Promise<PokemonResponseModel> {
    console.log('hora do trampo')
    const dataFetch = async (): Promise<PokemonResponseModel> => {
      const instance = await this.getClient()
      let axiosResponse: AxiosResponse
      const error: Error[] = []
      let arrFilter = []
      try {
        console.log('to na meta')
        const pokemonsFetch = await instance.get('pokemon?limit=99999')

        const arr = []
        for (let i = 0; i < 200; i++) {
          const fetch = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonsFetch.data.results[i].name as string}`)
          arr.push(fetch.data)
        }
        console.log('axios cliente', arr)
        arrFilter = arr.filter((pokemonArr) => {
          if (pokemonArr.types[0]?.type.name === 'grass' && pokemonArr.types[1]?.type.name === 'poison') {
            return true
          }
          if (pokemonArr.types[1]?.type.name === 'grass' && pokemonArr.types[0]?.type.name === 'poison') {
            return true
          }
          if (pokemonArr.types[0]?.type.name === 'grass' || pokemonArr.types[1]?.type.name === 'poison') {
            return true
          } else {
            return false
          }
        })
      } catch (error) {
        axiosResponse = error.response
        error.push(error)
        console.log('axios error',error)
      }
      console.log('axios cliente 2', arrFilter)
      return {
        data: arrFilter as PokemonModel[],
        statusCode: axiosResponse.status as HttpStatusCode,
        error: error
      }
    }

    return dataFetch()
  }
}
