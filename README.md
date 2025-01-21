# React Router Dom 2

- `npm i react-router-dom`
- site map 부터 구성을 고민해 보세요.
- BrowserRouter > Routes > Route 구조
- 기존 구성이 맞습니다. (많은 서비스에서 기존대로 작업합니다.)
- `조금 더 업데이트 해 보자.`

## Router 를 `파일`로 관리하자.

### 1. 폴더 및 기본 파일 구조

- `/src/router 폴더` 생성
- `/src/router/root.js 파일` 생성
- root.jsx 의 용도
  : 기본 라우터 경로 작성
  : 서브 라우터들은 또 별도의 파일로 관리

```js
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>홈</h1>,
  },
  {
    path: "/company",
    element: <h1>회사</h1>,
  },
  {
    path: "/good",
    element: <h1>제품</h1>,
  },
  {
    path: "*",
    element: <h1>잘못된 경로 입니다.</h1>,
  },
]);

export default router;
```

### 2. Router 활용

```jsx
import { RouterProvider } from "react-router-dom";
import router from "./router/root";

function App() {
  return (
    <div>
      <h1>App</h1>
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
```

## 응용예제

### 1. 로딩창 만들기

- https://www.davidhu.io/react-spinners/
- `npm i react-spinners`
- `/src/components/loading 폴더`
- `/src/components/loading/Loading.jsx 파일`

```jsx
import { ClipLoader } from "react-spinners";

const Loading = () => {
  const LoadingCss = {
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  };
  return (
    <div style={LoadingCss}>
      <ClipLoader color="#a518c9" loading size={200} speedMultiplier={1} />
    </div>
  );
};

export default Loading;
```

### 2. Suspense 와 lazy 를 이용한 동적 로딩 처리

- `/src/pages 폴더` 생성
- `/src/pages/Index.jsx 파일` 생성

```jsx
function Index() {
  return <div>Index</div>;
}
export default Index;
```

- `/src/pages/Company.jsx 파일` 생성

```jsx
function Company() {
  return <div>Company</div>;
}
export default Company;
```

- `/src/pages/Good.jsx 파일` 생성

```jsx
function Good() {
  return <div>Good</div>;
}
export default Good;
```

### 3. 라우터 적용

```jsx
import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../components/loading/Loading";

const LazyHome = lazy(() => import("../pages/Index"));
const LazyCompany = lazy(() => import("../pages/Company"));
const LazyGood = lazy(() => import("../pages/Good"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyHome />
      </Suspense>
    ),
  },
  {
    path: "/company",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyCompany />
      </Suspense>
    ),
  },
  {
    path: "/good",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyGood />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <h1>잘못된 경로 입니다.</h1>,
  },
]);

export default router;
```

### 4. children 속성 이해하기

- root.jsx

```jsx
import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../components/loading/Loading";

const LazyHome = lazy(() => import("../pages/Index"));
const LazyCompany = lazy(() => import("../pages/Company"));
const LazyGood = lazy(() => import("../pages/Good"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyHome />
      </Suspense>
    ),
  },
  {
    path: "/company",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyCompany />
      </Suspense>
    ),
    children: [
      { path: "ceo", element: <h1>회장님인사말</h1> },
      { path: "location", element: <h1>회사위치</h1> },
    ],
  },
  {
    path: "/good",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyGood />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <h1>잘못된 경로 입니다.</h1>,
  },
]);

export default router;
```

### 4.1. childrent 들을 외부 파일로 빼자

- companyRouter.jsx

```js
const companyRouter = () => {
  return [
    { path: "ceo", element: <h1>회장님인사말</h1> },
    { path: "location", element: <h1>회사위치</h1> },
  ];
};
export default companyRouter;
```

- root.jsx `children 변경`

```jsx
{
    path: "/company",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyCompany />
      </Suspense>
    ),
    children: companyRouter(),
  }
```

## 정리

- 조건은 `React Router Dom 버전 6 이상의 최신 버전`만
- 기존 소스들은 아마도 거의 옛날 버전으로 되어 있을 겁니다.
