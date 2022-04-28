/*
 * @Author: LiuTao
 * @Date: 2022-04-24 12:35:05
 * @LastEditors: LiuTao
 * @LastEditTime: 2022-04-28 23:34:21
 * @FilePath: /mirror/src/pages/StartPortDemo/Land.tsx
 * @Description:
 *
 * Copyright (c) 2022 by LiuTao, All Rights Reserved.
 */
import StarProxy from "../starPort/StarProxy";
import { useParams, Link } from "react-router-dom";
function Land(props: { move: any }) {
  const { move } = props;
  const { id } = useParams();
  return (
    <div>
      <Link
        to="/star"
        className="text-white font-bold ring-1 ring-white rounded p-2"
      >
        GOTO Back
      </Link>
      <div className="flex flex-col items-center justify-center mt-40">
        <div className="flex justify-around w-full">
          <StarProxy
            port={id!}
            move={move}
            className="h-40 w-40 overflow-hidden rounded-2xl font-bold text-xl transition-all drop-shadow-2xl ring-2 ring-lime-100 duration-1000 opacity-0"
          ></StarProxy>
        </div>{" "}
        <p className="w-52 mr-10 text-white text-sm">
          Rapidly build modern websites without ever leaving your HTML. A
          utility-first CSS framework packed with classes like flex, pt-4,
          text-center and rotate-90 that can be composed to build any design,
          directly in your markup.
        </p>
      </div>
    </div>
  );
}

export default Land;
