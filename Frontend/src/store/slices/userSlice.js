import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      _id: "",
      username: "",
      password:'',
      credits: 5,
      posts: [],
    },
  },
  reducers: {
    // set the user
    setuser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
