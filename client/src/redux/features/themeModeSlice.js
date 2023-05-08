import { createSlice } from "@reduxjs/toolkit";

const getThemefromStorage = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : "dark";
export const themeModeSlice = createSlice({
  name: "ThemeMode",
  initialState: {
    themeMode: getThemefromStorage,
  },
  reducers: {
    setThemeMode: (state, action) => {
      localStorage.setItem("theme", action.payload);
      state.themeMode = action.payload;
    },
  },
});

export const { setThemeMode } = themeModeSlice.actions;

export default themeModeSlice.reducer;
