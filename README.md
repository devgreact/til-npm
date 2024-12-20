# react-icons

## 1. 설치

- [npm](https://www.npmjs.com/package/react-icons)
- [사이트](https://react-icons.github.io/react-icons/)
- `npm i react-icons`

## 2. 참조

- [참조블러그](https://velog.io/@chaevivi/React-React-Icons-%EC%82%AC%EC%9A%A9%EB%B2%95)

## 3. 활용

- App.jsx

```jsx
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
```
