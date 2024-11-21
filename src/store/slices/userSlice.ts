import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: any;
  _id: string;
  name: string;
  email: string;
  isSeller: boolean;
  role: string;
  profileImage?: string | null;
}

const initialState: UserState = {
  _id: '',
  name: '',
  email: '',
  role: '',
  isSeller: false,
  user: undefined
};
interface SetUserPayload {
  _id: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string | null;
  isSeller:boolean
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SetUserPayload>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isSeller = action.payload.isSeller
      state.profileImage = action.payload.profileImage ?? null
    },
    setSeller: (state, action: PayloadAction<boolean>) => {
      state.isSeller = action.payload;
    },
    userLogOut: (state) => {
      state._id = '';
      state.name = '';
      state.email = '';
      state.role = '';
      state.profileImage = null; 
      state.isSeller = false
    },
  },
});

export const { setUser, userLogOut, setSeller } = userSlice.actions;
export default userSlice.reducer;
