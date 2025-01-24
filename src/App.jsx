import axios from "axios";
import { useState } from "react";

const App = () => {
  const [file, setFile] = useState(null);
  const handleChangeFile = e => {
    console.log(e);
    console.log(e.target);
    console.log(e.target.files);
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      // 보내야 하는 데이터
      const sendData = {
        email: "1234park@naver.com",
        upw: "1111",
        name: "홍길동",
        phone: "01012345678",
      };
      // 문자열을 파일로 만들어야 보내야 한다.

      formData.append(
        "p",
        new Blob([JSON.stringify(sendData)], { type: "application/json" }),
      );

      if (file) {
        formData.append("pic", file);
      }

      const res = await axios.post("/api/user/sign-up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>File 및 json 데이터 post 테스트</h1>
      <button onClick={() => handleSubmit()}>업로드</button>
      <form>
        <input type="file" onChange={e => handleChangeFile(e)} />
      </form>
    </div>
  );
};
export default App;
