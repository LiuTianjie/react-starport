/*
 * @Author: LiuTao
 * @Date: 2022-04-25 17:22:18
 * @LastEditors: LiuTao
 * @LastEditTime: 2022-04-28 22:57:01
 * @FilePath: /mirror/src/pages/starPort/StarProxy.tsx
 * @Description:
 *
 * Copyright (c) 2022 by LiuTao, All Rights Reserved.
 */
import { useEffect, useRef } from "react";

/* StarProxy
 * Use StarProxy to fit the layout. Call "move" function to
 * move StarPort to the position.
 */
function StarProxy(props: { move: any; className: any; port: string }) {
  const layoutInfo = useRef<HTMLDivElement>(null);
  const { move, className, port } = props;
  useEffect(() => {
    const proxyPosInfo = layoutInfo.current?.getBoundingClientRect();
    const { height, width, left, top } = proxyPosInfo!;
    move(port, "duration-1000" + className, {
      height: `${height}px`,
      width: `${width}px`,
      top: `${top}px`,
      left: `${left}px`,
      margin: "0",
      padding: "0",
      opacity: 1,
    });
    console.log(`Move ${port} star!`, { proxyPosInfo });
  }, []);
  return <div className={className} ref={layoutInfo}></div>;
}

export default StarProxy;
