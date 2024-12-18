# 카카오 맵

- 페이지 구성

```js
function App() {
  return (
    <div>
      <h1>카카오 지도</h1>
      <div></div>
    </div>
  );
}
export default App;
```

## 1. 카카오 개발자 등록하기

- [카카오 개발자 사이트](https://developers.kakao.com/)

## 2. 애플리케이션 등록과정

- [새 애플리케이션 등록](https://velog.io/@tpgus758/React%EC%97%90%EC%84%9C-Kakao-map-API-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
- Vite : `http://localhost:5173`
- CRA : `http://localhost:3000`
- jskey : `e77d3db8b6d8539bbd66828bbf669118`
- `카카오 맵 활성화 필수`

## 3. 카카오 지도 가이드

- [지도가이드](https://apis.map.kakao.com/web/guide/)

## 4. 지도 적용하기 (가이드 따라하기)

### 4.1. index.html 수정하기

```html
<script
  type="text/javascript"
  src="//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은 APP KEY를 넣으시면 됩니다."
></script>
```

- 적용후

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>리액트 라이브러리</title>
    <script
      type="text/javascript"
      src="//dapi.kakao.com/v2/maps/sdk.js?appkey=e77d3db8b6d8539bbd66828bbf669118"
    ></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 4.2. App.jsx 에 적용해 보기

```jsx
import { useEffect } from "react";

function App() {
  // 앱 실행 후 컴포넌트가  마운트 될때 js 를 실행한다.
  // html 완료가 되면 출력
  useEffect(() => {
    // 웹 브라우저에 등록된 kakao 객체를 활용함.
    const { kakao } = window;
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, []);

  return (
    <div>
      <h1>카카오 지도</h1>
      <div>
        <div id="map" style={{ width: 500, height: 500 }}></div>
      </div>
    </div>
  );
}
export default App;
```

## 5. 지도 적용하기 (React 에서 처리)

### 5.1. `.env` 파일에 API 키 보관하기

- 모든 API 키
  : 구글, 네이버, 카카오 관련 키들
  : Firebase, Suparbase 등등..

### 5.2. 개발환경에 따라서 `접두어`가 달라집니다.

#### 5.2.1. `npx create-react-app 프로젝트명`

: CRA 로 만든 프로젝트는 접두어가 `REACT_APP_`
: 예) 카카오 JS 키 (`REACT_APP_KKO_MAP_KEY`)
: 이름에 담길 값도 `=` 다음에 문자열로 작성
: "" 는 생략하자.

- index.html 수정

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>리액트 라이브러리</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

#### 5.2.2. `npm create vite@latest 프로젝트명`

: Vite 로 프로젝트의 접두어는 `VITE_`
: 예) 카카오 JS 키 (`VITE_KKO_MAP_KEY`)
: 이름에 담길 값도 `=` 다음에 문자열로 작성
: "" 는 생략하자.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>리액트 라이브러리</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 5.3. `.gitignore` 에 반드시 명시한다.

```
# env
.env
```

- `환경 설정 파일은 수정이 되거나, 새로 작성이 되면` 반드시 `재실행`해야 함.

### 5.4. App.jsx 적용방법

#### 5.4.1. `npx create-react-app 프로젝트` 경우

```jsx
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KKO_MAP_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        const marker = new window.kakao.maps.Marker({
          position: map.getCenter(),
        });
        marker.setMap(map);
      });
    };
  }, []);

  return (
    <div>
      <h1>카카오 지도</h1>
      <div>
        <div id="map" style={{ width: 500, height: 500 }}></div>
      </div>
    </div>
  );
}
export default App;
```

#### 5.4.2. `npm create vite@latest 프로젝트명` 경우

```jsx
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KKO_MAP_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        const marker = new window.kakao.maps.Marker({
          position: map.getCenter(),
        });
        marker.setMap(map);
      });
    };
  }, []);

  return (
    <div>
      <h1>카카오 지도</h1>
      <div>
        <div id="map" style={{ width: 500, height: 500 }}></div>
      </div>
    </div>
  );
}
export default App;
```

## 6. react-kakao-maps-sdk 활용하기

- [react-kakao-maps-sdk](https://www.npmjs.com/package/react-kakao-maps-sdk)
- [개발자사이트](https://react-kakao-maps-sdk.jaeseokim.dev/)
- [사용법블로그](https://velog.io/@wlwl99/React-Kakao-Map-SDK-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)

### 6.1. 설치법

- `npm install react-kakao-maps-sdk`

### 6.2. 사용예제

```jsx
import { useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function App() {
  useEffect(() => {
    // 해결해라
    // const script = document.createElement("script");
    // script.async = true;
    // script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KKO_MAP_KEY}&autoload=false&libraries=services`;
    // document.head.appendChild(script);
  }, []);

  return (
    <div>
      <h1>카카오 지도</h1>
      <div>
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: "100%", height: "360px" }}
        >
          <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
            <div style={{ color: "#000" }}>Hello World!</div>
          </MapMarker>
        </Map>
      </div>
    </div>
  );
}
export default App;
```

### 6.3. 사용예제 (지도 모양 바꾸기)

```jsx
import { useEffect, useState } from "react";
import { Map, MapMarker, MapTypeId } from "react-kakao-maps-sdk";

