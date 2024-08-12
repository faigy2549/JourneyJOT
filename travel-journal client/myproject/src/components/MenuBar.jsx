import React, { useState, useRef } from 'react';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { LoginDialog } from './LoginDialog';
import { RegisterDialog } from './RegisterDialog';
import '../style sheets/HomePage.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions';
import { useNavigate } from "react-router-dom";

const MenuBar = () => {
  const [isRegisterDialogVisible, setIsRegisterDialogVisible] = useState(false);
  const [isLoginDialogVisible, setIsLoginDialogVisible] = useState(false);
  const user = useSelector((state) => state.user);
  const menu = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDialogHide = () => {
    setIsRegisterDialogVisible(false);
    setIsLoginDialogVisible(false);
  };

  const handleRegisterClick = () => {
    setIsRegisterDialogVisible(true);
  };

  const handleLoginClick = () => {
    setIsLoginDialogVisible(true);
  };

  const handleAvatarClick = (event) => {
    menu.current.toggle(event)
  };

  const handleMenuClick = (event) => {
    // Implement menu click handling
  };

  const handleLogoutClick = () => {
    dispatch(setUser(null));
    document.cookie.split(';').forEach((cookie) => {
      const [name] = cookie.split('=');
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
    navigate("/homePage");
  }

  const handleLoggedIn = () => {
    handleDialogHide();
    navigate("/tripsview");
  };

  const items = [
    {
      label: `Hi ${user?.userName || 'Guest'}`,
      items: !user ? [
        {
          label: 'Login',
          icon: 'pi pi-sign-in',
          command: () => handleLoginClick()
        },
        {
          label: 'Sign Up',
          icon: 'pi pi-sign-in',
          command: () => handleRegisterClick()
        }
      ] : [
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => handleLogoutClick()
        }
      ]
    }
  ];

  return (
    <>
      <LoginDialog
        isLoginDialogVisible={isLoginDialogVisible}
        handleDialogHide={handleDialogHide}
        handleLoggedIn={handleLoggedIn}
      />
      <RegisterDialog
        isRegisterDialogVisible={isRegisterDialogVisible}
        handleDialogHide={handleDialogHide}
        handleLoggedIn={handleLoggedIn}
      />
      <div className="menu-bar">
        <img src="https://localhost:44393/assets/logo1.png" alt="Logo" className="menu-logo" />
        <div className="profile-container">
          {!user?.userName?(<Avatar
            icon="pi pi-user"
            size="normal"
            shape="circle"
            className="profile-icon"
            onClick={handleAvatarClick}
          />):
          (<Avatar 
          image={`https://localhost:44393/profile/${user.profileImage}`} 
          size="normal" 
          shape="circle"
          className="profile-icon"
          onClick={handleAvatarClick} 
          />)}
          <Menu
            model={items}
            popup
            ref={menu}
            onClick={handleMenuClick}
          />
        </div>
      </div>
    </>
  );
};

export default MenuBar;
