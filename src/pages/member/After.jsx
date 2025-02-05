import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../kko/kkoapi";
import { useEffect, useState } from "react";

const After = () => {
  // 카카오 사용자 정보 보관
  const [userInfo, setUserInfo] = useState(null);

  // 카카오 인가 알아내기
  // http://localhost:5173/member/kko?code=jAP3q9kan1tsRFA1IOYPw89xasovPu4twfaFHox-x3aOSM3Q1SWi0QAAAAQKPCJSAAABlNPHPDrdCc_9be4aqQ
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  // searchparams 에서 code 알아내기
  const authCode = URLSearchParams.get("code");
  // 인가 키를 이용해서 Access Token 을 발급 받자
  const getAccessTokenCall = async () => {
    try {
      // Access Token
      const accessKey = await getAccessToken(authCode);
      console.log("accessKey : ", accessKey);
      // 사용자 정보 호출
      const info = await getMemberWithAccessToken(accessKey);
      console.log("info : ", info);
      // state 보관
      setUserInfo(info);
    } catch (error) {
      console.log(error);
    }
  };
  // 인가 키가 존재한다면 그때 토큰 및 정보 호출
  useEffect(() => {
    getAccessTokenCall();
  }, [authCode]);

  return (
    <div>
      <h1>인가키 {authCode}</h1>
      <h2>KKO 로그인 후 </h2>
      <div>
        <p>아이디 : {userInfo?.id}</p>
        <p>닉네임 : {userInfo?.kakao_account.profile.nickname}</p>
        <p>이메일 : {userInfo?.kakao_account.email}</p>
        <p>
          사용자 사진 :{userInfo?.kakao_account.profile.thumbnail_image_url}{" "}
        </p>
        <p>
          추가정보취미 : <input type="text" />
        </p>
        <p>
          <button>회원가입</button>
        </p>
      </div>
    </div>
  );
};
export default After;
