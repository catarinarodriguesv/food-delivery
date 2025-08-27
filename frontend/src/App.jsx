import React, { useState } from 'react'
import Navbar from './components/navbar/navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin?<LoginPopUp setShowLogin={setShowLogin}></LoginPopUp>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}></Navbar>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/order" element={<PlaceOrder/>}/>
        </Routes>
      </div>
      <Footer></Footer>
    </>
  )
}

export default App
