import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      _id: "",
      username: "",
      password: "",
      credits: 5,
      posts: [],
    },
    isLoggedIn: false,
  },
  reducers: {
    // set the user
    setuser: (state, action) => {
      state.user = action.payload;
    },
    login: (state, action) => {
      const BASE_URL =
        process.env.NODE_ENV === "production"
          ? "/api/v1/user/login"
          : "//localhost:8080/api/v1/user/login";
      fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("secusess");
          }
        })
        .catch((error) => {
        });
    },
    signup: (state, action) => {
      const BASE_URL =
        process.env.NODE_ENV === "production"
          ? "/api/v1/user/signup"
          : "//localhost:8080/api/v1/user/signup";
      fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("secusess");
          }
        })
        .catch((error) => {
        });
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
