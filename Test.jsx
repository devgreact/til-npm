/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";

function Test() {
  const [mandaDatas, setMandaDatas] = useState([
    { key: "0-0-0", word: "aa" },
    { key: "0-0-1", word: "aa" },
    { key: "0-0-2", word: "aa" },
    { key: "1-0-0", word: "aa" },
    { key: "1-0-0", word: "aa" },
    { key: "1-0-0", word: "aa" },
    { key: "1-0-0", word: "aa" },
    { key: "1-0-0", word: "aa" },
    { key: "1-0-0", word: "aa" },
    { key: "1-0-0", word: "aa" },
    { key: "1-0-0", word: "aa" },
    { key: "1-0-0", word: "aa" },
  ]);
  return (
    <div>
      <Box_00 datas={mandaDatas} start={0} end={8} />
      <Box_00 datas={mandaDatas} start={0} end={8} />
      <Box_00 datas={mandaDatas} start={0} end={8} />
      <Box_00 datas={mandaDatas} start={0} end={8} />
      <Box_00 datas={mandaDatas} start={0} end={8} />
      <Box_00 datas={mandaDatas} start={0} end={8} />
      <Box_00 datas={mandaDatas} start={0} end={8} />
      <Box_00 datas={mandaDatas} start={0} end={8} />
      <Box_00 datas={mandaDatas} start={0} end={8} />
    </div>
  );
}
export default Test;

function Box_00({ datas, start, end }) {
  const [showData, setData] = useState([]);
  const sortData = () => {
    const tempData = [];
    for (let i = start; i <= end; i++) {
      const tempData = datas[i];
      tempData.push(tempData);
    }
    setData([...tempData]);
  };

  useEffect(() => {
    sortData();
  }, [datas]);

  return (
    <>
      <div>{showData[0]}</div>
      <div>{showData[1]}</div>
      <div>{showData[2]}</div>
      <div>{showData[3]}</div>
      <div>{showData[4]}</div>
      <div>{showData[5]}</div>
      <div>{showData[6]}</div>
      <div>{showData[7]}</div>
      <div>{showData[9]}</div>
    </>
  );
}
