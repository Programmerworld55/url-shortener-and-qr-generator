// import { useState } from 'react'

// import HomePage from "./components/home"
import { Route, Routes } from "react-router-dom"
// import NavbarComponent from "./components/navbar"
import Layout from "./components/layout"
import HomePage from "./components/home"
import Qrcode from "./components/qrcode"
import AboutPage from "./components/qrcode"


function App() {
  

  return (
    <>
   <Routes>
    <Route path="/" element={<Layout/>}>
    <Route path="/home" element={<HomePage/>}></Route>
    <Route path="/qrcode" element={<Qrcode/>}></Route>
    <Route path="/about" element={<AboutPage/>}></Route>

    </Route>
  </Routes>
    </>
  )
}

export default App
