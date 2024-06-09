import React, {useEffect} from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {auth} from '../components/firebase/firebase';
import { doSignOut } from './firebase/auth';


export default function Header() {
  const [enableMenu, setEnableMenu] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => {
    setEnableMenu(!enableMenu);
  };
  useEffect(() => {
    // Перевірка стану авторизації користувача після завантаження компонента
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser); // Якщо користувач авторизований, зберігаємо його дані в стані
      } else {
        setUser(null); // Якщо користувач не авторизований, обнуляємо дані стану
      }
      console.log(authUser)
    });
  }, []);
  return (
    <nav>
      <div className="logo">
        Art<span>Works</span>
      </div>
      <ul className={enableMenu ? 'active' : ''}>
        <li>
          <Link to="/">ГОЛОВНА</Link>
        </li>
        <li>
          <Link to="/artworks">ГАЛЕРЕЯ</Link>
        </li>
        <li><Link to="/reference">РЕФЕРЕНСИ</Link></li>
        <li><Link to="/about">ПРО МЕНЕ</Link></li>
      </ul>
      <div className='menu-logout'>
      {user && <button className="button-31" onClick={doSignOut}>Logout</button>}
        <div
          className={enableMenu ? 'menuTrigger open' : 'menuTrigger'}
          onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}
