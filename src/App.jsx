import axios from "axios";
import { useRecoilState } from "recoil";
import { loginInfoState } from "./atoms/userInfo";
import { getCookie, removeCookie, setCookie } from "./utils/cookie";

function App() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const login = async () => {
    try {
      const res = await axios.post("/api/user/sign-in", {
        email: "dkssud123@tmails.net",
        upw: "1q2w3e4R!",
      });
      console.log(res.data);
      // 리코일에 전체 저장
      setLoginInfo(res.data.resultData);
      // 쿠키에 보관하기
      setCookie("accessToken", res.data.resultData.accessToken);
      setCookie("refreshToken", res.data.resultData.refreshToken);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>JWT : accessToken 만 존재</h1>
      <button
        onClick={() => {
          login();
        }}
      >
        로그인
      </button>
      <p>인증키 : {loginInfo?.accessToken}</p>

      <Test />
    </div>
  );
}
export default App;

function Test() {
  // 리코일
  const [liginInfo, setLoginInfo] = useRecoilState(loginInfoState);
  const callFn = async () => {
    try {
      // accessToken 을 담아서 보내기
      // 리코일에서 찾기
      // const accessToken = liginInfo.accessToken;
      // 쿠키에서 찾기
      const accessToken = getCookie("accessToken");
      // console.log(accessToken);
      const res = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res.data);
      console.log(res.status);
      // 만약에 인증키 만료라면 UnAuthorized
      if (res.status === 401) {
        // 인증키가 만료되었다고 온다면
        // 선택을 해야 한다.
        // 1번 케이스 : 강제로 로그인 이동
        //alert("다시 로그인을 해주세요.");
        // alert("라우터로 login 창으로 이동시킨다.");
        // removeCookie("accessToken");
        // setLoginInfo({});
        // 2번 케이스 : 다시 accessToken 을 받자.
        resetToken();
      }
    } catch (error) {
      console.log(error);

      alert("서버가 불안정합니다.");
    }
  };

  const resetToken = async () => {
    try {
      const res = await axios.get("/api/user/access-token");
      console.log(res);
      setCookie("accessToken");
      setLoginInfo(prev => ({
        ...prev,
        accessToken: res.data.ressulData.accessToken,
      }));
      // 원래하려던 API 다시 호출
      callFn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>테스트</h1>
      <button onClick={() => callFn()}>api 호출</button>
    </div>
  );
}
