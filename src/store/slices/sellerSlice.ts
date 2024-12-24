import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SellerState {
  companyName: any;
  sellerId: string;
  sellerToken: string;
}

const initialState: SellerState = {
  companyName:'',
  sellerId: '',
  sellerToken:'',
};

const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    setSellerId: (state, action: PayloadAction<string>) => {
      state.sellerId = action.payload;
    },
    clearSellerId: (state) => {
      state.sellerId = '';
    },
  },
});

export const { setSellerId, clearSellerId } = sellerSlice.actions;
export default sellerSlice.reducer;
