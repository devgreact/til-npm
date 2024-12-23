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
    .test("required", "파일은 필수 입니다.", value => {
      return value && value.length > 0;
    })
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
userimg: yup
    .mixed()
    .test("required", "사용자 이미지는 필수 입니다.", value => {
      return value && value.length > 0;
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", value => {
      return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB 이하
    })
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

### 4.3. 여러 파일 추가

- `multiple`

```jsx
<label>여러 파일 추가</label>
<input type="file" {...register("ufiles")} multiple />
<p style={{ color: "red" }}>{errors.ufiles?.message}</p>

```

```jsx
ufiles: yup
    .mixed()
    .test("required", "파일은 필수 입니다.", value => {
      return value && value.length > 0;
    })
    .test("fileCount", "최대 3개의 파일만 업로드 가능합니다.", value => {
      return value && value.length <= 3;
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", value => {
      return (
        value && Array.from(value).every(file => file.size <= 2 * 1024 * 1024)
      );
    }),
```

### 4.4. 여러 이미지 파일 추가

```jsx
<label>이미지 여러 파일 추가</label>
  <input
    type="file"
    {...register("uimgfiles")}
    multiple
    accept="image/png, image/jpeg"
  />
  <p style={{ color: "red" }}>{errors.uimgfiles?.message}</p>
```

```jsx
uimgfiles: yup
    .mixed()
    .test("required", "파일은 필수 입니다.", value => {
      return value && value.length > 0;
    })
    .test("fileCount", "최대 3개의 파일만 업로드 가능합니다.", value => {
      return value && value.length <= 3;
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", value => {
      // 파일이 여러개 이므로 각 파일을 반복문으로 용량을 비교해야 함.
      return (
        // 파일들이 있다면 && 모든 파일들을 배열로서 변환하고, every 즉, 조건이 맞는지 반복해서 비교한다.
        // every 는 모두 true인 경우만 true 를 리턴한다. 하나라도 false 면 false 리턴
        value && Array.from(value).every(file => file.size <= 2 * 1024 * 1024)
      );
    })
    .test("fileType", "JPG 또는 PNG 파일만 업로드 가능합니다.", value => {
      // 파일이 1개가 아니고 여러개이므로 반복문으로 type 비교를 해야 함.
      return (
        value &&
        Array.from(value).every(file =>
          ["image/jpeg", "image/png"].includes(file.type),
        )
      );
    }),
```

## 5. 파일 미리보기

### 5.1. 1장 미리보기

```jsx
<label>이미지 1개 미리보기</label>
<input
  type="file"
  {...register("previewfile")}
  accept="image/png, image/jpeg"
  onChange={e => handleChangePreview(e)}
/>
<p style={{ color: "red" }}>{errors.previewfile?.message}</p>
{preview && (
  <div>
    <h3>이미지 미리보기</h3>
    <img
      src={preview}
      alt="미리보기"
      style={{ width: 300, height: 300 }}
    />
  </div>
)}
```

```jsx
const [preview, setPreview] = useState("");
```

```jsx
// 이미지 한장 미리보기
const handleChangePreview = e => {
  const file = e.target.files[0];
  if (file) {
    // 웹브라우저에 임시 이미지 URL 을 생성해야 함.
    // 선택된 파일은 웹브라우저 cache 에 저장 되어 있음.
    // 이를 이용해 임시 url 을 생성함.
    // blob 을 생성해 줌.
    setPreview(URL.createObjectURL(file));
  }
};
```

### 5.2. 여러장 미리보기

```jsx
<label>이미지 여러장 미리보기</label>
<input
  type="file"
  {...register("previewlist")}
  accept="image/png, image/jpeg"
  multiple
  onChange={e => handleChangePreviewList(e)}
/>
<p style={{ color: "red" }}>{errors.previewlist?.message}</p>
<div>
  <h3>이미지 미리보기</h3>
  {previewList.map((item, index) => {
    return (
      <img
        key={index}
        src={item}
        alt="미리보기"
        style={{ width: 200, height: 200 }}
      />
    );
  })}
</div>
```

```jsx
const [previewList, setPreviewList] = useState([]);
```

```jsx
// 이미지 여러장 미리보기
const handleChangePreviewList = e => {
  // 원래 배열이므로
  const files = Array.from(e.target.files);
  const list = files.map(item => URL.createObjectURL(item));
  setPreviewList([...list]);
};
```

```jsx
previewlist: yup
    .mixed()
    .test("required", "파일은 필수 입니다.", value => {
      return value && value.length > 0;
    })
    .test("fileCount", "최대 3개의 파일만 업로드 가능합니다.", value => {
      return value && value.length <= 3;
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", value => {
      // 파일이 여러개 이므로 각 파일을 반복문으로 용량을 비교해야 함.
      return (
        // 파일들이 있다면 && 모든 파일들을 배열로서 변환하고, every 즉, 조건이 맞는지 반복해서 비교한다.
        // every 는 모두 true인 경우만 true 를 리턴한다. 하나라도 false 면 false 리턴
        value && Array.from(value).every(file => file.size <= 2 * 1024 * 1024)
      );
    })
    .test("fileType", "JPG 또는 PNG 파일만 업로드 가능합니다.", value => {
      // 파일이 1개가 아니고 여러개이므로 반복문으로 type 비교를 해야 함.
      return (
        value &&
        Array.from(value).every(file =>
          ["image/jpeg", "image/png"].includes(file.type),
        )
      );
    }),
```

## 6. axios 로 파일 전송하기 주의사항

- `npm i axios`

### 6.1. axios 로 파일을 전송할때는 아래 구문을 준수

```jsx
const handleSubmitForm = async data => {
  // 모아서 전송할 데이터 (axios.post 전송)
  console.log(data);

  try {
    // string 이었다면 아래로 충족
    // const res = await axios.post("주소", data);

    // 파일은 string 이 아니라 binary 입니다.
    // 그냥 보내면 안됩니다.
    // 백엔드에서 객체 형식으로 보내주세요. 라고 할겁니다.
    const sendData = new FormData();
    sendData.append("uid", data.uid);
    sendData.append("umail", data.umail);
    sendData.append("upw", data.upw);
    sendData.append("ufile", data.ufile);
    sendData.append("userimg", data.userimg);
    sendData.append("uimgfiles", data.uimgfiles);
    sendData.append("previewfile", data.previewfile);
    sendData.append("previewlist", data.previewlist);
    const res = await axios.post("주소", sendData, {
      headers: {
        "Content-Type": "multipart/form-data", // 파일 전송 형식
      },
    });

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
```
