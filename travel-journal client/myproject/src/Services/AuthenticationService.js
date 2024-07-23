import React from 'react';
const BASE_URL = 'https://localhost:44393/api/Authentication'; 

const Login = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      mode: 'cors', 
      credentials: 'include',
      scheme: window.location.protocol,
    });

    if (!response.ok) { // Check if the response is not OK (200)
      throw new Error('Login failed');
    }
    console.log("auth", response);
    return true; 
  } catch (error) {
    throw error; // Re-throw the error for handling in the component
  }
};

const Register = async (username, password, confirmPassword, email) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, confirmPassword, email }),
      mode: 'cors', 
    });

    if (response.status !== 201) { // Check for successful creation (201 Created)
      throw new Error('Registration failed');
    }

    const responseData = await response.json(); // Parse the response data as JSON
    return true; // Or return a success message
  } catch (error) {
    throw error; // Re-throw the error for handling in the component
  }
};

export { Login, Register };