import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function App() {
  // 지도의 로딩 상태를 관리하는 state를 선언합니다
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // 컴포넌트가 마운트될 때 카카오맵 스크립트를 로드합니다
  useEffect(() => {
    // 카카오맵 스크립트 엘리먼트를 생성합니다
    const kakaoMapScript = document.createElement("script");
    // 스크립트를 비동기로 로드하도록 설정합니다
    kakaoMapScript.async = true;
    // 카카오맵 SDK URL을 설정합니다 (환경변수에서 API 키를 가져옵니다)
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KKO_MAP_KEY}&autoload=false`;

    // 스크립트 로드가 완료되면 실행될 이벤트 리스너를 추가합니다
    kakaoMapScript.addEventListener("load", () => {
      // 카카오맵을 로드하고 로딩 상태를 true로 변경합니다
      window.kakao.maps.load(() => {
        setIsMapLoaded(true);
      });
    });

    // 생성한 스크립트를 head에 추가합니다
    document.head.appendChild(kakaoMapScript);

    // 클린업 함수
    // 컴포넌트가 언마운트될 때 스크립트를 제거합니다
    return () => {
      document.head.removeChild(kakaoMapScript);
    };
  }, []);

  // 지도가 로드되지 않았다면 로딩 메시지를 표시합니다
  if (!isMapLoaded) {
    return <div>지도를 불러오는 중입니다...</div>;
  }

  return (
    <div>
      <h1>카카오 지도: 마커 출력하기</h1>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "800px", height: "600px" }}
        level={3}
      >
        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }} />
      </Map>
    </div>
  );
}

// App 컴포넌트를 내보냅니다
export default App;
