# react cookie 설치

- 웹 브라우저에 보관(저장 기간 셋팅 가능한 데이터)
- `npm i react-cookie`

# JWT

- JavaScript Web Token (자바스크립트 웹 문자열)
- 많은 회사가 JWT 를 사용합니다.
- 그런데, 반드시 사용하는 것은 아닙니다.
- Token : 아주 길고 복잡한 문자열을 말합니다.

## JTW 에는 필수적으로 2가지 종류가 있습니다.

### 1. Access 토큰

- API 요청시 (axios, fetch 등) 을 이용해서 정보 요청시 활용
- API 요청시 Access 토큰을 내용에 담아서 백엔드로 같이 보냄.
- 모든 호출에 Access 토큰이 필요한 것은 아닙니다.

### 2. Refresh 토큰

- 백엔드에서 만약 JWT 인증키를 발급시 유효기간을 설정합니다.
- 백엔드에서 기본적으로 30분을 인증시간으로 설정합니다.
- 백엔드에서 필요에 의해서 2시간, 10시간, 3일 등등 설정합니다.

## Proxy 설정하기

- `vite.config.js` 내용 추가

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://112.222.157.156:5223",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```

## JWT 용 Axios 설정하기

- 꼭 기억하세요.
- 모든 백엔드 연동에서 반드시 JWT 를 사용하는 것은 아닙니다.

### 1. JWT 없이 사용하는 axios

- 로그인 API 는 JWT 가 필요없다.
  - 로그인하면 그때서야 `JWT 가 발급`이 된다.
  - 발급된 accessToken 을 cookie 또는 localStorage 에 보관함.
  - Recoil, useState, context 에 보관하면 사라집니다.
  - 그래서 발급된 accessToken 을 cookie 에 보관하기로 함.
- `/src/apis 폴더` 생성
  - jwt 가 필요없는 axios 생성
  - 반드시 만들어야 하는 것은 아닙니다.
  - `fetch.js` 생성

### 2. JWT 가 필요로 한 axios

- `/src/apis/jwt.js ` 파일 생성
- interceptors 를 여러분이 설정하셔야 합니다.
- 통상 Request 하기전에 처리
- 통상 Request 한 이후 jwt 인증 통과 못한 에러처리
- 통상 Response 하기전에 처리
- 통상 Response 한 이후 jwt 인증 통과 못한 에러처리

```js
import axios from "axios";

const jwtAxios = axios.create();
// axios 호출시 사전 옵션을 설정합니다.
// 호출 즉 백엔드로 Request 하기전에 옵션 붙이기
const beforeReq = config => {
  console.log("1. 요청전에 먼저 전달", config);
  return config;
};
const failReq = err => {
  console.log("failReq Error 됨");
  return Promise.reject(err);
};
// Response 즉, 회신 전에 처리함.
const beforeRes = res => {
  console.log("2. 요청의 결과 전처리", res);
  return res;
};
const failRes = err => {
  console.log("failRes 에러", err);
  return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, failReq);
jwtAxios.interceptors.response.use(beforeRes, failRes);

export default jwtAxios;
```

## JWT 쿠키에 보관하기

- 쿠키를 위한 파일 생성
- `/src/utils 폴더` 생성
- `/src/utils/cookie.js 파일` 생성

```js
import { Cookies } from "react-cookie";
const cookies = new Cookies();
// 쿠키에 저장하기
export const setCookie = (name, value, options) => {
  return cookies.set(name, value, { ...options });
};
// 쿠키에 데이터 읽기
export const getCookie = name => {
  return cookies.get(name);
};
// 쿠키 삭제하기
export const removeCookie = name => {
  return cookies.remove(name, { path: "/" });
};
```

## jwt 쿠키에 보관하기 과정

- 일반 axios 로 로그인 시도

```js
const loginApi = async () => {
  try {
    // 여기는 일반 axios 로 로그인을 하고 jwt 를 발급받는다.
    const res = await axiosInstance.get("/api/user/access-token", {
      email: "qgq0520@naver.com",
      upw: "1234",
    });
    // 성공시 리턴되는 jwt 키를 쿠키에 보관한다.
    setCookie("accessToken", res.resultData);
  } catch (error) {
    console.log(error);
    // 실패시 jwt 를 지워주는 코드 쿠키에서 제거
    removeCookie("accessToken");
  }
};
```

- jwt 호출 필요로 하면

```js
import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";

const jwtAxios = axios.create();
// axios 호출시 사전 옵션을 설정합니다.
// 호출 즉 백엔드로 Request 하기전에 옵션 붙이기
const beforeReq = config => {
  // console.log("1. 요청전에 먼저 전달", config);
  // 1. 먼저 쿠키를 읽어온다.
  const accessToken = getCookie("accessToken");
  // 2. 인증 키 없는 경우
  if (!accessToken) {
    // 에러 메시지를 리턴함.
    return Promise.reject({
      response: { data: { error: "Login 하셔서 인증하세요." } },
    });
  }
  // 3. 정상적으로 인증키가 있다면
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

const failReq = err => {
  console.log("failReq Error 됨");
  return Promise.reject(err);
};
jwtAxios.interceptors.request.use(beforeReq, failReq);

// Response 즉, 회신 전에 처리함.
const beforeRes = async res => {
  // console.log("2. 요청의 결과 전처리", res);
  // 항상 결과가 정상적으로 오면 혹시 모를 jwt 키 변경이 될 수 도 있다.
  // accessToken 을 새롭게 호출하고 다시 저장해 준다.
  try {
    const result = await axios.get("/api/user/access-token");
    setCookie("accessToken", result.resultData);
    return res.config;
  } catch (error) {
    console.log(error);
  }
};
const failRes = async err => {
  // console.log("failRes 에러", err);
  try {
    const result = await axios.get("/api/user/access-token");
    setCookie("accessToken", result.resultData);
    return Promise.reject(err);
  } catch (error) {
    console.log(error);
  }
};

jwtAxios.interceptors.response.use(beforeRes, failRes);

export default jwtAxios;
```

## 사용자 정보 recoil 에 보관하기

- 사용자 로그인 API 연동후 정보 저장
- `/src/atoms 폴더` 생성
- `/src/atoms/userInfo.js 파일` 생성

```js
import { atom } from "recoil";

export const userInfo = atom({
  key: "userinfo",
  default: {
    name: "",
    phone: "",
    birth: "",
    nickName: "",
  },
});
```

- Recoil 은 App.jsx 또는 main.js 에 Root 배치

```jsx
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // 전연 store 를 활용함.
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
```

```js
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
```
