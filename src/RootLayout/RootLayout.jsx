import React from 'react'
import Header from '../components/Header/Header'
import {Outlet} from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}

export default RootLayout