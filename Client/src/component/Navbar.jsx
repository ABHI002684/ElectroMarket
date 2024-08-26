import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
    <div className="nav sticky-top">
      <div className="nav_bar ">
        <Link to={'/'} className="left" style={{textDecoration:'none',color:'white'}}>
          <h3>ElectroMarket</h3>
        </Link>
        <div className="search_bar">
        <span class="material-symbols-outlined">
search
</span>
          <input type="text" placeholder='Search Products ...'/>
        </div>
        <div className="right">
          <button className="btn btn-warning mx-3">Cart</button>
          <button className="btn btn-warning mx-3">Profile</button>
          <button className="btn btn-warning mx-3">Login</button>
          <button className="btn btn-warning mx-3">Register</button>
          <button className="btn btn-warning mx-3">Logout</button>
        </div>
      </div>
      <div className="sub_bar"></div>
    </div>
    </>
  )
}

export default Navbar
