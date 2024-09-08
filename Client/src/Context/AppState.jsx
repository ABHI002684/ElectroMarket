import React, { useEffect, useState } from 'react';
import AppContext from './AppContext';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppState = (props) => {


  const url = "http://localhost:1000/api";

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "content-type": "Application/json"
        },
        withCredentials: true
      })

      console.log(api.data.products);
      setProducts(api.data.products);
      setFilteredData(api.data.products);
      userProfile();
    }
    fetchProduct();
    userCart();
  }, [token,reload]);

  useEffect(() => {
    const lstoken=localStorage.getItem('token');
    // console.log('token is',lstoken);
    if(lstoken){
      // console.log('token found');
      setToken(lstoken);
      setIsAuthenticated(true);
    }
    
    // setToken(localStorage.getItem('token'))
  }, [])
  
  //register user
  const register = async (name, email, password) => {
    const api = await axios.post(`${url}/user/register`, {
      name, email, password
    }
      , {
        header: {
          "content-type": "Application/json"
        },
        withCredentials: true
      })
    // alert(api.data.message);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    // console.log("user register ",api);
    return api.data;
  }

  //login user
  const login = async (email, password) => {
    const api = await axios.post(`${url}/user/login`, {
      email, password
    }
      , {
        header: {
          "content-type": "Application/json"
        },
        withCredentials: true
      })
    // alert(api.data.message);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    // console.log("user login ",api.data);
    setToken(api.data.token);
    setIsAuthenticated(true);
    localStorage.setItem('token',api.data.token);
    return api.data;
  }

  //logout user
  const logout=()=>{
    setIsAuthenticated(false);
    setToken(" ");
    localStorage.removeItem('token');
    toast.success("log out successfully...!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  }

  // user profile
  const userProfile = async () => {
      const api = await axios.get(`${url}/user/profile`, {
        headers: {
          "content-type": "Application/json",
          "Auth":token
        },
        withCredentials: true
      })

      // console.log('user profile',api.data.user);
      setUser(api.data.user);
    }
    
  // add to cart
  const addToCart = async (productId,title,price,qty,imgSrc) => {
    const api = await axios.post(`${url}/cart/add`,
      {productId,title,price,qty,imgSrc},
      {
      headers: {
        "content-type": "Application/json",
        "Auth":token
      },
      withCredentials: true
    });
    setReload(!reload);
    console.log("my cart",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  //user cart
  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`,
      {
      headers: {
        "content-type": "Application/json",
        Auth:token
      },
      withCredentials: true
    })
    
    console.log("user cart",api.data.cart);
    setCart(api.data.cart);
    
  }
  return <AppContext.Provider value={{ products, register, login, url, token,setToken, isAuthenticated, setIsAuthenticated,filteredData, setFilteredData,logout,user,addToCart,cart}}>{props.children}<ToastContainer /></AppContext.Provider>;
}

export default AppState;
