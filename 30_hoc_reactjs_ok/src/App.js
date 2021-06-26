import React, { Fragment } from 'react'
import Header from './components/Header'
import Todos from './components/Todos'
import './App.css'

const App = () => {
  return (
    <Fragment>
      <Header />
      <Todos />
    </Fragment>
  )
}

export default App
