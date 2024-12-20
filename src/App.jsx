import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// 서버에서 Response 된 데이터
const getData = [
  {
    id: 1,
    title: "swaggr 완료",
    createAt: "2024-12-13T10:00:00Z",
  },
  {
    id: 2,
    title: "react 완료",
    createAt: "2024-12-18T10:00:00Z",
  },
];

function App() {
  // 오늘의 날짜
  const todayDayjs = dayjs().format("YYYY-MM-DD");
  return (
    <div>
      <h1>Dayjs 활용 날짜관련</h1>
      <div>
        <p>오늘은 {todayDayjs}</p>
        {getData.map(item => {
          return (
            <p key={item.id}>
              아이디 : {item.id} 제목 : {item.title} 날짜 :{" "}
              {dayjs(item.createAt).format("YYYY-MM-DD")}
            </p>
          );
        })}

        <h2>Dayjs 를 활용한 5일 뒤 날짜 계산하기 </h2>
        {getData.map(item => {
          return (
            <p key={item.id}>
              아이디 : {item.id} 제목 : {item.title} 5일 뒤의 날짜 :{" "}
              {dayjs(item.createAt).add(5, "day").format("YYYY-MM-DD")}
            </p>
          );
        })}
        <h3>moment 를 활용한 시간이 얼마나 지났는지? </h3>
        {getData.map(item => {
          return (
            <p key={item.id}>
              아이디 : {item.id} 제목 : {item.title} 얼마나 지났는지 :{" "}
              {dayjs(item.createAt).fromNow()}
            </p>
          );
        })}
      </div>
    </div>
  );
}
export default App;
