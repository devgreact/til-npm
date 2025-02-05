import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "./kko/kkoapi";

function Join() {
  const kakaoLogin = getKakaoLoginLink();
  return (
    <div>
      <h1>SNS 로그인</h1>
      <div>
        <Link to={kakaoLogin}>카카오 로그인</Link>
      </div>
    </div>
  );
}
export default Join;
