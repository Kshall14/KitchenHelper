// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../components/Types';

interface UserState {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  uid: null,
  email: null,
  displayName: null,
  isLoading: false,
  error: null,
};

// Define the payload type for signUpRequest and signInRequest
interface SignUpRequestPayload {
  email: string;
  password: string;
  displayName: string;
}

interface SignInRequestPayload {
  email: string;
  password: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUpRequest: (state, action: PayloadAction<SignUpRequestPayload>) => {
      state.isLoading = true;
      state.error = null;
    },
    signInRequest: (state, action: PayloadAction<SignInRequestPayload>) => {
      state.isLoading = true;
      state.error = null;
    },
    setUser: (state, action: PayloadAction<{ uid: string; email: string | null; displayName: string | null }>) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.isLoading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

// Export the actions
export const { signUpRequest, signInRequest, setUser, clearUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;