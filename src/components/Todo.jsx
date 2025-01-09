import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, toggleTodo } from "../features/todo/todoSlice";

function Todo() {
  // store 의  todoSlice 의 state 출력
  const todos = useSelector(state => state.todo);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Todo</h1>
      <div>
        {todos.map(item => (
          <div key={item.id}>
            {item.title}
            <button onClick={() => dispatch(toggleTodo(item.id))}>변경</button>
            <button onClick={() => dispatch(deleteTodo(item.id))}>삭제</button>
          </div>
        ))}
        <button onClick={() => dispatch(addTodo("안녕할일"))}>추가</button>
      </div>
    </div>
  );
}
export default Todo;
