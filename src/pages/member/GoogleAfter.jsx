import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGoogleToken, getGoogleUserInfo } from "../../google/googleapi";

const GoogleAfter = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  // 카카오 인가 알아내기
  // http://localhost:5173/member/google?code=4%2F0ASVgi3J34nIJWXBkMWVe23jTDfVuZ57PH74fpzQfqHVnwtknH3sxcOxr6MuJKkvQ__ge7A&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=consent
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  // searchparams 에서 code 알아내기
  const authCode = URLSearchParams.get("code");
  console.log(authCode);
  // 인가 키를 이용해서 Access Token 을 발급 받자
  const getAccessTokenCall = async () => {
    try {
      // Access Token
      const accessKey = await getGoogleToken(authCode);
      console.log("accessKey : ", accessKey);
      if (accessKey) {
        setAccessToken(accessKey.access_token);

        // 2. 액세스 토큰을 사용하여 사용자 정보 요청
        const userData = await getGoogleUserInfo(accessKey.access_token);
        console.log("Google User Info:", userData);
        setUserInfo(userData);
      }

      // state 보관
      //   setUserInfo(info);
    } catch (error) {
      console.log(error);
    }
  };
  //   // 인가 키가 존재한다면 그때 토큰 및 정보 호출
  useEffect(() => {
    getAccessTokenCall();
  }, [authCode]);

  return (
    <div>
      <h1>Google OAuth 로그인</h1>
      <h2>인가 코드: {authCode}</h2>
      <h2>Access Token: {accessToken ? "✅ 성공적으로 가져옴" : "❌ 없음"}</h2>

      {userInfo ? (
        <div>
          <p>아이디: {userInfo.id}</p>
          <p>이름: {userInfo.name}</p>
          <p>이메일: {userInfo.email}</p>
          <p>
            프로필 사진: <img src={userInfo.picture} alt="프로필" width={50} />
          </p>
        </div>
      ) : (
        <p>사용자 정보를 불러오는 중...</p>
      )}
    </div>
  );
};
export default GoogleAfter;
