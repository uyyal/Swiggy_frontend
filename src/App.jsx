import React from 'react'
import Landingpage from './vendorDashboard/pages/Landingpage'
import { Routes, Route } from 'react-router-dom'

import "./App.css"
import Navbar from './vendorDashboard/components/Navbar'
import Login from './vendorDashboard/components/forms/Login'
// import NotFound from './vendorDashboard/components/NotFound'

const App = () => {
  return (
    <div>
      <Routes>
          <Route path='/' element = {<Landingpage />}/>
          {/* <Route path='/*' element = {<NotFound />} /> */}
      </Routes>
    </div>
  )
}

export default App