import React, { useEffect } from 'react'

// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
// import { AppDispatch, RootState } from '@/main/store'
// import { ListAppointmentState } from '@/main/store/reducers/list-appointments'

// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// const useAppDispatch = () => useDispatch<AppDispatch>()

const PokemonDetailPage: React.FC = () => {
  // const dispatch = useAppDispatch()
  // const appointmentsState: DetailAppointmentState = useAppSelector(state => state.DetailAppointments as DetailAppointmentState)

  useEffect(() => {
    // dispatch(loadAppointmentRequest())
    console.log('pagina carregeada')
  }, [])

  return (
    <>
      <h1>hellow word- page poke details</h1>
    </>
  )
}

export default PokemonDetailPage
