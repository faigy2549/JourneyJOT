import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { Login } from '../Services/AuthenticationService';
import { setUser } from '../actions';

const LoginDialog = ({ isLoginDialogVisible, handleDialogHide, handleLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 
    try {
      const user = await Login(username, password);
      if (user) {
        dispatch(setUser(user));
        handleLoggedIn();
        setErrorMessage(''); // Clear error message on successful login
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your username and password.');
    } finally {
      setLoading(false); 
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
        {errorMessage && (
          <div className="p-error p-grid p-col-12" style={{ textAlign: 'center' }}>
            {errorMessage}
          </div>
        )}
        <br />
        <Button
          type="submit"
          label={loading ? "Logging in..." : "Login"}
          className="p-col-offset-4 p-col-4"
          style={{ width: '250px' }}
          disabled={loading} 
        />
      </form>
      <div style={{ fontSize: '0.8rem', textAlign: 'center' }}>
        <p>By signing in, you agree to JourneyJOT</p>
        <p>
          <a href="#terms">Terms and Conditions</a> and <a href="#privacy">Privacy Policy.</a>
        </p>
      </div>
    </Dialog>
  );
};

export { LoginDialog };
