import { useDispatch, useSelector } from "react-redux";
import { fetchUser, fetchUserOne } from "../features/user/userSlice";

function UserInfo() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(state => state.user);

  if (loading) {
    return <div>로딩중</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>UserInfo</h1>
      <button onClick={() => dispatch(fetchUser())}>호출</button>
      <button onClick={() => dispatch(fetchUserOne())}>개별호출</button>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
export default UserInfo;
