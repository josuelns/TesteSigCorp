import { ButtonGroup, Button } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, getPokemonRequest, RootState } from '@/main/store'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const SearchByType: React.FC = () => {
  const dispatch = useAppDispatch()
  const getPokemonsState = useAppSelector(state => state.getPokemon)
  const [types, setTypes] = useState([])
  const [typesSelected, setTypesSelected] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = React.useState(1)
  const [rowsPerPage, setRowsPerPage] = React.useState(25)

  useEffect(() => {
    setLoading(true)
    async function getData (): Promise<void> {
      const fetch = await axios.get('https://pokeapi.co/api/v2/type')
      const arr = []
      arr.push(fetch.data.results)
      setTypes(arr[0])
      setLoading(false)
    }
    getData()
  }, [])

  const handleSelectType = (type: string): void => {
    if (typesSelected.length === 2) {
      setTypesSelected([])
      const arr = []
      arr.push(type)
      setTypesSelected(arr)
    } else {
      const arr = []
      if (typesSelected[0] === undefined) {
        arr.push(type)
      } else {
        arr.push(type)
        arr.push(typesSelected[0])
      }
      setTypesSelected(arr)
    }
  }

  const cleanSearch = (): void => {
    dispatch(getPokemonRequest({
      filter_type: [],
      current_page: 1,
      page_size: rowsPerPage
    }))
    setTypesSelected([])
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    dispatch(getPokemonRequest({
      filter_type: typesSelected,
      current_page: page,
      page_size: rowsPerPage
    }))
  }, [typesSelected])

  useEffect(() => {
    setPage(getPokemonsState.params.current_page)
    setRowsPerPage(getPokemonsState.params.page_size)
  }, [getPokemonsState])

  return (
    <>
        {
        !loading && types.length > 0
          ? <ButtonGroup fullWidth orientation='vertical'>
        <Button variant={typesSelected.length === 0 ? 'contained' : 'outlined'} onClick={() => { cleanSearch() }}>All</Button>
        {
            types.map((type, key) => {
              return <Button key={key} variant={typesSelected.includes(type.name) ? 'contained' : 'outlined'} onClick={() => { handleSelectType(type.name) }}>{type.name}</Button>
            })
        }
        </ButtonGroup>
          : null
    }
    </>
  )
}
