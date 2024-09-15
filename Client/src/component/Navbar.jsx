import React, { useState } from 'react'
import { Link, useLocation, useNavigate} from 'react-router-dom';
import AppContext from '../Context/AppContext';
import { useContext } from 'react';
import AppState from '../Context/AppState';
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState(" ");
  const { products, setFilteredData,logout,isAuthenticated,cart} = useContext(AppContext);
  // console.log("user cart= ",cart);
  const navigate=useNavigate();
  const location=useLocation();
  const filterByCategory=(cat)=>{
    setFilteredData(products.filter((data)=>data.category.toLowerCase()===cat.toLowerCase()))
  }
  
  const filterByPrice=(price)=>{
    setFilteredData(products.filter((data)=>parseInt(data.price)>=price));
  }
  const submitHandler=(e)=>{
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm(" ");
  }
  return (
    <>
    <div className="nav sticky-top">
      <div className="nav_bar ">
        <Link to={'/'} className="left" style={{textDecoration:'none',color:'white'}}>
          <h3>ElectroMarket</h3>
        </Link>
        <form className="search_bar" onSubmit={submitHandler}>
        <span classname="material-symbols-outlined">
search
</span>
          <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder='Search Products ...'/>
        </form>
        <div className="right">
          {isAuthenticated && (
            <>
             <Link to={`/cart`} 
             type="button" 
             className="btn btn-primary position-relative mx-3">
           <span class="material-symbols-outlined">
shopping_cart
</span>

            {cart?.items?.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart?.items?.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            )}
          </Link>
          <Link to={'/profile'} className="btn btn-primary mx-3">Profile</Link>
          <button className="btn btn-danger mx-3" onClick={()=>{
            logout();
            navigate('/');
          }}>Logout</button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link to={'/login'} className="btn btn-secondary mx-3">Login</Link>
              <Link to={'/register'} className="btn btn-info mx-3">Register</Link>
            </>
          )}
        
        </div>
      </div>

      {location.pathname=='/' && (
        <div className="sub_bar">
        <div className="items" onClick={()=>filterByCategory(setFilteredData(products))} >No filter</div>
        <div className="items" onClick={()=>filterByCategory("Mobiles")} >Mobiles</div>
        <div className="items" onClick={()=>filterByCategory("Laptops")} >Laptops</div>
        <div className="items" onClick={()=>filterByCategory("Cameras")} >Camera's</div>
        <div className="items" onClick={()=>filterByCategory("Headphones")} >Headphones</div>
        <div className="items" onClick={()=>filterByPrice(15999)} >15999</div>
        <div className="items" onClick={()=>filterByPrice(25999)} >25999</div>
        <div className="items" onClick={()=>filterByPrice(49999)} >49999</div>
        <div className="items" onClick={()=>filterByPrice(69999)} >69999</div>
        <div className="items" onClick={()=>filterByPrice(89999)} >89999</div>
      </div>
      )}
      
    </div>
    </>
  )
}

export default Navbar
