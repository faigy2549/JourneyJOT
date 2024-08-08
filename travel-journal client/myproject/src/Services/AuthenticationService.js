import React from 'react';
import { getCookie } from '../utils';
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
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const userId = getCookie('userId');
    const user = await getUserById(userId);

    return user; 
  } catch (error) {
    throw error;
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

export const getUserById = async (userId) => {
  try {
    const response = await fetch('https://localhost:44393/api/User/'+userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors', 
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
};

export { Login, Register };