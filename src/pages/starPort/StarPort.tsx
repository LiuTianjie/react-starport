/*
 * @Author: LiuTao
 * @Date: 2022-04-24 12:12:17
 * @LastEditors: LiuTao
 * @LastEditTime: 2022-04-28 23:12:47
 * @FilePath: /mirror/src/pages/starPort/StarPort.tsx
 * @Description: StarPort component.
 *
 * Copyright (c) 2022 by LiuTao, All Rights Reserved.
 */
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";

/**
 * @description: Star is the real componet mount on BasyLayout.
 * @param {number} targetPort is the exact star's port which to move.
 * @param {number} port is used to identify each star.
 * @param {React.CSSProperties} positionInfo is the position of the target star, such
 * as height, width, etc.
 * @param {string} classInfo is the className of the target star.
 * @param {JSX.Element} el is the star.
 * @returns {JSX.Element} Return the star.
 */
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
    console.log({ port }, { targetPort }, { move });
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

interface StarInfo {
  [port: string]: {
    positionInfo: React.CSSProperties | undefined;
    classInfo: string | undefined;
    targetPort: string | undefined;
  };
}
/** StarPort
 * @description: Mount on the root element, when route path is change,
 * the component won't destroy.
 */
const StarPort = forwardRef((props: any, ref: any) => {
  const { children } = props;
  const [starInfo, setStarInfo] = useState<StarInfo>({});
  useImperativeHandle(ref, () => ({
    MoveStar: (
      targetPortInfo: string,
      targetClassInfo: string,
      targetPositionInfo: React.CSSProperties
    ) => {
      // TODO: In one page, only declareed star need to move, others should
      // move out of screen.
      setStarInfo(() => {
        starInfo[targetPortInfo] = {
          classInfo: targetClassInfo,
          positionInfo: targetPositionInfo,
          targetPort: targetPortInfo,
        };
        return { ...starInfo };
      });
    },
  }));
  useEffect(() => {
    console.log({ starInfo });
  });
  const Stars = children.map((c: JSX.Element, id: number) => {
    const info = starInfo[id.toString()];
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
});
export default StarPort;