function App() {
  const [mapTypeId, setMapTypeId] = useState("");
  useEffect(() => {
    // 해결해라
    // const script = document.createElement("script");
    // script.async = true;
    // script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KKO_MAP_KEY}&autoload=false&libraries=services`;
    // document.head.appendChild(script);
  }, []);

  return (
    <div>
      <h1>카카오 지도</h1>
      <div>
        <Map
          id="map"
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: "100%", height: "360px" }}
          level={5}
        >
          {mapTypeId && <MapTypeId type={mapTypeId} />}
        </Map>
        <p>
          <button onClick={() => setMapTypeId("TRAFFIC")}>교통정보 보기</button>{" "}
          <button onClick={() => setMapTypeId("ROADVIEW")}>
            로드뷰 도로정보 보기
          </button>{" "}
          <button onClick={() => setMapTypeId("TERRAIN")}>지형정보 보기</button>{" "}
          <button onClick={() => setMapTypeId("USE_DISTRICT")}>
            지적편집도 보기
          </button>
        </p>
      </div>
    </div>
  );
}
export default App;
```

### 6.4. 사용예제( 맵 위에 마커 표시하기)

```jsx
import { useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function App() {
  useEffect(() => {}, []);

  return (
    <div>
      <h1>카카오 지도: 마커 출력하기</h1>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "800px", height: "600px" }}
        level={3}
      >
        {/* 마커위치 */}
        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }} />
      </Map>
    </div>
  );
}
export default App;
```

### 6.5. 사용예제(마커 여러 개 표시하기)

```jsx
import { useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const locations = [
  { title: "카카오", latlng: { lat: 33.450705, lng: 126.570677 } },
  { title: "생태연못", latlng: { lat: 33.450936, lng: 126.569477 } },
  { title: "텃밭", latlng: { lat: 33.450879, lng: 126.56994 } },
  { title: "근린공원", latlng: { lat: 33.451393, lng: 126.570738 } },
];

function App() {
  useEffect(() => {}, []);

  return (
    <div>
      <h1>카카오 지도: 마커 출력하기</h1>
      <Map
        center={{ lat: 33.450701, lng: 126.570667 }}
        style={{ width: "800px", height: "600px" }}
        level={3}
      >
        {locations.map((loc, idx) => (
          <MapMarker
            key={`${loc.title}-${loc.latlng}`}
            position={loc.latlng}
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
              size: { width: 24, height: 35 },
            }}
            title={loc.title}
          />
        ))}
      </Map>
    </div>
  );
}
export default App;
```

### 6.6 사용예제(맵 위에 커스텀 오버레이 표시하기)

```jsx
import { useEffect } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

