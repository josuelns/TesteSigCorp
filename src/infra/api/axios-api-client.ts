import axios, { AxiosInstance } from 'axios'
import { ApiClient } from '@/data/protocols/api'
import { GetPokemon } from '@/domain/usecases/pokemon'
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

  async getPokemon (params: GetPokemon.Params): Promise<GetPokemon.Model> {
    const dataFetch = async (): Promise<GetPokemon.Model> => {
      const instance = await this.getClient()

      let axiosResponse = HttpStatusCode.ok
      const errorLog: Error[] = []

      const pokemons: PokemonModel[] = []

      const pageSize = params.page_size ? params.page_size : 20
      const currentPage = params.current_page ? params.current_page : 1
      const firstPageIndex = (currentPage - 1) * pageSize
      const lastPageIndex = firstPageIndex + pageSize

      const filterType: string[] = params.filter_type ? params.filter_type : []
      const filterName: string = params.filter_name ? params.filter_name : ''

      console.log('params', params)

      if (filterName.length <= 0) {
        if (filterType.length === 0) {
          try {
            const pokemonsFetch = await instance.get(`pokemon?limit=${pageSize}&offset=${firstPageIndex}`)

            for (let i = 0; i < pokemonsFetch.data.results.length; i++) {
              const fetch = await instance.get(`pokemon/${pokemonsFetch.data.results[i].name as string}`)
              pokemons.push({
                id: fetch.data.id,
                name: fetch.data.name,
                picture: fetch.data.sprites.front_default,
                types: fetch.data.types
              })
            }
          } catch (error) {
            axiosResponse = HttpStatusCode.serverError
            errorLog.push(error)
          }
        } else {
          const pokemonsFetchA = await instance.get(`type/${filterType[0]}`)
          const dataA = pokemonsFetchA.data.pokemon
          let arr = []

          if (filterType.length === 2 && filterType[1] !== '') {
            const pokemonsFetchB = await instance.get(`type/${filterType[1]}`)
            const dataB = pokemonsFetchB.data.pokemon

            for (let i = 0; i < dataA.length; i++) {
              for (let j = 0; j < dataB.length; j++) {
                if (dataA[i].pokemon.name === dataB[j].pokemon.name) {
                  await instance.get(`pokemon/${dataA[i].pokemon.name as string}`).then((response) => {
                    arr.push(response.data)
                  })
                }
              }
            }
          } else {
            for (let i = 0; i < dataA.length; i++) {
              await instance.get(`pokemon/${dataA[i].pokemon.name as string}`).then((response) => {
                arr.push(response.data)
              })
            }
          }

          arr = arr.slice(firstPageIndex, lastPageIndex)

          arr.forEach((pokemon) => {
            pokemons.push({
              id: pokemon.id,
              name: pokemon.name,
              picture: pokemon.sprites.front_default,
              types: pokemon.types
            })
          })
        }
      } else {
        const fetch = await instance.get(`pokemon/${filterName}`)
        pokemons.push({
          id: fetch.data.id,
          name: fetch.data.name,
          picture: fetch.data.sprites.front_default,
          types: fetch.data.types
        })
      }

      console.log('devo retornar',pokemons)

      return {
        data: pokemons,
        statusCode: axiosResponse,
        error: errorLog,
        current_page: currentPage,
        filter_name: filterName,
        filter_type: filterType,
        page_size: pageSize
      }
    }

    return dataFetch()
  }
}
