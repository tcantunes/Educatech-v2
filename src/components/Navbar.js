import React, { useState, useEffect, useRef } from 'react';
import { FaUser } from 'react-icons/fa'; 
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>EDUCATECH</div>
      <div style={styles.buttonContainer}>
        {isLoggedIn ? (
          <div style={styles.userContainer} ref={menuRef}>
            <FaUser style={styles.userIcon} onClick={toggleMenu} />
            {isMenuOpen && (
              <div style={styles.userMenu}>
                <p onClick={() => navigate('/meu-perfil')} style={styles.menuItem}>
                  Meu Perfil
                </p>
                <p onClick={handleLogout} style={styles.menuItem}>
                  Sair
                </p>
              </div>
            )}
          </div>
        ) : (
          <Button text="Nos Contate" />
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    width: '100%',
    height: '75px',
    backgroundColor: '#F4D19B',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: '0',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4C3327',
    marginLeft: '10px',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '20px',
  },
  userContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  userIcon: {
    fontSize: '24px',
    color: '#4C3327',
  },
  userMenu: {
    position: 'absolute',
    top: '40px',
    right: '0',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1,
  },
  menuItem: {
    padding: '8px 0',
    cursor: 'pointer',
    color: '#333',
    textAlign: 'center',
    fontSize: '14px',
    width: '100px',
  },
};

export default Navbar;
