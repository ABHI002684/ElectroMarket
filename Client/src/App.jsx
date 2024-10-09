import React, { useContext } from 'react'
import AppContext from './Context/AppContext'
import axios from 'axios';
import ShowProduct from './component/product/ShowProduct';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import ProductDetails from './component/product/ProductDetails';
import Navbar from './component/Navbar';
import SearchProduct from './component/product/SearchProduct';
import Register from './component/user/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './component/user/Login';
import Profile from './component/user/Profile';
import Cart from './component/Cart';
import Address from './component/Address';
import Checkout from './component/Checkout';
import OrderConfirmation from './component/OrderConfirmation';

const App = () => {
  //const {data}=useContext(AppContext)
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<ShowProduct />}/>
        <Route path='/product/search/:term' element={<SearchProduct />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/shipping' element={<Address />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/orderconfirmation' element={<OrderConfirmation />} />
      </Routes>
    </Router>
  )
}

export default App