function App() {
  useEffect(() => {}, []);

  return (
    <div>
      <h1>카카오 지도</h1>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "800px", height: "600px" }}
        level={3}
      >
        <CustomOverlayMap position={{ lat: 33.55635, lng: 126.795841 }}>
          <div
            className="overlay"
            style={{ backgroundColor: "red", color: "#fff" }}
          >
            Here!
          </div>
        </CustomOverlayMap>
      </Map>
    </div>
  );
}
export default App;
```

### 6.7. 사용예제 (지도 확대/축소 버튼)

```jsx
import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

function App() {
  const [level, setLevel] = useState(3);
  useEffect(() => {}, []);

  return (
    <div>
      <h1>카카오 지도</h1>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "800px", height: "600px" }}
        level={level}
      >
        <CustomOverlayMap position={{ lat: 33.55635, lng: 126.795841 }}>
          <div className="overlay">Here!</div>
        </CustomOverlayMap>
        <button onClick={() => setLevel(level + 1)}>-</button>
        <button onClick={() => setLevel(level - 1)}>+</button>
      </Map>
    </div>
  );
}
export default App;
```

### 6.8. 사용예제(Geolocation API)

- 사용자의 위치 정보를 웹 애플리케이션에 제공할 수 있는 API
- 개인정보 보호를 위해서 브라우저는 사용자에게 위치 정보에 대한 권한을 받은 후 위치 정보를 사용할 수 있다.
- Geolocation.getCurrentPosition() : 기기의 현재 위치를 가져오는 메소드
- Geolocation.watchPosition() : 기기의 위치가 바뀔 때마다, 새로운 위치를 사용하여 함수를 호출한다.

#### 6.8.1. geolocation으로 현재 위치 마커 표시하기

```jsx
import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

function App() {
  // 현재 위치를 저장할 상태
  const [location, setLoacation] = useState(null);
  // 위치 성공
  const successHandler = response => {
    console.log(response);
    // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
    const { latitude, longitude } = response.coords;
    setLoacation({ latitude, longitude });
  };
  // 위치 에러
  const errorHandler = error => {
    console.log(error);
  };
  useEffect(() => {
    // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  return (
    <div>
      <h1>카카오 지도</h1>
      {location && (
        <Map
          center={{ lat: location.latitude, lng: location.longitude }}
          style={{ width: "800px", height: "600px" }}
          level={3}
        >
          <MapMarker
            position={{ lat: location.latitude, lng: location.longitude }}
          />
        </Map>
      )}
    </div>
  );
}
export default App;
```

### 6.9. 사용예제(선의 거리 계산하기)

```jsx
import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, Polyline } from "react-kakao-maps-sdk";

const CalculatePolylineDistanceStyle = () => (
  <div>
    <style>{`
    .dot {overflow:hidden;float:left;width:12px;height:12px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/mini_circle.png');}
    .dotOverlay {color:#000;position:relative;bottom:10px;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;font-size:12px;padding:5px;background:#fff;}
    .dotOverlay li {display:block;}
    .dotOverlay:nth-of-type(n) {border:0; box-shadow:0px 1px 2px #888;}
    .number {font-weight:bold;color:#ee6152;}
    .dotOverlay:after {content:'position:absolute;margin-left:-6px;left:50%;bottom:-8px;width:11px;height:8px;background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white_small.png')}
    .distanceInfo {position:relative;list-style:none;margin:0;}
    .distanceInfo .label {display:inline-block;width:50px;}
    .distanceInfo:after {content:none;}
    `}</style>
  </div>
);

