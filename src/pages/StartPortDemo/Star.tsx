/*
 * @Author: LiuTao
 * @Date: 2022-04-25 16:54:56
 * @LastEditors: LiuTao
 * @LastEditTime: 2022-04-29 10:46:55
 * @FilePath: /mirror/src/pages/StartPortDemo/Star.tsx
 * @Description:
 *
 * Copyright (c) 2022 by LiuTao, All Rights Reserved.
 */
import StarProxy from "../starPort/StarProxy";
import { Link } from "react-router-dom";
function Star() {
  let Proxies = [];
  for (let i = 0; i < 4; i++) {
    Proxies.push(
      <StarProxy
        port={i.toString()}
        key={i}
        className="h-10 w-10 overflow-hidden font-bold text-xl transition-all duration-1000 ring-2 ring-teal-300 opacity-0"
      ></StarProxy>
    );
  }
  return (
    <div>
      <Link
        to="/land/0/"
        className="text-white font-bold ring-1 ring-white rounded p-2 "
      >
        GOTO Land
      </Link>
      <div className="flex flex-col w-full items-center justify-center mt-20">
        <div className="flex h-12 w-52 justify-around">{Proxies}</div>
        <p className="w-52 text-white text-ellipsis overflow-hidden text-left">
          "Tailwind CSS is the only framework that I've seen scale on large
          teams. It’s easy to customize, adapts to any design, and the build
          size is tiny." Sarah Dayan Staff Engineer, Algolia
        </p>
      </div>
    </div>
  );
}

export default Star;
