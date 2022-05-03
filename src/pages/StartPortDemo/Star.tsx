/*
 * @Author: LiuTao
 * @Date: 2022-04-25 16:54:56
 * @LastEditors: LiuTao
 * @LastEditTime: 2022-05-03 18:15:11
 * @FilePath: /mirror/src/pages/StartPortDemo/Star.tsx
 * @Description:
 *
 * Copyright (c) 2022 by LiuTao, All Rights Reserved.
 */
import StarProxy from "../starPort/StarProxy";
function Star() {
  let Proxies = [];
  for (let i = 0; i < 7; i++) {
    Proxies.push(
      <StarProxy
        port={i.toString()}
        key={i}
        className="h-14 w-14 overflow-hidden rounded-none font-bold text-xl duration-1000  opacity-0"
      ></StarProxy>
    );
  }
  return (
    <div className="h-full w-full">
      <div className="text-white text-3xl font-bold mt-10">React-StarPort</div>
      <div className="flex flex-col w-full items-center justify-center mt-5">
        <div className="flex h-auto w-auto gap-2 mb-2">{Proxies}</div>
      </div>
    </div>
  );
}

export default Star;
