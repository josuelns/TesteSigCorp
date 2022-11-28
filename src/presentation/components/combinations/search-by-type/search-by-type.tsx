import { ButtonGroup, Button } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

export const SearchByType: React.FC = () => {
  const [types, setTypes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // dispatch(loadAppointmentRequest())
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function getData () {
      // const res = await axios.get(
      //   'https://pokeapi.co/api/v2/pokemon?limit=400'
      // )
      // console.log(res)
      // console.log(res.data.count)
      const fetch = await axios.get('https://pokeapi.co/api/v2/type')
      const arr = []
      arr.push(fetch.data.results)
      setTypes(arr[0])
      console.log(arr[0].length)
      setLoading(false)
    }
    getData()
    console.log('pagina carregeada')
  }, [])
  return (
    <>
        {
        !loading && types.length > 0
          ? <ButtonGroup fullWidth orientation='vertical'>
        <Button variant="outlined">All</Button>
        {
            types.map((type, key) => {
              return <Button key={key} variant="outlined">{type.name}</Button>
            })
        }
        </ButtonGroup>
          : null
    }
    </>
  )
}
