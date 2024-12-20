import { FaStar } from "react-icons/fa6";
function App() {
  const point = 10; // 총 별점
  const rate = 3; // 별점
  return (
    <>
      <div>
        <FaStar style={{ color: "red", fontSize: 50 }} />
        App
      </div>
      <h1>당신의 별점은 </h1>
      <div>
        {[...Array(point)].map((item, index) => {
          return (
            <FaStar
              key={index}
              style={{
                color: index < rate ? "gold" : "gray",
              }}
            />
          );
        })}
      </div>
    </>
  );
}
export default App;
