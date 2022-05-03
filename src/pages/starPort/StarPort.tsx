/*
 * @Author: LiuTao
 * @Date: 2022-04-24 12:12:17
 * @LastEditors: LiuTao
 * @LastEditTime: 2022-05-03 17:56:37
 * @FilePath: /mirror/src/pages/starPort/StarPort.tsx
 * @Description: StarPort component.
 *
 * Copyright (c) 2022 by LiuTao, All Rights Reserved.
 */

import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useStarState, { StarInfo } from "./move";
import { useLocation } from "react-router-dom";

/**
 * @description: Star
 * @param {props.positionInfo} positionInfo is the basiclayout of a star, like height, width and etc.
 * @param {props.classInfo} classInfo is the className of a star, from star proxy.
 * @param {props.el} el is the element from BaseLayout component.
 */
const Star = (props: {
  positionInfo: React.CSSProperties | undefined;
  classInfo: string | undefined;
  el: JSX.Element;
  path: string;
  location: string;
}): JSX.Element => {
  let { classInfo, positionInfo, el, path, location } = props;
  const [count, setCount] = useState(0);
  // moved标记是star否移动过，如果移动过，才加上属性，没有移动过则保持不变
  const moved = useRef(false);
  if (path != location) {
    classInfo = "h-2 w-2 transition-none fixed";
    positionInfo = {
      ...positionInfo,
      top: "-1000px",
    };
  } else if (!moved.current) {
    classInfo = " transition-none fixed";
  }
  useEffect(() => {
    if (path == location) {
      moved.current = true;
    } else {
      moved.current = false;
    }
  });
  return (
    <div style={positionInfo} className={classInfo + " fixed"}>
      {el}
      <div
        className="text-white text-xs"
        style={{ position: "relative", top: "-20px", zIndex: 999 }}
      >
        <button onClick={() => setCount((count) => count + 1)}>{count}</button>
      </div>
    </div>
  );
};
/**
 * @description: StarPort
 * @param {props} props is used to receive stars from BaseLayout component to form a port.
 */
function StarPort(props: { children: any }) {
  const { children } = props;
  const [starInfo, setStarInfo] = useStarState();
  useEffect(() => {
    (setStarInfo as (p: any) => void)({});
  }, []);
  const location = useLocation().pathname;
  const Stars = children.map((c: JSX.Element, id: number) => {
    // Pass positionInfo and classInfo via id.
    const info = (starInfo as StarInfo)[id.toString()];
    return (
      <Star
        classInfo={info?.classInfo}
        positionInfo={info?.positionInfo}
        key={id}
        el={c}
        path={info?.path}
        location={location}
      />
    );
  });
  return (
    <div className="fixed" style={{ left: "-1000px", top: "1000px" }}>
      {useMemo(() => Stars, [starInfo])}
    </div>
  );
}
export default StarPort;
