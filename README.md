# react hook form 과 yup

## 1. 설치

- [react hook form 사이트](https://react-hook-form.com/)
- `npm install react-hook-form`
- [yup 사이트](https://github.com/jquense/yup)
- `npm i yup`
- `npm i @hookform/resolvers`
- 참조
  : `npm install react-hook-form yup @hookform/resolvers`

## 2. 참조

- [react-hook-fomr 참조블러그](https://velog.io/@boyeon_jeong/React-Hook-Form)
- [yup 참조블러그](https://velog.io/@boyeon_jeong/Yup-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%ED%8C%8C%ED%97%A4%EC%B9%98%EA%B8%B0)

## 3. 응용

### 3.1. 기본 hook-form 코드

- App.jsx

```jsx
import { useForm } from "react-hook-form";

function App() {
  // register : form 요소를 관리하겠다.
  // handleSubmit : form 데이터 전송시 처리
  const { register, handleSubmit } = useForm();

  // form 의 담겨진 데이터 전송 처리
  // e.preventDefault() 필요없음
  const handleSubmitForm = data => {
    // 모아서 전송할 데이터 (axios.post 전송)
    console.log(data);
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <label>이름</label>
        <input {...register("name")} />
        <button type="submit">제출</button>
      </form>
    </div>
  );
}
export default App;
```

### 3.2. 기본 yup 유효성 코드 추가

```jsx
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// schema 를 먼저 생성한다.
const loginSchema = yup.object({
  name: yup.string().required("이름은 필수 입니다."),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleSubmitForm = data => {
    // 모아서 전송할 데이터 (axios.post 전송)
    console.log(data);
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <label>이름</label>
        <input {...register("name")} />
        {/* 오류메시지 */}
        <p>{errors.name?.message}</p>
        <button type="submit">제출</button>
      </form>
    </div>
  );
}
export default App;
```

### 3.3. 추가 필드, 추가 유효성 schema 작성

- App.jsx

```jsx
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// schema 를 먼저 생성한다.
const loginSchema = yup.object({
  uid: yup.string().required("이름은 필수 입니다."),
  umail: yup
    .string()
    .email("유효한 이메일을 입력하세요.")
    .required("이메일은 필수 입니다."),
  upw: yup
    .string()
    .min(4, "비밀번호는 최소 4자리입니다.")
    .required("비밀번호는 필수 입니다."),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleSubmitForm = data => {
    // 모아서 전송할 데이터 (axios.post 전송)
    console.log(data);
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <label>아이디</label>
        <input {...register("uid")} />
        {/* 오류메시지 */}
        <p style={{ color: "red" }}>{errors.uid?.message}</p>

        <label>이메일</label>
        <input {...register("umail")} />
        <p style={{ color: "red" }}>{errors.umail?.message}</p>

        <label>비밀번호</label>
        <input type="password" {...register("upw")} />
        <p style={{ color: "red" }}>{errors.upw?.message}</p>

        <button type="submit">제출</button>
      </form>
    </div>
  );
}
export default App;
```

### 3.4. form 의 name에 `기본 값 넣기`

```jsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: yupResolver(loginSchema),
  // defaultValues: 기본 name 에 해당하는 값
  defaultValues: { uid: "", umail: "", upw: "" },
});
```

### 3.5. form 의 `초기에 유효성 검사 실행`하기

```jsx
const {
  register,
  handleSubmit,
  // 유효성 검사 즉시 실행
  trigger,
  formState: { errors },
} = useForm({
  resolver: yupResolver(loginSchema),
  defaultValues: { uid: "", umail: "", upw: "" },
});

// 컴포넌트가 마운트 되었을 때 실행
useEffect(() => {
  trigger();
}, [trigger]);
```

### 3.6. `유효성 검사 출력 시점` 변경

```jsx
const {
  register,
  handleSubmit,
  trigger,
  formState: { errors },
} = useForm({
  resolver: yupResolver(loginSchema),
  defaultValues: { uid: "", umail: "", upw: "" },
  // 유효성 검사 방식(제출시)
  // mode: "onSubmit",
  // 유효성 검사 방식(입력 진행중)
  mode: "onChange",
});

useEffect(() => {
  //trigger();
}, [trigger]);
```

### 3.7. `원하는 폼`에 값을 강제로 넣기

```jsx
const {
  register,
  handleSubmit,
  trigger,
  // 강제로 값 입력
  setValue,
  formState: { errors },
} = useForm({
  resolver: yupResolver(loginSchema),
  defaultValues: { uid: "", umail: "", upw: "" },
  mode: "onChange",
});

useEffect(() => {
  // 강제로 값 지정
  setValue("umail", "a@a.net");
}, []);
```

## 4. 파일 관련

### 4.1. 기본 파일 처리

```jsx
 ufile: yup
    .mixed()
    .required("파일은 필수 입니다.")
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", value => {
      return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB 이하
    }),
```

```jsx
<label>파일첨부</label>
<input type="file" {...register("ufile")} />
<p style={{ color: "red" }}>{errors.ufile?.message}</p>
```

### 4.2. 기본 파일 처리 - 이미지만

```jsx
.test("fileType", "JPG 또는 PNG 파일만 업로드 가능합니다.", value => {
      return value && ["image/jpeg", "image/png"].includes(value[0]?.type);
}),
```

```jsx
<label>사진파일첨부</label>
<input
  type="file"
  {...register("userimg")}
  accept="image/png, image/jpeg"
/>
<p style={{ color: "red" }}>{errors.userimg?.message}</p>
```
