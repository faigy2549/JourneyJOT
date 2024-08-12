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
alert(response)
    const userId = getCookie('userId');
    alert(userId)
    const user = await getUserById(userId);

    return user; 
  } catch (error) {
    throw error;
  }
};



const Register = async (username,email,profileImage, password, confirmPassword) => {
  try {
    const response = await fetch(`${BASE_URL}/Register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        username,
        email,     
        profileImage,
        password,
        confirmPassword
      ),
      mode: 'cors', 
      credentials: 'include', 
    });

    return response; 
  } catch (error) {
    throw error; 
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