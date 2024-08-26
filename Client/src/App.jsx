import React, { useContext } from 'react'
import AppContext from './Context/AppContext'
import axios from 'axios';
import ShowProduct from './component/product/ShowProduct';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import ProductDetails from './component/product/ProductDetails';
import Navbar from './component/Navbar';
const App = () => {
  //const {data}=useContext(AppContext)
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<ShowProduct />}/>
        <Route path='/product/:id' element={<ProductDetails />} />
      </Routes>
    </Router>
  )
}

export default App
