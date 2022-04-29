/*
 * @Author: LiuTao
 * @Date: 2022-04-24 12:12:17
 * @LastEditors: LiuTao
 * @LastEditTime: 2022-04-29 12:40:24
 * @FilePath: /mirror/src/pages/starPort/StarPort.tsx
 * @Description: StarPort component.
 *
 * Copyright (c) 2022 by LiuTao, All Rights Reserved.
 */

import React, { useEffect } from "react";
import useStarState, { StarInfo } from "./move";
const Star = (props: {
  targetPort: string | undefined;
  port: string | undefined;
  positionInfo: React.CSSProperties | undefined;
  classInfo: string | undefined;
  el: JSX.Element;
}): JSX.Element => {
  const { port, targetPort, positionInfo, classInfo, el } = props;
  const move = targetPort === port ? true : false;
  useEffect(() => {
    console.log("star moving");
  });
  return (
    <div
      style={move ? positionInfo : {}}
      className={move ? classInfo + " fixed" : "h-10 w-10"}
    >
      {el}
    </div>
  );
};

const StarPort = (props: any) => {
  const { children } = props;
  const [starInfo, setStarInfo] = useStarState();
  useEffect(() => {
    (setStarInfo as (p: any) => void)({});
  }, []);
  const Stars = children.map((c: JSX.Element, id: number) => {
    const info = (starInfo as StarInfo)[id.toString()];

    return (
      <Star
        classInfo={info?.classInfo}
        positionInfo={info?.positionInfo}
        targetPort={info?.targetPort}
        key={id}
        port={id.toString()}
        el={c}
      />
    );
  });
  return <div>{Stars}</div>;
};
export default StarPort;
