import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import axios from "axios";

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
  ufile: yup
    .mixed()
    .test("required", "파일은 필수 입니다.", value => {
      return value && value.length > 0;
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", value => {
      return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB 이하
    }),
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

  previewfile: yup
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
});

function App() {
  // 이미지 미리보기 state
  const [preview, setPreview] = useState("");
  const [previewList, setPreviewList] = useState([]);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { uid: "", umail: "", upw: "" },
    mode: "onChange",
  });

  useEffect(() => {
    //trigger();
  }, [trigger]);

  // 이미지 한장 미리보기
  const handleChangePreview = e => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  // 이미지 여러장 미리보기
  const handleChangePreviewList = e => {
    // 원래 배열이므로
    const files = Array.from(e.target.files);
    const list = files.map(item => URL.createObjectURL(item));
    setPreviewList([...list]);
  };

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

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <label>아이디</label>
        <input {...register("uid")} />
        <p style={{ color: "red" }}>{errors.uid?.message}</p>

        <label>이메일</label>
        <input {...register("umail")} />
        <p style={{ color: "red" }}>{errors.umail?.message}</p>

        <label>비밀번호</label>
        <input type="password" {...register("upw")} />
        <p style={{ color: "red" }}>{errors.upw?.message}</p>

        <label>파일첨부</label>
        <input type="file" {...register("ufile")} />
        <p style={{ color: "red" }}>{errors.ufile?.message}</p>

        <label>사진파일첨부</label>
        <input
          type="file"
          {...register("userimg")}
          accept="image/png, image/jpeg"
        />
        <p style={{ color: "red" }}>{errors.userimg?.message}</p>

        {/* 여러 파일 추가  */}
        <label>여러 파일 추가</label>
        <input type="file" {...register("ufiles")} multiple />
        <p style={{ color: "red" }}>{errors.ufiles?.message}</p>

        {/* 이미지 여러개 파일 추가 */}
        <label>이미지 여러 파일 추가</label>
        <input
          type="file"
          {...register("uimgfiles")}
          multiple
          accept="image/png, image/jpeg"
        />
        <p style={{ color: "red" }}>{errors.uimgfiles?.message}</p>

        {/* 파일 1개 이미지 미리보기  */}
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

        {/* 이미지 여러장 미리보기 */}
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

        <button type="submit">제출</button>
      </form>
    </div>
  );
}
export default App;
