// store 설정
// store 는 전역에서 사용할 state 를 말합니다.
// 회사에서는 /src/store 폴더를 주로 생성합니다.
// store 는 1개만 만들 수 있습니다.
// 즉, 전역 state 는 1개만 만들 수 있습니다.

import { configureStore } from "@reduxjs/toolkit";
// 카운터용 Reducer 를 활용
import counterReducer from "../features/counter/counterSlice";
// 파일명은 주로 store.js 라고 칭합니다.
const store = configureStore({
  reducer: {
    // store 를 쪼개서 즉, slice 해서 사용합니다.
    counter: counterReducer,
  },
});

export default store;
