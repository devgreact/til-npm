import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const todoSlice = createSlice({
  name: "todoSlice",
  // 최초로 보관 데이터
  initialState,
  // reducer 함수 : store 의  todoSlice 의 state 를 갱신
  // state 는 slice 에 보관하고 있는 데이터
  // action 은 state 에 업데이트할 새로운 데이터
  reducers: {
    // action {id:Date.now(), title: "안녕하세요", completed: false}
    // dispatch( addTodo("안녕") )
    addTodo: (state, action) => {
      state.push({ id: Date.now(), title: action.payload, completed: false });
    },
    // action id:기존아이디
    // dispatch( toggleTodo(452347621) )
    toggleTodo: (state, action) => {
      // 배열.find 는 true 인 요소를 찾는다.
      const todo = state.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    // action id:기존아이디
    // dispatch( deleteTodo(1234657689) )
    deleteTodo: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
  },
});
// dispatch action 함수 내보내기
export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
// 기본 리듀서를 내보냄
export default todoSlice.reducer;
