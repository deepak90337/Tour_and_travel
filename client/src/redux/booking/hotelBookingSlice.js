// bookingSlice.js (Redux slice)
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hotelBookings: [],
  selectedhotelBooking: null,
  hotelForUpdate: null, // Use a more descriptive name like `hotelBookings`
};

const hotelBookingSlice = createSlice({
  name: 'hotelBookings', // More accurate slice name
  initialState,
  reducers: {
    addHotelBooking: (state, action) => {
      state.hotelBookings.push(action.payload); // Add booking to state
    },
    setSelectedHotelBooking: (state, action) => {
      state.selectedhotelBooking = action.payload; // Update state with selected booking object
    },
    setHotelForUpdate: (state, action) => {
      state.hotelForUpdate = action.payload; // Update state with selected booking object
    },
    // Add other reducers for updating, deleting, fetching, etc. (optional)
  },
});

export const { addHotelBooking,setSelectedHotelBooking,setHotelForUpdate } = hotelBookingSlice.actions;
// Selector to access selectedBooking with reducer's name in store
export const selectSelectedBooking = (state) => state.hotelbookings.selectedhotelBooking;
export const selectSelectedHotel = (state) => state.hotelbookings.hotelForUpdate;
export default hotelBookingSlice.reducer;
