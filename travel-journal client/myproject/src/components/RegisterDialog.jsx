
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password'
import { Dialog } from 'primereact/dialog'; 
import { Register } from '../Services/AuthenticationService';
const RegisterDialog = ({isRegisterDialogVisible,handleDialogHide}) => {
    const [value, setValue] = useState('');
    return(
    <Dialog header="Register" visible={isRegisterDialogVisible} onHide={handleDialogHide} style={{ width: '50vw' }}>
      <form onSubmit={Register}>
 
        <div className="p-field p-grid">
          <label htmlFor="username" className="p-col-fixed p-text-label">Username:</label>
          <div className="p-inputgroup flex-1">
    <span className="p-inputgroup-addon">
        <i className="pi pi-user"></i>
    </span>
    <InputText type="text" id="username" required />
</div>
        </div>
        <br></br>
        <div className="p-field p-grid">
          <label htmlFor="email" className="p-col-fixed p-text-label">Email:</label>
          <div className="p-inputgroup flex-1">
    <span className="p-inputgroup-addon">
        <i className="pi pi-at"></i>
    </span>
    <InputText type="email" id="username" required />
</div>
        </div>
        <br></br>
        <div className="p-field p-grid">
          <label htmlFor="password" className="p-col-fixed p-text-label">Password:</label>
          <div className="p-col">
          <Password  value={value} required toggleMask feedback={true} onChange={(e) => setValue(e.target.value)}
                promptLabel="Choose a password" weakLabel="Too simple" mediumLabel="Average complexity" strongLabel="Complex password"/>
          </div>
        </div>
        <br></br>
        <div className="p-field p-grid">
          <label htmlFor="confirmPassword" className="p-col-fixed p-text-label">Confirm Password:</label>
          <div className="p-col">
            <Password id="confirmPassword" required toggleMask feedback={true} />
          </div>
        </div>
        <br></br>
        <Button type="submit" label="Register" className="p-col-offset-4 p-col-4" style={{width:'250px'}} />
      </form>
      <div style={{ fontSize: '0.8rem', textAlign: 'center' }}>
        <p>By signing up, you agree to JourneyJOT</p>
        <p>
          <a>Terms and Conditions</a> and <a>Privacy Policy.</a>
        </p>
      </div>
    </Dialog>)
};
  export {RegisterDialog};
