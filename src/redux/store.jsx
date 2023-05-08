import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../redux/userSlice";
import loaderSlice from "../redux/loaderSlice";

const store = configureStore({
  reducer: {
    users: usersSlice,
   loaders:loaderSlice
  },
});

export default store;