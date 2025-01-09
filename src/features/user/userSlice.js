import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: [],
  error: null,
};
// 비동기 작업
// redux toolkit 에 있는 외부 Api 연동을 위한 AsyncThunk 만들기
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  return res.data;
});
export const fetchUserOne = createAsyncThunk("user/fetchUserOne", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users/1");
  return res.data;
});

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    showInfo: state => {
      console.log("사용자 정보 : ", state);
    },
  },
  // 비동기 즉, api 연동 작업후 slice 의 state 관리
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        // 연결중..
        // console.log("fetchUser.pending : ", action.payload);
        state.loading = true;
        state.error = null;
        // state.data = [];
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        // 성공적 연결 및 데이터출력
        // console.log("fetchUser.fulfilled : ", action.payload);
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        // console.log("fetchUser.rejected : ", action.payload);
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUserOne.pending, (state, action) => {
        console.log("fetchUserOne.pending : ", action.payload);
      })
      .addCase(fetchUserOne.fulfilled, (state, action) => {
        console.log("fetchUserOne.fulfilled : ", action.payload);
      })
      .addCase(fetchUserOne.rejected, (state, action) => {
        console.log("fetchUserOne.rejected : ", action.payload);
      });
  },
});
export const { showInfo } = userSlice.actions;
export default userSlice.reducer;
