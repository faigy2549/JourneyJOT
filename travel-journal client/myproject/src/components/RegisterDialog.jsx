import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { Register, Login } from '../Services/AuthenticationService';
import { setUser } from '../actions';

const RegisterDialog = ({ isRegisterDialogVisible, handleDialogHide, handleLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const usernamePattern = /^[A-Za-z]+$/; 
        if (!usernamePattern.test(username)) {
            setErrorMessage('Username must contain only English letters.');
            return;
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordPattern.test(password)) {
            setErrorMessage('Password must contain at least 8 characters, including uppercase, lowercase, number, and special symbol.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        setLoading(true); 
        let profileImage = "profile.jpg";
        try {
            const registrationResponse = await Register({ username, email, profileImage, password, confirmPassword });
            if (registrationResponse.ok) {
                const user = await Login(username, password);
                if (user) {
                    dispatch(setUser(user));
                    handleLoggedIn();
                    setErrorMessage(''); 
                } else {
                    throw new Error('Automatic login failed');
                }
            } else {
                const responseData = await registrationResponse.json();
                const detailedMessage = responseData['']?.[0] || 'Registration failed. Please try again.';
                setErrorMessage(detailedMessage);            }
        } catch (error) {
            setErrorMessage(error.message||'Registration failed. Please try again.');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <Dialog header="Register" visible={isRegisterDialogVisible} onHide={handleDialogHide} style={{ width: '50vw' }}>
            <form onSubmit={handleSubmit}>
                <div className="p-field p-grid">
                    <label htmlFor="username" className="p-col-fixed p-text-label">Username:</label>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText type="text" id="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                </div>
                <br />
                <div className="p-field p-grid">
                    <label htmlFor="email" className="p-col-fixed p-text-label">Email:</label>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-at"></i>
                        </span>
                        <InputText type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <br />
                <div className="p-field p-grid">
                    <label htmlFor="password" className="p-col-fixed p-text-label">Password:</label>
                    <div className="p-col">
                        <Password value={password} required toggleMask feedback={true} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <br />
                <div className="p-field p-grid">
                    <label htmlFor="confirmPassword" className="p-col-fixed p-text-label">Confirm Password:</label>
                    <div className="p-col">
                        <Password id="confirmPassword" required toggleMask feedback={false} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                </div>
                <br />
                {errorMessage && (
                    <div className="p-error p-grid p-col-12" style={{ textAlign: 'center' }}>
                        {errorMessage}
                    </div>
                )}
                <Button
                    type="submit"
                    label={loading ? "Registering..." : "Register"}
                    className="p-col-offset-4 p-col-4"
                    style={{ width: '250px' }}
                    disabled={loading} 
                />
            </form>
            <div style={{ fontSize: '0.8rem', textAlign: 'center' }}>
                <p>By signing up, you agree to JourneyJOT</p>
                <p>
                    <a href="#terms">Terms and Conditions</a> and <a href="#privacy">Privacy Policy.</a>
                </p>
            </div>
        </Dialog>
    );
};

export { RegisterDialog };
