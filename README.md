# Ant Design

- 알리바바
- UI CSS 수정이 엄청 어렵다.
- 각 컴포넌트 사용법 학습에 시간이 오래 걸린다.
- 틈나는 대로 하나씩 공부하여 보자.
- UI 코딩 및 css 작업 시간 단축 및 통일성 있는 UI 구성 가능
- https://ant.design/components/overview/

## 설치

- `npm install antd --save`

## 실습

- `/src/components/JoinForm.jsx`

```jsx
import { Button, Form, Input } from "antd";

const JoinForm = () => {
  // 1. 기본 값 넣기(default)
  const initialValues = {
    userid: "hong",
    userpass: "hello",
    nickname: "길동",
    email: "a@a.net",
  };

  // 2. 라벨넣기

  // 3. placehoder 넣기

  // 4. 필수값 표현하기

  // 5. 필수값 안내 메시지 표시하기

  // 6. 각 필드의 입력 중인 값 알아내기
  const onChangeField = _field => {
    console.log(_field[0].value);
  };

  // 7. 확인 버튼 시 최종 입력값
  const onFinished = values => {
    console.log(values);
  };
  return (
    <div>
      <Form
        style={{ width: 600, margin: "0 auto" }}
        initialValues={initialValues}
        onFieldsChange={(field, allFields) => onChangeField(field)}
        onFinish={values => onFinished(values)}
      >
        <Form.Item
          name={"userid"}
          label="아이디"
          required={true}
          rules={[
            { required: true, message: "아이디는 필수 사항입니다." },
            { min: 4, message: "아이디는 4자 이상입니다." },
            { max: 8, message: "아이디는 8자 이하입니다." },
          ]}
        >
          <Input placeholder="아이디를 입력하세요" />
        </Form.Item>
        <Form.Item
          name={"userpass"}
          label="비밀번호"
          required={true}
          rules={[
            { required: true, message: "비밀번호는 필수 항목입니다." },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message:
                "비밀번호는 최소 8자 이상이며, 대소문자와 숫자를 포함해야 합니다.",
            },
          ]}
        >
          <Input.Password placeholder="비밀번호를 입력하세요" />
        </Form.Item>
        <Form.Item name={"nickname"} label="닉네임">
          <Input placeholder="닉네임을 입력하세요" />
        </Form.Item>
        <Form.Item
          name={"email"}
          label="이메일"
          rules={[
            { required: true, message: "이메일은 필수 항목입니다." },
            { type: "email", message: "이메일 형식에 맞지 않습니다." },
          ]}
        >
          <Input placeholder="이메일을 입력하세요" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">확인</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default JoinForm;
```

## 실습 2 (비밀번호 비교 예제)

- `/src/App.jsx`

```jsx
import PwForm from "./components/PwForm";

function App() {
  return <PwForm />;
}
export default App;
```

- `/src/component/PwForm.jsx 파일 생성`
- 기본 코드

```jsx
import { Button, Form, Input } from "antd";
import { useState } from "react";

const PwForm = () => {
  // 비밀번호 같은지 아닌지 상태 저장
  const [match, setMatch] = useState(false);
  // Ant Design 에 form 요소 참조하기
  const [form] = Form.useForm();
  // 두개의 필드 값이 같은지 아닌지 체크하는 함수를 생성
  // const validatePassword = () => {};

  const handleChangePassword = () => {
    // 기본 비밀번호 입력값 알아내고
    const pw = form.getFieldValue("password");
    // 비교 비밀번호 입력값 알아내고, 비교한다.
    const pwConfirm = form.getFieldValue("passwordConfirm");
    if (pwConfirm) {
      // 비교 비밀 번호 있으면 비교하겠다.
      setMatch(pw === pwConfirm);
    }
  };

  // submit 버튼 선택시 실행
  const onFinished = values => {
    console.log("전송할 데이터 : ", values);
  };
  return (
    <div>
      <h1>비밀번호 검증예제</h1>
      <Form
        //  Ant Design 에 form 요소 ref 하기
        form={form}
        name="password-form"
        style={{ width: 600, margin: "0 auto" }}
        onFinish={values => onFinished(values)}
      >
        <Form.Item
          name={"password"}
          label="비밀번호"
          rules={[
            { required: true, message: "비밀번호는 필수 항목입니다." },
            // {
            //   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            //   message:
            //     "비밀번호는 최소 8자 이상이며, 대소문자와 숫자를 포함해야 합니다.",
            // },
          ]}
        >
          <Input.Password
            placeholder="비밀번호를 입력해주세요."
            onChange={() => handleChangePassword()}
          />
        </Form.Item>
        <Form.Item
          name={"passwordConfirm"}
          label="비밀번호 확인"
          rules={[
            { required: true, message: "비밀번호 확인은 필수 항목입니다." },
          ]}
        >
          <Input.Password
            placeholder="비밀번호를 확인해주세요."
            onChange={() => {
              handleChangePassword();
            }}
          />
        </Form.Item>
        {/* 비교 관련한 내용을 출력한다. */}
        {!match && <div style={{ color: "red" }}>비밀번호 달라요.</div>}
        <Form.Item>
          <Button htmlType="submit" disabled={!match}>
            확인
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default PwForm;
```
