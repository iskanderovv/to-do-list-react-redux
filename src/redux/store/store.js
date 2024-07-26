import { configureStore } from "@reduxjs/toolkit";
import { reducer as todos } from "../todoSlice/todoSlice";

export const store = configureStore({
  reducer: {
    todos,
  },
});
