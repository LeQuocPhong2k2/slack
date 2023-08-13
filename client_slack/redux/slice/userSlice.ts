import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import JSXStyle from "styled-jsx/style";
import { IUser } from "./types";

export const fetchUsers = createAsyncThunk(
  "users/getAllUsers",
  async (thunkApi) => {
    const response = await fetch(
      "mongodb+srv://kuga:kuga@workchat.t6kzqkr.mongodb.net/workchat"
    );
    const data = await response.json();
    return data;
  }
);

export interface UserState {
    userList: IUser[];
    value: number;
    loading: boolean;
}

const initialState: UserState = {
    userList: [],
    value: 10,
    loading: false,
}; 

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserList: (state, action: PayloadAction<IUser[]>) => {
      state.userList = action.payload;
    }
  },
});

// export actions
export const { setUserList } = userSlice.actions;

export default userSlice.reducer;

