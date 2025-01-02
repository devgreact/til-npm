# Redux Toolkit (RTK)

- 전역 상태(즉, Context) 를 관리하는 `상태관리도구`
  : Context API (리액트에 빌트인)
  : Reudx, Redux Toolkit, Recoil, Zustands

## 관련 사이트

- https://redux.js.org/
- https://ko.redux.js.org/introduction/getting-started/

## 레퍼런스 사이트에서 RTK 를 추천함.

- `npm install @reduxjs/toolkit`
- `npm install redux`
- `npm i react-redux`

## RTK 의 기본 예제(`순서를 준수`하자.)

- 학습순서는 `무조건 순서대로` 하셔야 합니다.
- 폴더구조, 파일명 등등
- `/src/store 폴더` 생성 (전역 state 보관장소)
  : `store.js 파일` 생성

```js
// store 설정
// store 는 전역에서 사용할 state 를 말합니다.
// 회사에서는 /src/store 폴더를 주로 생성합니다.
// store 는 1개만 만들 수 있습니다.
// 즉, 전역 state 는 1개만 만들 수 있습니다.

import { configureStore } from "@reduxjs/toolkit";

// 파일명은 주로 store.js 라고 칭합니다.
const store = configureStore({
  reducer: {
    // store 를 쪼개서 즉, slice 해서 사용합니다.
  },
});

export default store;
```

- `/src/features/counter 폴더` 생성
  : `counterSlice.js`

```js
import { createSlice } from "@reduxjs/toolkit";

// 초기값 (상태 관리할 데이터)
const initialState = {
  count: 0,
};
// 코딩 컨벤션
// Slice 는 store 를 쪼개서 사용한다는 의미
const counterSlice = createSlice({
  // 슬라이스 구분 이름
  name: "counterSlice", // 문자열
  // 슬라이스 초기 값
  initialState,
  // store/counterSlice 에 저장된 값 갱신 함수
  // 상태를 갱신해 주는 함수 묶음
  reducers: {
    add: state => {
      state.count += 1;
    },
    minus: state => {
      state.count -= 1;
    },
    reset: state => {
      state.count = 1;
    },
  },
});
// Reduce 함수를 외부로 내보내서 dispatch 해주도록
// action :  type 의 구분, payload 전달
export const { add, minus, reset } = counterSlice.actions;

export default counterSlice.reducer;
```

- `/src/store/store.js`
  : Slice 로 만든 reducer 배치

```js
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
    conuter: counterReducer,
  },
});

export default store;
```

- `/src/components/Counter.jsx` 생성

```jsx
import { useDispatch, useSelector } from "react-redux";
// store 에 저장된 Slice 중 어떤 Slice의 Action 을 쓸것인가
import { add, minus, reset } from "../features/counter/counterSlice";
function Counter() {
  // RTK 의 store 를 불러들여서 그중 counter 를 사용하겠다.
  // 직접 state 의 값에 접근
  // const count = useSelector(state => state.counter.count);
  // 객체 구조분해 할당으로 접근
  const { count } = useSelector(state => state.counter);

  // RTK 의 store 의 counter 의 값 갱신 dispatch 사용하겠다.
  const dispatch = useDispatch();

  return (
    <div>
      <p>카운터 값 : {count}</p>
      <button onClick={() => dispatch(add())}>증가</button>
      <button onClick={() => dispatch(minus())}>감소</button>
      <button onClick={() => dispatch(reset())}>리셋</button>
    </div>
  );
}
export default Counter;
```

- `/src/App.jsx` 에 Provider 셋팅 (`전역 store 접근`)

```jsx
import { Provider } from "react-redux";
import Counter from "./components/Counter";
import store from "./store/store";

function App() {
  return (
    // 전연 store 를 활용함.
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
export default App;
```