function App() {
  const [isdrawing, setIsdrawing] = useState(false);
  const [clickLine, setClickLine] = useState();
  const [paths, setPaths] = useState([]);
  const [distances, setDistances] = useState([]);
  const [mousePosition, setMousePosition] = useState({
    lat: 0,
    lng: 0,
  });
  const [moveLine, setMoveLine] = useState();

  // 클릭시 실행
  const handleClick = (_map, mouseEvent) => {
    if (!isdrawing) {
      setDistances([]);
      setPaths([]);
    }
    setPaths(prev => [
      ...prev,
      {
        lat: mouseEvent.latLng.getLat(),
        lng: mouseEvent.latLng.getLng(),
      },
    ]);
    setDistances(prev => [
      ...prev,
      Math.round(clickLine.getLength() + moveLine.getLength()),
    ]);
    setIsdrawing(true);
  };
  // 마우스 Move
  const handleMouseMove = (_map, mouseEvent) => {
    setMousePosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
  };
  // 마우스 오른쪽으로 종료
  const handleRightClick = (_map, _mouseEvent) => {
    setIsdrawing(false);
  };

  //거리계산
  const DistanceInfo = ({ distance }) => {
    // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
    const walkkTime = (distance / 67) | 0;
    // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
    const bycicleTime = (distance / 227) | 0;

    return (
      <ul className="dotOverlay distanceInfo">
        <li>
          <span className="label">총거리</span>{" "}
          <span className="number">{distance}</span>m
        </li>
        <li>
          <span className="label">도보</span>{" "}
          {walkkTime > 60 && (
            <>
              <span className="number">{Math.floor(walkkTime / 60)}</span> 시간{" "}
            </>
          )}
          <span className="number">{walkkTime % 60}</span> 분
        </li>
        <li>
          <span className="label">자전거</span>{" "}
          {bycicleTime > 60 && (
            <>
              <span className="number">{Math.floor(bycicleTime / 60)}</span>{" "}
              시간{" "}
            </>
          )}
          <span className="number">{bycicleTime % 60}</span> 분
        </li>
      </ul>
    );
  };

  useEffect(() => {}, []);

  return (
    <div>
      <h1>카카오 지도</h1>
      <div>
        <CalculatePolylineDistanceStyle />
        <Map // 지도를 표시할 Container
          id={`map`}
          center={{
            // 지도의 중심좌표
            lat: 37.498004414546934,
            lng: 127.02770621963765,
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "450px",
          }}
          level={3} // 지도의 확대 레벨
          onClick={handleClick}
          onRightClick={handleRightClick}
          onMouseMove={handleMouseMove}
        >
          <Polyline
            path={paths}
            strokeWeight={3} // 선의 두께입니다
            strokeColor={"#db4040"} // 선의 색깔입니다
            strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle={"solid"} // 선의 스타일입니다
            onCreate={setClickLine}
          />
          {paths.map(path => (
            <CustomOverlayMap
              key={`dot-${path.lat},${path.lng}`}
              position={path}
              zIndex={1}
            >
              <span className="dot"></span>
            </CustomOverlayMap>
          ))}
          {paths.length > 1 &&
            distances.slice(1, distances.length).map((distance, index) => (
              <CustomOverlayMap
                key={`distance-${paths[index + 1].lat},${paths[index + 1].lng}`}
                position={paths[index + 1]}
                yAnchor={1}
                zIndex={2}
              >
                {!isdrawing && distances.length === index + 2 ? (
                  <DistanceInfo distance={distance} />
                ) : (
                  <div className="dotOverlay">
                    거리 <span className="number">{distance}</span>m
                  </div>
                )}
              </CustomOverlayMap>
            ))}
          <Polyline
            path={isdrawing ? [paths[paths.length - 1], mousePosition] : []}
            strokeWeight={3} // 선의 두께입니다
            strokeColor={"#db4040"} // 선의 색깔입니다
            strokeOpacity={0.5} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle={"solid"} // 선의 스타일입니다
            onCreate={setMoveLine}
          />
          {isdrawing && (
            <CustomOverlayMap position={mousePosition} yAnchor={1} zIndex={2}>
              <div className="dotOverlay distanceInfo">
                총거리{" "}
                <span className="number">
                  {Math.round(clickLine.getLength() + moveLine.getLength())}
                </span>
                m
              </div>
            </CustomOverlayMap>
          )}
        </Map>
      </div>
    </div>
  );
}
export default App;
```
