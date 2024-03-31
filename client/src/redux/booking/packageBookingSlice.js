import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  packageBookings: [], 
  selectedBooking: null, 
  packageForUpdate: null,
  // Use a more descriptive name like `hotelBookings`
};

const PackageBookingSlice = createSlice({
  name: 'packageBookings', // More accurate slice name
  initialState,
  reducers: {
    addPackageBooking: (state, action) => {
      state.packageBookings.push(action.payload); // Add booking to state
    },
    setSelectedBooking: (state, action) => {
        state.selectedBooking = action.payload; // Update state with selected booking object
      },
      setPackageForUpdate: (state, action) => {
        state.packageForUpdate = action.payload; // Update state with selected booking object
      },
    // Add other reducers for updating, deleting, fetching, etc. (optional)
  },
});

export const { addPackageBooking,setSelectedBooking,setPackageForUpdate } = PackageBookingSlice.actions;
// Selector to access selectedBooking with reducer's name in store
export const selectSelectedBooking = (state) => state.packagebookings.selectedBooking;
export const SelectedPackageUpdate = (state) => state.packagebookings.packageForUpdate;
export default PackageBookingSlice.reducer;
