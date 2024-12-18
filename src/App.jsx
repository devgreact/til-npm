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
