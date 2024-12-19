# Nivo Chart

- [Nivo Git](https://github.com/plouc/nivo#readme)
- [Nivo](https://nivo.rocks/)

## 설치

- 기본: `npm i @nivo/core`

## 각 차트 모양을 보고 설치를 별도 진행

- Line 차트라면 `npm i @nivo/line`
- Bar 차트라면 `npm i @nivo/bar`

## 실습 Line Chart

```jsx
import { ResponsiveLine } from "@nivo/line";
const getData = [
  {
    id: "japan",
    color: "hsl(144, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 217,
      },
      {
        x: "helicopter",
        y: 42,
      },
      {
        x: "boat",
        y: 260,
      },
      {
        x: "train",
        y: 152,
      },
      {
        x: "subway",
        y: 36,
      },
      {
        x: "bus",
        y: 199,
      },
      {
        x: "car",
        y: 60,
      },
      {
        x: "moto",
        y: 262,
      },
      {
        x: "bicycle",
        y: 51,
      },
      {
        x: "horse",
        y: 196,
      },
      {
        x: "skateboard",
        y: 16,
      },
      {
        x: "others",
        y: 3,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(79, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 27,
      },
      {
        x: "helicopter",
        y: 79,
      },
      {
        x: "boat",
        y: 47,
      },
      {
        x: "train",
        y: 134,
      },
      {
        x: "subway",
        y: 251,
      },
      {
        x: "bus",
        y: 47,
      },
      {
        x: "car",
        y: 213,
      },
      {
        x: "moto",
        y: 47,
      },
      {
        x: "bicycle",
        y: 1,
      },
      {
        x: "horse",
        y: 260,
      },
      {
        x: "skateboard",
        y: 266,
      },
      {
        x: "others",
        y: 73,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(15, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 241,
      },
      {
        x: "helicopter",
        y: 147,
      },
      {
        x: "boat",
        y: 119,
      },
      {
        x: "train",
        y: 31,
      },
      {
        x: "subway",
        y: 176,
      },
      {
        x: "bus",
        y: 155,
      },
      {
        x: "car",
        y: 68,
      },
      {
        x: "moto",
        y: 278,
      },
      {
        x: "bicycle",
        y: 290,
      },
      {
        x: "horse",
        y: 38,
      },
      {
        x: "skateboard",
        y: 293,
      },
      {
        x: "others",
        y: 184,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(84, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 64,
      },
      {
        x: "helicopter",
        y: 157,
      },
      {
        x: "boat",
        y: 259,
      },
      {
        x: "train",
        y: 158,
      },
      {
        x: "subway",
        y: 163,
      },
      {
        x: "bus",
        y: 12,
      },
      {
        x: "car",
        y: 203,
      },
      {
        x: "moto",
        y: 169,
      },
      {
        x: "bicycle",
        y: 95,
      },
      {
        x: "horse",
        y: 80,
      },
      {
        x: "skateboard",
        y: 119,
      },
      {
        x: "others",
        y: 220,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(61, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 199,
      },
      {
        x: "helicopter",
        y: 204,
      },
      {
        x: "boat",
        y: 112,
      },
      {
        x: "train",
        y: 1,
      },
      {
        x: "subway",
        y: 154,
      },
      {
        x: "bus",
        y: 281,
      },
      {
        x: "car",
        y: 76,
      },
      {
        x: "moto",
        y: 214,
      },
      {
        x: "bicycle",
        y: 196,
      },
      {
        x: "horse",
        y: 251,
      },
      {
        x: "skateboard",
        y: 220,
      },
      {
        x: "others",
        y: 275,
      },
    ],
  },
];
function App() {
  return (
    <div style={{ width: "80%", height: 500, margin: "0 auto" }}>
      <ResponsiveLine
        data={getData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={false}
      />
    </div>
  );
}
export default App;
```
