import { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// js 관련 글자들을 특수한 글자로 변경한다.
import DOMPurify from "dompurify";
import axios from "axios";

function App() {
  const [data, setData] = useState("");

  // useRef 는 React 에서 html 태그 참조할때
  const quillRef = useRef(null);

  // 이미지 처리(프론트에서 처리)
  const imageHandler = () => {
    //console.log("이미지 처리하기");
    // 1. 현재 찾아서 에디터를 참조한다.
    // useRef 로 보관한 내용물 참조(current)
    const editor = quillRef.current.getEditor();
    // 2. js 로 <input type="file" /> 을 생성한다.
    const input = document.createElement("input");
    // 3. js 로 속성을 셋팅한다.
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    // 4. js 로 마치 <input type="file" /> 을 클릭한 것처럼 실행한다.
    input.click(); // 각에 클릭
    // 5. js 로 "change" 이벤트를 생성해 준다.
    input.addEventListener("change", function () {
      //  안전한 코딩
      try {
        // 선택된 파일
        const file = input.files[0];
        // 임시 웹브라우저의 cache 이미지 URL 생성

        // 백엔드로 post 샘플 코드
        // const formData = new FormData();
        // formData.append("이름", file);
        // const res = axios.post("주소", formData, {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // });
        // let tempUrl = res.data;

        // 정석적으로 백엔드에 axios.post 로 이미지 전송후
        // 리턴 결과로 이미지의 URL 을 받아옵니다.
        // 받는 결과를 출력합니다.(샘플)
        let tempUrl = URL.createObjectURL(file);
        tempUrl =
          "https://i.namu.wiki/i/yHG3_20MxOUL3m1VlPJ8NRxVtRfk9MUUymDGMVFjr9Q2HT7zKI6CP9UdaFhIGipN6rBCY2KoYruBwJUJw6E38BVJDJmtIeZjZHvyW9pdn4Mruw5dQBGTLDG93ehgWZI45q7AOq3mHXWbNbVkTEyA_A.webp";

        // 에디터에 배치하기
        const range = editor.getSelection();
        // tempUrl 은 정확히 나온다.
        // 그런데 출력에는 <img src="//:0"> 가 나온다.
        editor.insertEmbed(range.index, "image", tempUrl);
        // 강제로 마우스 커서 위치 이동하기
        editor.setSelection(range.index + 1);
      } catch (error) {
        console.log(error);
      }
    });
    // 6. 이벤트로 가상의 image url 을 생성한다. URL.crateObjectURL
    // 7. 참조해둔 에디터에 img 태그를 밀어넣고 주소는 위의 주소로 넣는다.
    // 8. 마우스 커서 위치를 조절한다.
  };

  // 모듈 활용
  // useMemo : `변수를 만들고 다시 생성되지 않도록 메모`한다.
  // useMemo : 리랜더링시 다시 변수를 만들지 않는다.
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, "link"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
                "custom-color",
              ],
            },
            { background: [] },
          ],
          ["image", "video"],
          ["clean"],
        ],
        // 이미지 관련해서는 내가 직접 처리할께.
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );

  return (
    <div>
      <h1>Editor</h1>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <form>
          {/* <textarea></textarea> */}
          <ReactQuill
            ref={quillRef}
            onChange={e => setData(e)}
            modules={modules}
          />
        </form>
      </div>
      <div>
        <h2>입력중인 데이터(서버에 보내줄 글자)</h2>
        <p>{data}</p>
        {/* 아래처럼 내용을 출력하면 위험함. */}
        {/* <p dangerouslySetInnerHTML={{ __html: data }} /> */}
        {/* 최소한의 방어책 */}
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data) }} />
      </div>
    </div>
  );
}
export default App;
