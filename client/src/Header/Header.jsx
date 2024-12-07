import React, { useState } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import Input from '../Input/Input';

function Header() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const openFormModal = () => {
      setIsFormOpen(true);
    };
  
    const closeFormModal = () => {
      setIsFormOpen(false);
    };

    return (
        <div>
      {isFormOpen && 
      <Input closeFormModal={closeFormModal} />
      }
            <div className='container'>
                <div className='box_div-header'>
                    <div className='div_img_logo'>

                        <img src="../img/ic_sharp-eco.png" className='logo_img' alt="" />

                        <NavLink to={'/'} className='logo_text' href=''>EcoMap Кузбасс</NavLink>
                    </div>
                    <ul className="burger-list">
                        <li className="burger-list-item"><NavLink to={'/about'} className="burger-link">О нас</NavLink></li>
                        <li className="burger-list-item"><NavLink to={'/'} className="burger-link">Главная</NavLink></li>
                        <li className="burger-list-item"><NavLink to={'/recommendation'} href="" className="burger-link">Рекомендации</NavLink></li>
                        <li className="burger-list-item"><NavLink to={'/sensor'} href="" className="burger-link">Подключить датчик</NavLink></li>
                    </ul>
                    <div>
                        <button className='contact_us' onClick={openFormModal}>
                            Связаться с нами
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Header
