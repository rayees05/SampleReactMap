import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  locationText: null,
  lat: 37.78825,
  lon: -122.4324,
  times: 0,
  showmarker: false,
  allData: [],
};

const reducerSlice = createSlice({
  name: 'Action',
  initialState,
  reducers: {
    storeData: (state, action) => {
      state.locationText = action.payload;
    },
    setlat: (state, action) => {
      state.lat = action.payload;
    },
    setlon: (state, action) => {
      state.lon = action.payload;
    },
    settimes: (state, action) => {
      state.times = action.payload;
    },
    setshowmarker: (state, action) => {
      state.showmarker = action.payload;
    },
    setAlldata: (state, action) => {
      state.allData = [...state.allData, action.payload];
    },
  },
});

export const {storeData, setlat, setlon, settimes, setshowmarker, setAlldata} =
  reducerSlice.actions;
export default reducerSlice.reducer;
