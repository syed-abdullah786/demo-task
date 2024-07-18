import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
      const favorite = action.payload;
      const index = state.indexOf(favorite);
      if (index !== -1) {
        state.splice(index, 1);
      } else {
        state.push(favorite);
      }
    },
  },
});


const countriesSlice = createSlice({
    name: 'countries',
    initialState: [],
    reducers: {
      setCountries: (state, action) => {
        return action.payload;
      },
    },
  });

const visitedCountriesSlice = createSlice({
    name: 'visitedCountries',
    initialState: {},
    reducers: {
        toggleVisited: (state, action) => {
            const { countryCode, visitDate } = action.payload;
            return { ...state, [countryCode]: visitDate };
          },
    },
  });

export const { toggleFavorite } = favoritesSlice.actions;
export const { setCountries } = countriesSlice.actions;
export const { toggleVisited } = visitedCountriesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
export const countriesReducer = countriesSlice.reducer;
export const visitedCountriesReducer = visitedCountriesSlice.reducer;
