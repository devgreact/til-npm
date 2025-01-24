# JWT 프로젝트 반영

- 사용자 인증은 2가지가 있습니다.
- 세션 인증
- JWT 인증
- 하이브리드 세션 + JWT 인증 혼합

## 1. jwt (JSON Web Token)

- 복잡한 문자열(토큰)을 서버에서 만들어서 준다.

## 2. 시나리오

- 사용자가 로그인을 합니다.
- Response 로 2개의 값이 오는게 정석입니다.
- accessToken : 서버에서 만들어서 돌려줌.
  - api 호출시 첨부함.
- refreshToken : 서버에서 만들어서 돌려줌.
  - api 호출시 401 (UnAuthorization) : 인증만료가 되었다.
  - 인증키 즉 accessToken 만료시 새로 요청을 해서
    - accessToken 과 refreshToken 을 다시 받는다.
- 2개의 값을 클라이언트가 보관(Recoil, Context, Cookie 등)합니다.
- api 를 호출할때 /api/tourlist 할때 accessToken 을 같이 보내줌

## 3. refreshToken 있는 경우 처리

### 만료되면 다시 refreshToken 으로 요청하고 다시 새로운 토큰으로 axios 호출한다.

### accessToken 과 refreshToken 을 교체한다.

## 4. 필요로 한 npm 들

- axios
- react-cookie
- recoil

## 5. 로그인 후 jwt 정보(2개) 관리하기
