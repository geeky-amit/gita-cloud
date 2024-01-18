import { useState } from 'react'
import CreateProduct from './components/CreateProduct';
import Product from './components/Product';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path={"/createProduct"} element={<CreateProduct />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
