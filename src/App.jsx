import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import jwtAxios from "./apis/jwt";
import { removeCookie, setCookie } from "./utils/cookie";

function App() {
  const [user, setUser] = useRecoilState();

  const loginApi = async () => {
    try {
      // 여기는 일반 axios 로 로그인을 하고 jwt 를 발급받는다.
      const res = await axios.post("/api/user/sign-in", {
        email: "qgq0520@naver.com",
        upw: "1234",
      });
      // 성공시 리턴되는 jwt 키를 쿠키에 보관한다.
      setCookie("accessToken", res.resultData);
      // 사용자의 정보를 App 전체에서 접근하려고 한다.
      // useRecoilState 를 가지고서 앱 전체에서 활용하도록.
    } catch (error) {
      console.log(error);
      // 실패시 jwt 를 지워주는 코드 쿠키에서 제거
      removeCookie("accessToken");
    }
  };

  useEffect(() => {
    loginApi();
  }, []);

  // jwt 인증키를 반드시 필요로 한 axios 호출
  const userInfo = async () => {
    try {
      const res = await jwtAxios.get("/api/user");
      console.log(res);
      // Recoil 정보 업데이트 하기
      setUser({ ...res.data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={userInfo}>JWT 를 활용한 호출</button>
    </div>
  );
}
export default App;
