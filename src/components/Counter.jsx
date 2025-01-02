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
