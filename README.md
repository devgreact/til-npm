# 구글 로그인

- 구글 클라우드 플랫폼 : https://console.cloud.google.com

## 과정

- 과정 1
  ![Image](https://github.com/user-attachments/assets/63b66acc-03d4-4286-be25-0e420c6b8149)
- 과정 2. 프로젝트 생성
  ![Image](https://github.com/user-attachments/assets/eb09f1e9-c919-48c6-98e2-e0ec82edebb0)
  ![Image](https://github.com/user-attachments/assets/cecae858-9c80-4a4d-8183-e5f05ebf4e4c)
  ![Image](https://github.com/user-attachments/assets/1eeec606-1393-496e-ac3b-2b27550424fa)
  ![Image](https://github.com/user-attachments/assets/4d781b68-9467-4d5b-8410-fab5e53fa768)
  ![Image](https://github.com/user-attachments/assets/6762a6c0-9b4a-487f-b814-34158f045363)
  ![Image](https://github.com/user-attachments/assets/781e4d8e-fb9c-46fc-9ed8-df3c4b586101)
  ![Image](https://github.com/user-attachments/assets/d8db66e9-c613-44bf-b828-a0908800fb18)
  ![Image](https://github.com/user-attachments/assets/207fa9b8-c4d2-4084-bd21-220a20437dd2)
  ![Image](https://github.com/user-attachments/assets/cd78691d-c65c-4e4d-b6ee-76d1e84a5536)
  ![Image](https://github.com/user-attachments/assets/c6171852-2658-4709-99a6-821e52f04c5f)
  ![Image](https://github.com/user-attachments/assets/25eb3b80-189a-4789-9b8c-015263fd9fd4)
  ![Image](https://github.com/user-attachments/assets/6c82b794-d46c-4181-bcac-a646c39e50b5)
  ![Image](https://github.com/user-attachments/assets/06caa206-49ad-4233-9bb7-77da192a89ef)
  ![Image](https://github.com/user-attachments/assets/a562457f-1e73-4b5c-a316-6c9b5fdfb55c)
  ![Image](https://github.com/user-attachments/assets/4ce6e1cc-08b1-450d-8464-3cc67959380b)
  ![Image](https://github.com/user-attachments/assets/3ce2b14d-a12c-4b78-9fb0-f0ae75ef69c6)
  ![Image](https://github.com/user-attachments/assets/3ce2b14d-a12c-4b78-9fb0-f0ae75ef69c6)
  ![Image](https://github.com/user-attachments/assets/a40c6062-d83f-4763-884a-5e48feeda812)
  ![Image](https://github.com/user-attachments/assets/8acc8446-8f46-41c6-99bb-195da385a62b)
  ![Image](https://github.com/user-attachments/assets/0f0ca565-4e8a-4a1e-8af4-d16be272e764)
  ![Image](https://github.com/user-attachments/assets/bad41ab4-c1cd-404d-889f-a4363b97ef94)

- 과정 3
  ![Image](https://github.com/user-attachments/assets/2a8779e2-dba2-43c1-ac44-80fda5449caf)

## env

VITE_KKO_MAP_KEY=본인키
VITE_KKO_LOGIN_REST_API_KEY=본인키
VITE_KKO_LOGIN_JS_API_KEY=본인키
VITE_GOOGLE_CLIENT_ID=본인키
VITE_GOOGLE_CLIENT_PASS=본인키

## 코드 진행

- `/src/google 폴더` 생성
- `/src/google/googleapi.js 파일` 생성

```js
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = "http://localhost:5173/member/google";
// 구글 로그인시 활용
export const getGoogleLoginLink = () => {
  window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid email profile`;
};

export const getGoogleToken = async code => {
  const REST_API_KEY = GOOGLE_CLIENT_ID;
  const REDIRECT_URI = GOOGLE_REDIRECT_URI;
  const SECRET_KEY = import.meta.env.VITE_GOOGLE_CLIENT_PASS;
  const response = await fetch(
    `https://oauth2.googleapis.com/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&client_secret=${SECRET_KEY}&code=${code}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    },
  );
  return response.json();
};

export const getGoogleUserInfo = async accessToken => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Google user info");
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching Google user info:", error);
    return null;
  }
};
```

## 라우터 구성

```ts
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./Join";
import After from "./pages/member/After";
import GoogleAfter from "./pages/member/GoogleAfter";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>HOME</h1>} />
        <Route path="/join" element={<Join />} />
        <Route path="/member/kko" element={<After />} />
        <Route path="/member/google" element={<GoogleAfter />} />
        <Route path="/login" element={<h1>로그인</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
```

## 인가 키 처리

- `/src/pages/member/GoogleAfter.jsx 파일` 생성

```ts
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

```

## 로그인 버튼

- `/src/Join.jsx` 수정

```ts
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "./kko/kkoapi";
import { getGoogleLoginLink } from "./google/googleapi";

function Join() {
  const kakaoLogin = getKakaoLoginLink();
  return (
    <div>
      <h1>SNS 로그인</h1>
      <div>
        <Link to={kakaoLogin}>카카오 로그인</Link>
      </div>
      <div>
        <button onClick={() => getGoogleLoginLink()}>구글 로그인</button>
      </div>
    </div>
  );
}
export default Join;
```
