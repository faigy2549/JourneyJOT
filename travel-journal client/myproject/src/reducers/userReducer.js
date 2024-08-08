import { createReducer } from '@reduxjs/toolkit';
import { setUser } from '../actions';

const initialState = null;

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (state, action) => {
    return action.payload;
  });
});

export default userReducer;