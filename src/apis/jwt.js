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
