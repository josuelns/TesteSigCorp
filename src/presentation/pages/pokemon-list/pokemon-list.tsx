import React, { useEffect } from 'react'

// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
// import { AppDispatch, RootState } from '@/main/store'
// import { ListAppointmentState } from '@/main/store/reducers/list-appointments'

// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// const useAppDispatch = () => useDispatch<AppDispatch>()

const PokemonListPage: React.FC = () => {
  // const dispatch = useAppDispatch()
  // const appointmentsState: ListAppointmentState = useAppSelector(state => state.ListAppointments as ListAppointmentState)

  useEffect(() => {
    // dispatch(loadAppointmentRequest())
    console.log('pagina carregeada')
  }, [])

  return (
    <>
      <h1>hellow word</h1>
    </>
  )
}

export default PokemonListPage
