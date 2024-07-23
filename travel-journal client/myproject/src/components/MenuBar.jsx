import React, { useState, useRef } from 'react';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import {LoginDialog} from './LoginDialog'
import {RegisterDialog} from './RegisterDialog'
import './style sheets/HomePage.css';
import { useIsAuthenticated } from './hooks/useIsAuthenticated';


const MenuBar = () => {
  const [isRegisterDialogVisible, setIsRegisterDialogVisible] = useState(false);
  const [isLoginDialogVisible, setIsLoginDialogVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const menu = useRef(null);

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
    console.log('Menu clicked');
  };

  const items = [
    {
      label: 'Hi User',
      items: !isAuthenticated ? [
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
          command: () => { /* handle logout */ }
        }
      ]
    }
  ];

  return (
    <>
      <LoginDialog
        isLoginDialogVisible={isLoginDialogVisible}
        handleDialogHide={handleDialogHide}
      />
      <RegisterDialog
        isRegisterDialogVisible={isRegisterDialogVisible}
        handleDialogHide={handleDialogHide}
      />
      <div className="menu-bar">
        <img src="https://localhost:44393/assets/logo1.png" alt="Logo" className="menu-logo" />
        <div className="profile-container">
          <Avatar
            icon="pi pi-user"
            size="normal"
            shape="circle"
            className="profile-icon"
            onClick={handleAvatarClick}
          />
          <Menu
            model={items}
            popup 
            ref={menu} 
            //id="popup_menu_left"
            onClick={handleMenuClick}
          />
        </div>
      </div>
    </>
  );
};

export default MenuBar;