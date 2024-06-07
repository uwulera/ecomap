import React from 'react'
import './Footer.css'
import { NavLink } from 'react-router-dom'
function Footer() {
  return (
    <div className='container'>
        <div className='box_div-header'>
            <div className='div_img_logo'>

                <img src="../img/ic_sharp-eco.png" className='logo_img' alt="" />
                <NavLink className='logo_text' href=''>EcoMap Кузбасс</NavLink>
                <NavLink className='im'>pochta@mail.com</NavLink>
            </div>
           

        </div>
    </div>
  )
}

export default Footer
