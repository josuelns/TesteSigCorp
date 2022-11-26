import React from 'react'
import { MakePokemonList, MakePokemonDetail, MakePokemonFavorite } from '@/main/factories/pages'

import { BrowserRouter, Route as Switch, Route } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Routes = () => {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={MakePokemonList} />
            <Route path="/detail" exact component={MakePokemonDetail} />
            <Route path="/favorite" exact component={MakePokemonFavorite} />
        </Switch>
    </BrowserRouter>
  )
}
