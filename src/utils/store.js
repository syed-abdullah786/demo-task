import { configureStore, combineReducers  } from "@reduxjs/toolkit";
import {
  favoritesReducer,
  countriesReducer,
  visitedCountriesReducer,
} from "./slice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favorites", "visitedCountries", "countries"],
};

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  countries: countriesReducer,
  visitedCountries: visitedCountriesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }),
  });

export default store;
