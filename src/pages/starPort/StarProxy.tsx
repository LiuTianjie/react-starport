/*
 * @Author: LiuTao
 * @Date: 2022-04-25 17:22:18
 * @LastEditors: LiuTao
 * @LastEditTime: 2022-05-03 17:08:14
 * @FilePath: /mirror/src/pages/starPort/StarProxy.tsx
 * @Description:
 *
 * Copyright (c) 2022 by LiuTao, All Rights Reserved.
 */
import { useEffect, useRef } from "react";
import useStarState, { StarInfo } from "./move";
import { useLocation } from "react-router-dom";

function StarProxy(props: { className: any; port: string }) {
  const { className, port } = props;
  const layoutInfo = useRef<HTMLDivElement>(null);
  const [_, setStarInfo] = useStarState(port);
  const location = useLocation();
  useEffect(() => {
    const proxyPosInfo = layoutInfo.current?.getBoundingClientRect();
    const { height, width, left, top } = proxyPosInfo!;
    const info = {
      classInfo: className,
      positionInfo: {
        height: `${height}px`,
        width: `${width}px`,
        top: `${top}px`,
        left: `${left}px`,
        margin: "0",
        padding: "0",
        opacity: 1,
      },
      path: location.pathname,
    };
    (setStarInfo as (info: StarInfo) => void)({ [port]: info });
  }, []);
  return <div className={className} ref={layoutInfo}></div>;
}

export default StarProxy;
