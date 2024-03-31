// store.js (Redux store setup)
import { configureStore } from '@reduxjs/toolkit';
import hotelBookingSlice from './booking/hotelBookingSlice'
import packageBookingSlice from './booking/packageBookingSlice';

const store = configureStore({
  reducer: {
    hotelbookings: hotelBookingSlice,
    packagebookings : packageBookingSlice,
  },
});

export default store;