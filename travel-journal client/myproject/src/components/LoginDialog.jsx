import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password'
import { Dialog } from 'primereact/dialog'; 
import { Login } from '../Services/AuthenticationService';

const LoginDialog = ({ isLoginDialogVisible, handleDialogHide }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Login(username, password);
      if (response) {
        console.log("logged in", response);
        handleDialogHide()
        // login successful, handle login logic here
      } else {
        console.log("log failed", response)
        throw new Error('Login failed');
      }
    } catch (error) {
      throw error; // Re-throw the error for handling in the component
    }
  };

  return (
    <Dialog header="Login" visible={isLoginDialogVisible} onHide={handleDialogHide} style={{ width: '30vw' }}>
      <form onSubmit={handleSubmit}>
        <div className="p-field p-grid">
          <label htmlFor="username" className="p-col-fixed p-text-label">Username:</label>
          <div className="p-col">
            <InputText type="text" id="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
        </div>
        <br />
        <div className="p-field p-grid">
          <label htmlFor="password" className="p-col-fixed p-text-label">Password:</label>
          <div className="p-col">
            <Password required toggleMask feedback={false} tabIndex={1} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <br />
        <Button type="submit" label="Login" className="p-col-offset-4 p-col-4" style={{ width: '250px' } } />
      </form>
      <div style={{ fontSize: '0.8rem', textAlign: 'center' }}>
        <p>By signing in, you agree to JourneyJOT</p>
        <p>
          <a>Terms and Conditions</a> and <a>Privacy Policy.</a>
        </p>
      </div>
    </Dialog>
  );
};
export {LoginDialog} ;