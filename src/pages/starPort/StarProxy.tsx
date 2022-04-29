/*
 * @Author: LiuTao
 * @Date: 2022-04-25 17:22:18
 * @LastEditors: LiuTao
 * @LastEditTime: 2022-04-29 12:29:14
 * @FilePath: /mirror/src/pages/starPort/StarProxy.tsx
 * @Description:
 *
 * Copyright (c) 2022 by LiuTao, All Rights Reserved.
 */
import { useEffect, useRef } from "react";
import useStarState, { StarInfo } from "./move";
function StarProxy(props: { className: any; port: string }) {
  const { className, port } = props;
  const layoutInfo = useRef<HTMLDivElement>(null);
  const [_, setStarInfo] = useStarState();
  useEffect(() => {
    const proxyPosInfo = layoutInfo.current?.getBoundingClientRect();
    const { height, width, left, top } = proxyPosInfo!;
    console.log("proxy effect");
    const info = {
      targetPort: port,
      classInfo: "duration-1000" + className,
      positionInfo: {
        height: `${height}px`,
        width: `${width}px`,
        top: `${top}px`,
        left: `${left}px`,
        margin: "0",
        padding: "0",
        opacity: 1,
      },
    };
    (setStarInfo as (p: any) => void)({ [port]: info });
  }, []);
  return <div className={className} ref={layoutInfo}></div>;
}

export default StarProxy;
