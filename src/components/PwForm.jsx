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
